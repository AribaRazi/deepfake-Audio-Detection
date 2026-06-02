// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { CheckCircle2, AlertTriangle, Download, Share2 } from "lucide-react";
// import { Progress } from "@/components/ui/progress";

// export const ResultsSection = ({ resultData }: { resultData?: any }) => {
//   const isAuthentic = resultData?.label === "Human";
//   const confidence = resultData?.confidence || 0;
//   const pred=resultData?.prediction_time ?? 0;
//   const val = resultData?.label === "Human" ? "Natural" : "Synthetic";
//   const dur=resultData?.duration||0;
//   const handleSeeReport=()=>{
//     window.open("http://127.0.0.1:8080/report","_blank");
//     };
  
//   return (
//     <section className="py-20 px-4">
//       <div className="container mx-auto max-w-4xl">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-foreground mb-4">
//             Analysis Results
//           </h2>
//           <p className="text-muted-foreground text-lg">
//             Deepfake detection report
//           </p>
//         </div>

//         <Card className="p-8 shadow-soft">
//           {/* Result Badge */}
//           <div className="text-center mb-8">
//             <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
//               isAuthentic 
//                 ? 'bg-green-500/10 border-2 border-green-500/30' 
//                 : 'bg-red-500/10 border-2 border-red-500/30'
//             }`}>
//               {isAuthentic ? (
//                 <>
//                   <CheckCircle2 className="w-6 h-6 text-green-600" />
//                   <span className="text-lg font-semibold text-green-700">Authentic Human Audio</span>
//                 </>
//               ) : (
//                 <>
//                   <AlertTriangle className="w-6 h-6 text-red-600" />
//                   <span className="text-lg font-semibold text-red-700">Deepfake Detected</span>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Confidence Score */}
//           <div className="mb-8">
//             <div className="flex justify-between items-center mb-3">
//               <span className="text-sm font-medium text-foreground">Confidence Score</span>
//               <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//                 {confidence}%
//               </span>
//             </div>
//             <Progress value={confidence} className="h-3" />
//           </div>

//           {/* Detailed Metrics */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//             <div className="p-4 bg-muted/50 rounded-lg">
//               <div className="text-sm text-muted-foreground mb-1">Processing Time</div>
//                 <span className="text-xl font-bold text-foreground">
//                 {pred}ms
//               </span>
//             </div>
//             <div className="p-4 bg-muted/50 rounded-lg">
//               <div className="text-sm text-muted-foreground mb-1">Model Version</div>
//               <div className="text-xl font-bold text-foreground">v2.4.1</div>
//             </div>
//             <div className="p-4 bg-muted/50 rounded-lg">
//               <div className="text-sm text-muted-foreground mb-1">Features Analyzed</div>
//               <div className="text-xl font-bold text-foreground">42</div>
//             </div>
//             <div className="p-4 bg-muted/50 rounded-lg">
//               <div className="text-sm text-muted-foreground mb-1">Audio Duration</div>
//               <div className="text-xl font-bold text-foreground">{dur}s</div>
//             </div>
//           </div>

//           {/* Feature Breakdown */}
//           <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border">
//             <h3 className="text-lg font-semibold text-foreground mb-4">Key Indicators</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-foreground">MFCC Pattern Match</span>
//                 <span className="font-mono text-sm text-green-600">{val}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-foreground">Zero Crossing Rate</span>
//                 <span className="font-mono text-sm text-green-600">{val}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-foreground">Spectral Anomalies</span>
//                 <span className="font-mono text-sm text-green-600">{val}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-foreground">Temporal Consistency</span>
//                 <span className="font-mono text-sm text-green-600">{val}</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Actions */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             <Button variant="gradient" className="flex-1" onClick={handleSeeReport}>
//               <Download className="w-4 h-4" />
//               See report
//             </Button>
//             {/* <Button variant="outline" className="flex-1">
//               <Share2 className="w-4 h-4" />
//               Share Results
//             </Button> */}
//           </div>
//         </Card>
//       </div>
//     </section>
//   );
// };

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import jsPDF from "jspdf";

