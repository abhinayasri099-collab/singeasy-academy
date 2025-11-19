import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Music, Wind, Activity, Waves } from "lucide-react";
import { cn } from "@/lib/utils";

const lessons = [
  {
    id: 1,
    title: "Understanding Pitch",
    icon: Music,
    description: "Learn what pitch is and how to control your voice",
    content: `Pitch is how high or low a sound is. When you sing, you're changing the pitch of your voice to create melody.

**Key Points:**
- Pitch is measured in frequencies (Hz)
- Higher notes = higher frequency, lower notes = lower frequency
- Your vocal cords vibrate to create different pitches
- Practice matching pitches you hear

**Exercise:** Try humming a simple tune like "Happy Birthday" and focus on going up and down smoothly.`,
    videoId: "8x3c3LhnXa8"
  },
  {
    id: 2,
    title: "Rhythm and Beat",
    icon: Activity,
    description: "Master timing and staying in rhythm while singing",
    content: `Rhythm is the pattern of sounds and silences in music. Good rhythm makes your singing sound professional.

**Key Points:**
- Beat is the steady pulse you feel in music
- Rhythm is the pattern of long and short sounds
- Clap or tap along to music to internalize the beat
- Count out loud: 1-2-3-4 to stay on time

**Exercise:** Listen to a simple song and clap along to the beat. Then try singing while maintaining that steady pulse.`,
    videoId: "gXh5bWCo6e0"
  },
  {
    id: 3,
    title: "Breathing Techniques",
    icon: Wind,
    description: "Proper breathing is the foundation of great singing",
    content: `Breath control is essential for sustaining notes and singing with power and emotion.

**Key Points:**
- Breathe from your diaphragm (belly), not chest
- Inhale deeply through your nose
- Release air steadily and controlled
- Practice "belly breathing" daily

**Exercise:** Lie on your back with a book on your stomach. Breathe so the book rises and falls. This is diaphragmatic breathing.`,
    videoId: "R-K_ksKvK6U"
  },
  {
    id: 4,
    title: "Vocal Warm-ups",
    icon: Waves,
    description: "Prepare your voice before singing",
    content: `Warming up prevents strain and helps you sing better. Never skip your warm-up!

**Key Points:**
- Always warm up for 5-10 minutes before singing
- Start with gentle humming
- Do lip trills and tongue trills
- Gradually increase your range

**Exercise:** Try these warm-ups:
1. Lip trills (like a motor sound)
2. Humming scales (do-re-mi)
3. "Mee-May-Mah-Moh-Moo" on different pitches`,
    videoId: "9QozH3u_5RQ"
  }
];

const Lessons = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Beginner Singing Lessons
            </h1>
            <p className="text-xl text-muted-foreground">
              Master the fundamentals of singing with our step-by-step lessons
            </p>
          </div>

          <div className="space-y-6">
            {lessons.map((lesson) => {
              const Icon = lesson.icon;
              const isOpen = openId === lesson.id;
              
              return (
                <Collapsible
                  key={lesson.id}
                  open={isOpen}
                  onOpenChange={() => setOpenId(isOpen ? null : lesson.id)}
                >
                  <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all">
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 text-left">
                          <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                          <CardDescription className="text-base">{lesson.description}</CardDescription>
                        </div>
                        <ChevronDown 
                          className={cn(
                            "h-6 w-6 text-muted-foreground transition-transform flex-shrink-0",
                            isOpen && "transform rotate-180"
                          )} 
                        />
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0 space-y-6">
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-line text-foreground">
                            {lesson.content}
                          </div>
                        </div>
                        
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                          <div className="relative pb-[56.25%]">
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src={`https://www.youtube.com/embed/${lesson.videoId}`}
                              title={lesson.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
