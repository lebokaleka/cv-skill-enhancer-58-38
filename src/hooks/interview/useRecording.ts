
import { useState, useRef, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

// Audio processing helper function
const getMimeType = () => {
  const types = [
    'audio/webm',
    'audio/mp4',
    'audio/ogg',
    'audio/wav'
  ];
  
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  
  return 'audio/webm'; // Fallback
};

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  
  // Refs
  const recordingTimerRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Effects for recording timer
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 30) {
            handleStopRecording();
            toast({
              title: "Recording limit reached",
              description: "The maximum recording time is 30 seconds"
            });
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  // Effect for audio playback
  useEffect(() => {
    if (isPlaying && audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isPlaying, audioUrl]);

  // Handlers
  const handleStartRecording = async () => {
    try {
      setTranscription(null);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mimeType = getMimeType();
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Clean up stream tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setAudioUrl(null);

      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone..."
      });

    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Recording failed",
        description: "Unable to access microphone",
        variant: "destructive"
      });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording complete",
        description: "You can now listen to your answer or submit it for analysis."
      });
    }
  };

  const handleTogglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleClearRecording = () => {
    setAudioUrl(null);
    setTranscription(null);
  };

  const transcribeAudio = async (): Promise<string> => {
    if (!audioUrl) {
      throw new Error("No audio recording available");
    }
    
    setIsProcessing(true);
    
    try {
      // Convert the audio blob to base64
      const audioBlob = await fetch(audioUrl).then(r => r.blob());
      const buffer = await audioBlob.arrayBuffer();
      const base64Audio = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      
      // Use our Supabase Edge Function to transcribe the audio
      const { data, error } = await supabase.functions.invoke('analyze-interview', {
        body: { 
          audio: base64Audio,
          question: "Transcription only" // Dummy question for transcription-only mode
        }
      });
      
      if (error) {
        console.error("Error from edge function:", error);
        throw new Error(error.message);
      }
      
      const result = data.transcription || "Sorry, I couldn't transcribe your response.";
      setTranscription(result);
      setIsProcessing(false);
      return result;
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setIsProcessing(false);
      toast({
        title: "Transcription failed",
        description: "Unable to transcribe audio: " + error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    isRecording,
    recordingTime,
    audioUrl,
    isPlaying,
    isProcessing,
    transcription,
    handleStartRecording,
    handleStopRecording,
    handleTogglePlayback,
    handleClearRecording,
    transcribeAudio,
    setAudioUrl,
    setTranscription
  };
};
