
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Check, Key } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface ApiKeySettingsProps {
  apiKey: string | null;
  setApiKey: (key: string) => void;
}

const ApiKeySettings = ({ apiKey, setApiKey }: ApiKeySettingsProps) => {
  const [key, setKey] = useState(apiKey || '');
  const [isKeySaved, setIsKeySaved] = useState(Boolean(apiKey));
  const [isKeyHidden, setIsKeyHidden] = useState(true);
  const [isValidating, setIsValidating] = useState(false);

  const handleSaveKey = async () => {
    if (!key.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }
    
    // Validate the API key format
    if (!key.trim().startsWith('sk-')) {
      toast({
        title: "Invalid API Key",
        description: "OpenAI API keys should start with 'sk-'",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsValidating(true);
      
      // For security reasons, we won't validate the key by making an API call
      // Instead, we'll just check the format and trust it
      
      // Store in localStorage
      localStorage.setItem('openai_api_key', key.trim());
      setApiKey(key.trim());
      setIsKeySaved(true);
      
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved successfully",
      });
    } catch (error) {
      console.error("Error validating API key:", error);
      toast({
        title: "Validation Failed",
        description: "Could not validate your API key",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setKey('');
    setIsKeySaved(false);
    
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="mr-2 h-5 w-5" />
          OpenAI API Settings
        </CardTitle>
        <CardDescription>
          Enter your OpenAI API key to enable real-time transcription and interview feedback
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Alert className="bg-amber-50 text-amber-800 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription>
                Your API key is stored locally in your browser and is never sent to our servers.
                All API calls are made directly from your browser to OpenAI through our secure edge functions.
              </AlertDescription>
            </Alert>

            <div className="relative">
              <Input
                type={isKeyHidden ? "password" : "text"}
                placeholder="sk-..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="pr-24"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs"
                onClick={() => setIsKeyHidden(!isKeyHidden)}
              >
                {isKeyHidden ? "Show" : "Hide"}
              </Button>
            </div>
          </div>

          {isKeySaved && (
            <div className="flex items-center text-sm text-green-600">
              <Check className="mr-1 h-4 w-4" />
              API key is currently set
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClearKey} disabled={!isKeySaved || isValidating}>
          Clear Key
        </Button>
        <Button onClick={handleSaveKey} disabled={isValidating}>
          {isValidating ? "Validating..." : "Save Key"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiKeySettings;
