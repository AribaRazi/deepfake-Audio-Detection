import { Card } from "@/components/ui/card";
import { Activity, BarChart3, Radio, Waves, Zap, TrendingUp } from "lucide-react";

export const FeaturesDisplay = ({ featuresData }: { featuresData?: any }) => {
const features = [
  {
    icon: Waves,
    title: "MFCCs",
    subtitle: "Mel-Frequency Cepstral Coefficients",
    description: "Captures the spectral envelope of the audio signal, representing how the human ear perceives sound.",
          value: featuresData?.mfcc_mean
        ? `${featuresData.mfcc_mean.length} coefficients`
        : "0",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    icon: Activity,
    title: "ZCR",
    subtitle: "Zero Crossing Rate",
    description: "Measures how frequently the signal changes from positive to negative, useful for detecting voiced/unvoiced speech.",
    value: featuresData?.zcr ? featuresData.zcr.toFixed(4) : "0",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: BarChart3,
    title: "Spectral Centroid",
    subtitle: "Frequency Distribution",
    description: "Indicates where the 'center of mass' of the spectrum is located, correlating with perception of brightness.",
     value: featuresData?.centroid
        ? `${(featuresData.centroid / 1000).toFixed(2)} kHz`
        : "0",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    icon: Radio,
    title: "Chroma Features",
    subtitle: "Pitch Class Profile",
    description: "Represents the 12 different pitch classes, useful for detecting harmonic content and musical patterns.",
     value: featuresData?.chroma_mean
        ? `${featuresData.chroma_mean.length} bins`
        : "0",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "RMS Energy",
    subtitle: "Root Mean Square",
    description: "Measures the average power of the signal over time, indicating overall loudness and dynamics.",
     value: featuresData?.rms ? featuresData.rms.toFixed(3) : "0",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: TrendingUp,
    title: "Spectral Rolloff",
    subtitle: "Frequency Analysis",
    description: "Frequency below which a certain percentage of total spectral energy lies, useful for distinguishing voiced speech.",
     value: featuresData?.rolloff
        ? `${(featuresData.rolloff / 1000).toFixed(2)} kHz`
        : "0",
    gradient: "from-green-500 to-emerald-500",
  },
];

  return (
    <section id="features-section" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Extracted Audio Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our advanced analysis engine extracts multiple features from your audio to detect manipulation patterns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 hover:shadow-glow transition-all duration-300 group cursor-pointer border border-border hover:border-primary/30"
              >
                <div className="space-y-4">
                  {/* Icon and Value */}
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <div className="px-3 py-1 bg-muted rounded-full">
                      <span className="text-sm font-mono text-foreground">{feature.value}</span>
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {feature.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Progress bar visualization */}
                  <div className="pt-2">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-1000`}
                        style={{ 
                          width: `${60 + (index * 7)}%`,
                          animation: 'slideIn 1s ease-out'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
