
import { useState, useRef, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);

  // Reset timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  // Load API key from localStorage on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('openai_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  // Function to handle recording start
  const handleStartRecording = async () => {
    try {
      // Check if the browser supports MediaRecorder
      if (!navigator.mediaDevices || !window.MediaRecorder) {
        toast({
          title: "Recording Not Supported",
          description: "Your browser doesn't support audio recording",
          variant: "destructive"
        });
        return;
      }

      // Get access to the microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create a new MediaRecorder instance
      const mimeType = getMimeType();
      mediaRecorder.current = new MediaRecorder(stream, { mimeType });
      
      // Clear previous audio chunks
      audioChunks.current = [];
      
      // Add the audio chunks when available
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      
      // When the recording stops, create a Blob and set the audio URL
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: mimeType });
        const newAudioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(newAudioUrl);
        
        // Create an audio element for playback
        audioElement.current = new Audio(newAudioUrl);
        audioElement.current.onended = () => {
          setIsPlaying(false);
        };
      };
      
      // Start recording
      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start a timer to track recording duration
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          // Auto-stop after 30 seconds
          if (prev >= 30) {
            if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
              handleStopRecording();
            }
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Recording Failed",
        description: "Could not access your microphone",
        variant: "destructive"
      });
    }
  };

  // Function to handle recording stop
  const handleStopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      
      // Stop all audio tracks
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      
      setIsRecording(false);
      
      // Clear the timer
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Function to toggle audio playback
  const handleTogglePlayback = () => {
    if (!audioElement.current) return;
    
    if (isPlaying) {
      audioElement.current.pause();
      setIsPlaying(false);
    } else {
      audioElement.current.play();
      setIsPlaying(true);
    }
  };

  // Function to clear the recording
  const handleClearRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setTranscription(null);
    audioChunks.current = [];
    audioElement.current = null;
  };

  // Function to transcribe audio using OpenAI's Whisper API
  const transcribeAudio = async () => {
    if (!audioUrl) {
      console.error("No audio URL to transcribe");
      return null;
    }
    
    try {
      setIsProcessing(true);
      
      // Convert the audio URL to base64
      const audioBlob = await fetch(audioUrl).then(r => r.blob());
      
      // Create a FileReader to read the blob as a base64 string
      const reader = new FileReader();
      const audioBase64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64);
        };
      });
      reader.readAsDataURL(audioBlob);
      
      const audioBase64 = await audioBase64Promise;
      
      // Set a temporary transcription message
      setTranscription("Processing your response...");
      
      return audioBase64;
      
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast({
        title: "Transcription Failed",
        description: "An error occurred while processing your recording",
        variant: "destructive"
      });
      return null;
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
    setApiKey,
    setIsProcessing,
    setTranscription
  };
};

// Helper function to get supported mime type
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
