import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Globe, Layers, Rocket, Heart } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed with instant loading times and smooth interactions.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security with encryption and compliance built-in.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Deploy worldwide with edge locations ensuring low latency everywhere.",
  },
  {
    icon: Layers,
    title: "Modern Stack",
    description: "Built with cutting-edge technologies for maximum flexibility.",
  },
  {
    icon: Rocket,
    title: "Easy Deployment",
    description: "One-click deployments with automatic CI/CD integration.",
  },
  {
    icon: Heart,
    title: "Developer Love",
    description: "Intuitive APIs and comprehensive documentation you'll enjoy.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you build, deploy, and scale your applications with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
