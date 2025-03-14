
import { useState, useRef, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { startRecording, stopRecording } from '@/utils/interviewUtils';

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs
  const recordingTimerRef = useRef<number | null>(null);

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
  const handleStartRecording = () => {
    startRecording(setIsRecording, setRecordingTime, setAudioUrl);
  };

  const handleStopRecording = () => {
    stopRecording(setIsRecording, setAudioUrl);
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
  };

  return {
    isRecording,
    recordingTime,
    audioUrl,
    isPlaying,
    handleStartRecording,
    handleStopRecording,
    handleTogglePlayback,
    handleClearRecording,
    setAudioUrl
  };
};