export const ResultsSection = ({ resultData }: { resultData?: any }) => {
  const isAuthentic = resultData?.label === "Human";
  const confidence = resultData?.confidence || 0;
  const pred = resultData?.prediction_time ?? 0;
  const val = resultData?.label === "Human" ? "Natural" : "Synthetic";
  const dur = resultData?.duration || 0;
  const features = resultData?.features || {};

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();

    // ── Header ──
    doc.setFillColor(79, 70, 229); 
    doc.rect(0, 0, pageW, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Deepfake Audio Detection Report", pageW / 2, 18, { align: "center" });
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageW / 2, 30, { align: "center" });

    // ── Verdict ──
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Verdict", 14, 54);
    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");

    if (isAuthentic) {
      doc.setTextColor(22, 163, 74); // green
      doc.text("✔  Authentic Human Audio", 14, 64);
    } else {
      doc.setTextColor(220, 38, 38); // red
      doc.text("✘  Deepfake Detected", 14, 64);
    }

    // ── Metrics ──
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Metrics", 14, 80);

    const metrics = [
      ["Confidence Score", `${(confidence * 100).toFixed(1)}%`],
      ["Processing Time", `${pred} ms`],
      ["Audio Duration", `${dur.toFixed(2)} s`],
      ["Features Analyzed", "29"],
      ["Model Version", "v2.4.1"],
    ];

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    metrics.forEach(([label, value], i) => {
      const y = 90 + i * 10;
      doc.setTextColor(100, 100, 100);
      doc.text(label, 14, y);
      doc.setTextColor(0, 0, 0);
      doc.text(value, 100, y);
    });

    // ── Key Indicators ──
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Key Indicators", 14, 148);

    const indicators = [
      "MFCC Pattern Match",
      "Zero Crossing Rate",
      "Spectral Anomalies",
      "Temporal Consistency",
    ];
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    indicators.forEach((ind, i) => {
      const y = 158 + i * 10;
      doc.setTextColor(100, 100, 100);
      doc.text(ind, 14, y);
      doc.setTextColor(isAuthentic ? 22 : 220, isAuthentic ? 163 : 38, isAuthentic ? 74 : 38);
      doc.text(val, 100, y);
    });

    // ── Audio Features ──
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Extracted Audio Features", 14, 210);

    const featureRows = [
      ["Spectral Centroid", features.centroid?.toFixed(4) ?? "N/A"],
      ["Zero Crossing Rate", features.zcr?.toFixed(6) ?? "N/A"],
      ["Spectral Rolloff", features.rolloff?.toFixed(4) ?? "N/A"],
      ["RMS Energy", features.rms?.toFixed(6) ?? "N/A"],
    ];
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    featureRows.forEach(([label, value], i) => {
      const y = 220 + i * 10;
      doc.setTextColor(100, 100, 100);
      doc.text(label, 14, y);
      doc.setTextColor(0, 0, 0);
      doc.text(value, 100, y);
    });

    // ── MFCC Values ──
    if (features.mfcc_mean?.length) {
      doc.addPage();
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, pageW, 20, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("MFCC Mean Values", pageW / 2, 13, { align: "center" });

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      features.mfcc_mean.forEach((val: number, i: number) => {
        doc.setTextColor(100, 100, 100);
        doc.text(`MFCC ${i + 1}`, 14, 30 + i * 10);
        doc.setTextColor(0, 0, 0);
        doc.text(val.toFixed(6), 100, 30 + i * 10);
      });
    }

    // ── Footer ──
    const pages = doc.internal.pages.length - 1;
    for (let p = 1; p <= pages; p++) {
      doc.setPage(p);
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("Deepfake Detection Lab — Confidential", 14, 290);
      doc.text(`Page ${p} of ${pages}`, pageW - 14, 290, { align: "right" });
    }

    doc.save("deepfake-report.pdf");
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Analysis Results</h2>
          <p className="text-muted-foreground text-lg">Deepfake detection report</p>
        </div>

        <Card className="p-8 shadow-soft">
          {/* Verdict */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
              isAuthentic
                ? "bg-green-500/10 border-2 border-green-500/30"
                : "bg-red-500/10 border-2 border-red-500/30"
            }`}>
              {isAuthentic ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-semibold text-green-700">Authentic Human Audio</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <span className="text-lg font-semibold text-red-700">Deepfake Detected</span>
                </>
              )}
            </div>
          </div>

          {/* Confidence */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-foreground">Confidence Score</span>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {(confidence * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={confidence * 100} className="h-3" />
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Processing Time</div>
              <span className="text-xl font-bold text-foreground">{pred}ms</span>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Model Version</div>
              <div className="text-xl font-bold text-foreground">v2.4.1</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Features Analyzed</div>
              <div className="text-xl font-bold text-foreground">29</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Audio Duration</div>
              <div className="text-xl font-bold text-foreground">{dur.toFixed(2)}s</div>
            </div>
          </div>

          {/* Key Indicators */}
          <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Indicators</h3>
            <div className="space-y-3">
              {["MFCC Pattern Match", "Zero Crossing Rate", "Spectral Anomalies", "Temporal Consistency"].map((ind) => (
                <div key={ind} className="flex justify-between items-center">
                  <span className="text-sm text-foreground">{ind}</span>
                  <span className={`font-mono text-sm ${isAuthentic ? "text-green-600" : "text-red-600"}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <Button variant="gradient" className="w-full" onClick={handleDownloadPDF}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF Report
          </Button>
        </Card>
      </div>
    </section>
  );
};