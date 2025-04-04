
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const APIKeySettings = () => {
  const [openAIKey, setOpenAIKey] = useState<string>('');
  const [isKeySet, setIsKeySet] = useState<boolean>(false);

  useEffect(() => {
    // Check if the key is already stored in localStorage
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setIsKeySet(true);
      // Only display masked key for security
      setOpenAIKey('••••••••••••••••••••••••••••');
    }
  }, []);

  const handleSaveKey = () => {
    if (openAIKey.trim() === '') {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }

    if (openAIKey.startsWith('sk-') && openAIKey.length > 20) {
      // Store the API key in localStorage
      localStorage.setItem('openai_api_key', openAIKey);
      setIsKeySet(true);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved successfully"
      });
      // Mask the displayed key for security
      setOpenAIKey('••••••••••••••••••••••••••••');
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenAI API key starting with 'sk-'",
        variant: "destructive"
      });
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('openai_api_key');
    setOpenAIKey('');
    setIsKeySet(false);
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Settings</CardTitle>
        <CardDescription>
          Manage your OpenAI API key for interview analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="openai-key" className="text-sm font-medium">
              OpenAI API Key {isKeySet && <span className="text-green-500">(Set)</span>}
            </label>
            <Input
              id="openai-key"
              type="password"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder={isKeySet ? "••••••••••••••••••••••••••••" : "Enter your OpenAI API key"}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleRemoveKey} disabled={!isKeySet}>
          Remove Key
        </Button>
        <Button onClick={handleSaveKey}>
          {isKeySet ? "Update Key" : "Save Key"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default APIKeySettings;
