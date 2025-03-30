
import { useRef, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Mic, Play, RefreshCw, RotateCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SentimentScore {
  confidence: number;
  clarity: number;
  relevance: number;
  overall: number;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  sentiment?: SentimentScore;
}

interface InterviewChatProps {
  messages: Message[];
  isRecording: boolean;
  recordingTime: number;
  isPlaying: boolean;
  isAnalyzing: boolean;
  isProcessing: boolean;
  audioUrl: string | null;
  transcription: string | null;
  startRecording: () => void;
  stopRecording: () => void;
  togglePlayback: () => void;
  submitRecording: () => void;
  clearRecording: () => void;
}

const InterviewChat = ({
  messages,
  isRecording,
  recordingTime,
  isPlaying,
  isAnalyzing,
  isProcessing,
  audioUrl,
  transcription,
  startRecording,
  stopRecording,
  togglePlayback,
  submitRecording,
  clearRecording
}: InterviewChatProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, transcription]);
  
  // Check if this message is a new question after a feedback message
  const isNewQuestion = (index: number): boolean => {
    if (index <= 0) return false;
    
    const currentMsg = messages[index];
    const prevMsg = messages[index - 1];
    
    // If current message is from AI and doesn't have sentiment data
    // and previous message is also from AI with sentiment data
    return currentMsg.role === 'ai' && 
           !currentMsg.sentiment && 
           prevMsg.role === 'ai' && 
           prevMsg.sentiment !== undefined;
  };

  return (
    <div>
      <div ref={chatContainerRef} className="h-64 overflow-y-auto space-y-4 mb-4 p-2">
        {messages.map((message, index) => (
          <div key={index}>
            {/* Add a visual separator before a new question */}
            {isNewQuestion(index) && (
              <div className="my-4 flex items-center">
                <div className="flex-grow h-px bg-muted-foreground/30"></div>
                <div className="mx-2 text-xs text-muted-foreground">Next Question</div>
                <div className="flex-grow h-px bg-muted-foreground/30"></div>
              </div>
            )}
            
            <div 
              className={`p-3 rounded-lg ${message.role === 'ai' 
                ? 'bg-[#F5F5F5] text-foreground mr-12' 
                : 'bg-primary text-primary-foreground ml-12'}`}
            >
              <div dangerouslySetInnerHTML={{ __html: message.content }} />
              {message.sentiment && (
                <div className="mt-2 pt-2 border-t border-border">
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>
                      <div className="font-semibold">Confidence</div>
                      <div className="flex items-center">
                        <Progress value={message.sentiment.confidence} className="h-1.5 mr-2 w-16" />
                        {message.sentiment.confidence}%
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">Clarity</div>
                      <div className="flex items-center">
                        <Progress value={message.sentiment.clarity} className="h-1.5 mr-2 w-16" />
                        {message.sentiment.clarity}%
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">Relevance</div>
                      <div className="flex items-center">
                        <Progress value={message.sentiment.relevance} className="h-1.5 mr-2 w-16" />
                        {message.sentiment.relevance}%
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">Overall</div>
                      <div className="flex items-center">
                        <Progress value={message.sentiment.overall} className="h-1.5 mr-2 w-16" />
                        {message.sentiment.overall}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Show transcription processing state */}
        {isProcessing && (
          <div className="flex justify-center items-center p-4">
            <RotateCw className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Transcribing your response...</span>
          </div>
        )}
        
        {/* Show transcription preview */}
        {transcription && !isAnalyzing && (
          <div className="p-3 rounded-lg bg-primary/10 text-foreground mr-12">
            <div className="font-semibold mb-1 text-sm">Transcription Preview:</div>
            <div className="text-sm italic">{transcription}</div>
          </div>
        )}
        
        {isAnalyzing && (
          <div className="flex justify-center items-center p-4">
            <RotateCw className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Analyzing your response...</span>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-2 items-center">
          <div className="flex space-x-3">
            <Button 
              onClick={isRecording ? stopRecording : startRecording} 
              className={`rounded-full w-12 h-12 flex items-center justify-center ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
              disabled={isProcessing || isAnalyzing}
            >
              <Mic className={`h-6 w-6 ${isRecording ? 'animate-pulse' : ''}`} />
            </Button>
            
            {audioUrl && (
              <>
                <Button 
                  variant="outline" 
                  onClick={togglePlayback} 
                  className="rounded-full w-12 h-12 flex items-center justify-center" 
                  disabled={isProcessing || isAnalyzing}
                >
                  <Play className={`h-6 w-6 ${isPlaying ? 'text-green-500' : ''}`} />
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={clearRecording} 
                  className="rounded-full w-12 h-12 flex items-center justify-center" 
                  disabled={isProcessing || isAnalyzing}
                >
                  <RefreshCw className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
          
          {isRecording && (
            <div className="flex items-center text-sm">
              <span className="text-red-500 animate-pulse mr-2">●</span>
              Recording: {recordingTime}s / 30s
            </div>
          )}
          
          {audioUrl && !isProcessing && !isAnalyzing && (
            <Button className="mt-2" onClick={submitRecording}>
              Submit Response
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewChat;
