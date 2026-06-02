import { useState } from "react";
import { Hero } from "@/components/Hero";
import { UploadSection } from "@/components/UploadSection";
import { FeaturesDisplay } from "@/components/FeaturesDisplay";
import { ResultsSection } from "@/components/ResultsSection";

const Index = () => {
  const [analysisData, setAnalysisData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <UploadSection onAnalysisComplete={setAnalysisData} />
      <FeaturesDisplay featuresData={analysisData?.features} />
      <ResultsSection resultData={analysisData} />
    </div>
  );
};

export default Index;