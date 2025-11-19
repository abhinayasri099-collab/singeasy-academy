import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, Mic2, Lightbulb } from "lucide-react";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-singing.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Start Your Singing Journey Today! 🎵
              </h1>
              <p className="text-xl text-muted-foreground">
                Learn singing basics at your own pace. From breathing techniques to pitch control, 
                we make it simple, fun, and effective for complete beginners.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/lessons">
                  <Button size="lg" className="rounded-full text-lg px-8 shadow-[var(--shadow-soft)]">
                    Start Learning
                  </Button>
                </Link>
                <Link to="/practice">
                  <Button size="lg" variant="outline" className="rounded-full text-lg px-8">
                    Practice Zone
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Person singing joyfully" 
                className="rounded-3xl shadow-[var(--shadow-soft)] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose SingEasy?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Music className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Beginner-Friendly</h3>
              <p className="text-muted-foreground">
                Structured lessons designed specifically for those starting from scratch. No prior experience needed!
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Mic2 className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Interactive Practice</h3>
              <p className="text-muted-foreground">
                Record yourself, practice vocal exercises, and get instant feedback on your progress.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
              <div className="w-14 h-14 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                <Lightbulb className="h-7 w-7 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Expert Tips</h3>
              <p className="text-muted-foreground">
                Learn from proven techniques and avoid common mistakes with our curated tips and guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to Find Your Voice?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who discovered their singing potential with SingEasy.
          </p>
          <Link to="/lessons">
            <Button size="lg" className="rounded-full text-lg px-12 shadow-[var(--shadow-soft)]">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
