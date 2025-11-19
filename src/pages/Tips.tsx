import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, AlertCircle, Calendar, Sparkles } from "lucide-react";

const Tips = () => {
  const tips = [
    "Stay hydrated - drink plenty of water throughout the day",
    "Practice daily, even if just for 10-15 minutes",
    "Warm up your voice before singing",
    "Record yourself to track improvement",
    "Don't compare yourself to others - focus on your own progress",
    "Rest your voice when it feels tired",
    "Sing songs you love to stay motivated",
    "Stand up straight for better breathing",
    "Relax your jaw and shoulders while singing",
    "Be patient - improvement takes time"
  ];

  const mistakes = [
    {
      mistake: "Singing from the throat",
      solution: "Use your diaphragm for proper breath support. Place your hand on your belly and feel it expand as you breathe."
    },
    {
      mistake: "Straining to hit high notes",
      solution: "Build your range gradually. Don't force high notes - it can damage your voice. Practice scales slowly."
    },
    {
      mistake: "Not warming up",
      solution: "Always warm up for 5-10 minutes before singing. Start with gentle humming and lip trills."
    },
    {
      mistake: "Poor posture",
      solution: "Stand or sit up straight with shoulders relaxed. Good posture opens up your airways for better sound."
    },
    {
      mistake: "Practicing when sick",
      solution: "Rest your voice when you have a cold or sore throat. Singing while sick can cause long-term damage."
    }
  ];

  const routine = [
    { time: "0-2 min", activity: "Deep breathing exercises" },
    { time: "2-4 min", activity: "Gentle humming" },
    { time: "4-6 min", activity: "Lip trills and tongue trills" },
    { time: "6-8 min", activity: "Simple scales (do-re-mi)" },
    { time: "8-10 min", activity: "Practice a favorite simple song" }
  ];

  const quotes = [
    { quote: "The voice is a muscle, and it needs to be exercised.", author: "Renée Fleming" },
    { quote: "Singing is a way of escaping. It's another world.", author: "Edith Piaf" },
    { quote: "To sing is to pray twice.", author: "St. Augustine" },
    { quote: "The only thing better than singing is more singing.", author: "Ella Fitzgerald" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Tips & Motivation ✨
            </h1>
            <p className="text-xl text-muted-foreground">
              Essential advice to help you on your singing journey
            </p>
          </div>

          <Card className="mb-8 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lightbulb className="h-6 w-6 text-primary" />
                Tips for Beginners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 bg-muted/50 rounded-lg p-4">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <p className="text-muted-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <AlertCircle className="h-6 w-6 text-accent" />
                Common Mistakes & Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mistakes.map((item, index) => (
                <div key={index} className="border-l-4 border-primary pl-6 py-2">
                  <h3 className="font-bold text-lg mb-2 text-foreground">❌ {item.mistake}</h3>
                  <p className="text-muted-foreground">✅ <strong>Solution:</strong> {item.solution}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-8 shadow-[var(--shadow-card)] bg-gradient-to-br from-card to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calendar className="h-6 w-6 text-primary" />
                Daily 5-Minute Vocal Routine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routine.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-background rounded-lg p-4">
                    <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-bold flex-shrink-0">
                      {item.time}
                    </div>
                    <p className="text-foreground font-medium">{item.activity}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground text-center">
                ⏰ Do this routine every day for best results!
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)] bg-gradient-to-br from-primary/5 to-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-primary" />
                Motivational Quotes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {quotes.map((item, index) => (
                <blockquote key={index} className="border-l-4 border-accent pl-6 py-2">
                  <p className="text-lg italic text-foreground mb-2">"{item.quote}"</p>
                  <cite className="text-muted-foreground font-medium">— {item.author}</cite>
                </blockquote>
              ))}
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold mb-3">Remember 💪</h3>
                <p className="text-lg">
                  Every great singer started as a beginner. With consistent practice and patience, 
                  you WILL improve. Celebrate small wins and enjoy the journey!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
