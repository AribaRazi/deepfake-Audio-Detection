import { Button } from "@/components/ui/button";
import { Upload, Shield, AudioWaveform } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-bg overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full shadow-soft">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Audio Authentication</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Detect Deepfake Audio
            <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
              With Precision
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Advanced machine learning algorithms analyze audio features like MFCCs, Zero Crossing Rate, 
            and spectral characteristics to identify synthetic voice patterns with high accuracy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              variant="gradient" 
              size="lg" 
              className="group"
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Upload Audio File
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <AudioWaveform className="w-5 h-5" />
              View Features
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent">40+</div>
              <div className="text-sm text-muted-foreground">Audio Features</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">&lt;2s</div>
              <div className="text-sm text-muted-foreground">Processing Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
