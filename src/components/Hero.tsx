import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">Welcome to the future</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
            Build something{" "}
            <span className="text-primary">extraordinary</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Create stunning web experiences with our modern platform. 
            Fast, beautiful, and designed for the future of the web.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <p className="text-3xl font-bold text-foreground">10K+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">24/7</p>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
