
import { useState, useRef, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

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
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('openai_api_key'));
  
  // Refs
  const recordingTimerRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioBlobRef = useRef<Blob | null>(null);

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
        audioBlobRef.current = audioBlob;
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
    if (!isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  const handleClearRecording = () => {
    setAudioUrl(null);
    setTranscription(null);
    audioBlobRef.current = null;
  };

  const transcribeAudio = async (): Promise<string> => {
    if (!audioUrl || !audioBlobRef.current) {
      throw new Error("No audio recording available");
    }
    
    setIsProcessing(true);
    
    try {
      // Check if we have an API key
      if (!apiKey) {
        // If no API key, use simulation instead
        await new Promise(resolve => setTimeout(resolve, 1500));
        const simulatedTranscription = "This is a simulated transcription of the recorded answer. In a real implementation, this would be the actual transcribed text from the OpenAI API.";
        setTranscription(simulatedTranscription);
        setIsProcessing(false);
        return simulatedTranscription;
      }
      
      // Create a FormData instance to send the audio file
      const formData = new FormData();
      formData.append('file', audioBlobRef.current, 'recording.webm');
      formData.append('model', 'whisper-1');
      formData.append('language', 'en');
      
      // Make the API request to OpenAI's Whisper API
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`Whisper API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const transcribedText = data.text || '';
      
      setTranscription(transcribedText);
      setIsProcessing(false);
      return transcribedText;
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setIsProcessing(false);
      
      toast({
        title: "Transcription failed",
        description: "Unable to transcribe audio. Using simulated transcription instead.",
        variant: "destructive"
      });
      
      // Fallback to simulated transcription
      const simulatedTranscription = "This is a simulated transcription as the OpenAI API call failed. Please check your API key or try again later.";
      setTranscription(simulatedTranscription);
      return simulatedTranscription;
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
    setTranscription,
    setApiKey
  };
};
