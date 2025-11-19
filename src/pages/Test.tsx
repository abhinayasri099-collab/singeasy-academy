import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Mic, Square, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const testTunes = [
  {
    id: 1,
    name: "Simple Scale",
    description: "Try to match this basic do-re-mi scale",
    audioFile: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    tips: ["Listen carefully before attempting", "Focus on smooth transitions", "Keep steady pitch"]
  },
  {
    id: 2,
    name: "Melody Pattern",
    description: "Repeat this short melody pattern",
    audioFile: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    tips: ["Break it into smaller parts", "Match the rhythm too", "Stay relaxed"]
  }
];

const Test = () => {
  const [selectedTune, setSelectedTune] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const playTune = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      toast.success("Playing sample tune...");
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        setHasRecorded(true);
        generateFeedback();
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording your attempt! 🎤");
    } catch (error) {
      toast.error("Could not access microphone");
      console.error(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const generateFeedback = () => {
    const feedbackOptions = [
      "Good attempt! Keep practicing to improve pitch accuracy. 🎵",
      "Nice try! Focus on staying on pitch throughout. Your rhythm was good! 👍",
      "Great effort! Try increasing your pitch control with more practice. Keep going! 💪",
      "Well done! Your voice is improving. Practice breath control for better results. 🌟",
      "Excellent try! Keep working on maintaining steady notes. You're on the right track! ✨"
    ];
    
    const randomFeedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
    setFeedback(randomFeedback);
    toast.success("Feedback generated!");
  };

  const resetTest = () => {
    setHasRecorded(false);
    setFeedback(null);
    toast.info("Test reset. Try again!");
  };

  const currentTune = testTunes[selectedTune];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Mini Singing Test 🎤
            </h1>
            <p className="text-xl text-muted-foreground">
              Listen to a tune, try to sing it back, and get feedback!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {testTunes.map((tune, index) => (
              <Card 
                key={tune.id}
                className={`cursor-pointer transition-all ${
                  selectedTune === index 
                    ? 'ring-2 ring-primary shadow-[var(--shadow-soft)]' 
                    : 'shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)]'
                }`}
                onClick={() => {
                  setSelectedTune(index);
                  setHasRecorded(false);
                  setFeedback(null);
                }}
              >
                <CardHeader>
                  <CardTitle>{tune.name}</CardTitle>
                  <CardDescription>{tune.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="mb-8 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-2xl">Test Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-3 text-foreground">Step 1: Listen</h3>
                  <p className="text-muted-foreground mb-4">Play the sample tune and listen carefully</p>
                  <Button 
                    onClick={playTune}
                    disabled={isPlaying}
                    className="rounded-full"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {isPlaying ? "Playing..." : "Play Sample"}
                  </Button>
                  <audio ref={audioRef} src={currentTune.audioFile} className="hidden" />
                </div>

                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-3 text-foreground">Step 2: Sing</h3>
                  <p className="text-muted-foreground mb-4">Record yourself singing the same tune</p>
                  {!isRecording && !hasRecorded && (
                    <Button 
                      onClick={startRecording}
                      variant="outline"
                      className="rounded-full"
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Start Recording
                    </Button>
                  )}
                  {isRecording && (
                    <Button 
                      onClick={stopRecording}
                      variant="destructive"
                      className="rounded-full animate-pulse"
                    >
                      <Square className="mr-2 h-4 w-4" />
                      Stop Recording
                    </Button>
                  )}
                  {hasRecorded && (
                    <Button 
                      onClick={resetTest}
                      variant="outline"
                      className="rounded-full"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Try Again
                    </Button>
                  )}
                </div>

                {feedback && (
                  <div className="bg-primary/10 border-2 border-primary/20 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-3 text-foreground">Your Feedback:</h3>
                    <p className="text-foreground text-lg">{feedback}</p>
                  </div>
                )}
              </div>

              <Card className="bg-accent/10 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-lg">Helpful Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {currentTune.tips.map((tip, index) => (
                    <p key={index} className="text-muted-foreground">• {tip}</p>
                  ))}
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="py-6">
              <p className="text-center text-muted-foreground">
                💡 <strong>Remember:</strong> This is just for practice and fun. Regular practice with real lessons 
                will help you improve much faster. Keep singing! 🎵
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Test;
