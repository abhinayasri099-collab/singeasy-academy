import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square, Play, Download } from "lucide-react";
import { toast } from "sonner";

const exercises = [
  {
    id: 1,
    title: "AA-EE-OO Practice",
    description: "Practice vowel sounds to improve clarity",
    instructions: "Sing 'AA-EE-OO' slowly, holding each vowel for 3 seconds. Focus on clear, open sounds."
  },
  {
    id: 2,
    title: "Breath Control Humming",
    description: "Build breath support and control",
    instructions: "Take a deep breath and hum steadily for as long as you can. Try to keep the pitch consistent."
  },
  {
    id: 3,
    title: "Sa Re Ga Ma Scale",
    description: "Practice basic Indian classical scale",
    instructions: "Sing 'Sa Re Ga Ma Pa Dha Ni Sa' going up, then back down. Start slowly and build speed."
  }
];

const Practice = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started! 🎤");
    } catch (error) {
      toast.error("Could not access microphone. Please check permissions.");
      console.error(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped!");
    }
  };

  const downloadRecording = () => {
    if (audioURL) {
      const a = document.createElement('a');
      a.href = audioURL;
      a.download = `singing-practice-${Date.now()}.wav`;
      a.click();
      toast.success("Recording downloaded!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Practice Zone 🎵
            </h1>
            <p className="text-xl text-muted-foreground">
              Record yourself and practice these vocal exercises
            </p>
          </div>

          <Card className="mb-12 shadow-[var(--shadow-card)] bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle className="text-2xl">Audio Recorder</CardTitle>
              <CardDescription>Record your practice sessions and listen back</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4 justify-center">
                {!isRecording ? (
                  <Button 
                    size="lg" 
                    onClick={startRecording}
                    className="rounded-full px-8"
                  >
                    <Mic className="mr-2 h-5 w-5" />
                    Start Recording
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    onClick={stopRecording}
                    variant="destructive"
                    className="rounded-full px-8 animate-pulse"
                  >
                    <Square className="mr-2 h-5 w-5" />
                    Stop Recording
                  </Button>
                )}
              </div>

              {audioURL && (
                <div className="space-y-4 pt-4">
                  <div className="bg-muted/50 rounded-2xl p-6">
                    <p className="text-sm font-medium mb-3 text-foreground">Your Recording:</p>
                    <audio 
                      controls 
                      src={audioURL} 
                      className="w-full"
                      style={{ height: '54px' }}
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button 
                      onClick={downloadRecording}
                      variant="outline"
                      className="rounded-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Recording
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Vocal Exercises</h2>
            
            {exercises.map((exercise) => (
              <Card key={exercise.id} className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{exercise.title}</CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-sm font-medium mb-2 text-foreground">Instructions:</p>
                    <p className="text-muted-foreground">{exercise.instructions}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-accent/10 border-accent/20">
            <CardHeader>
              <CardTitle className="text-xl">Practice Tips 💡</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Always warm up before practicing exercises</p>
              <p>• Practice in a quiet environment for best results</p>
              <p>• Listen to your recordings to identify areas for improvement</p>
              <p>• Don't strain your voice - if it hurts, stop and rest</p>
              <p>• Practice regularly for 15-20 minutes daily</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Practice;
