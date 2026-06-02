import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileAudio, X } from "lucide-react";
import { toast } from "sonner";

export const UploadSection = ({ onAnalysisComplete }: { onAnalysisComplete: (data: any) => void }) => {

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('audio/')) {
      setFile(droppedFile);
      toast.success("Audio file uploaded successfully!");
    } else {
      toast.error("Please upload an audio file");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast.success("Audio file uploaded successfully!");
    }
  };

  const removeFile = () => {
    setFile(null);
    toast.info("File removed");
  };

  return (
    <section id="upload-section" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Upload Your Audio File
          </h2>
          <p className="text-muted-foreground text-lg">
            Support for MP3, WAV, OGG, and other common audio formats
          </p>
        </div>

        <Card className="p-8 shadow-soft border-2 border-dashed border-border hover:border-primary/50 transition-colors">
          <div
            className={`relative ${isDragging ? 'scale-105' : ''} transition-transform duration-200`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="text-center py-12">
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary/10">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Drag & Drop Your Audio File
                </h3>
                <p className="text-muted-foreground mb-6">
                  or click the button below to browse
                </p>

                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="audio/*"
                  onChange={handleFileInput}
                />
                <label htmlFor="file-upload">
                  <Button variant="gradient" size="lg" className="cursor-pointer" asChild>
                    <span>
                      <FileAudio className="w-5 h-5" />
                      Choose File
                    </span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="py-8">
                <div className="flex items-center justify-between p-6 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary/20 flex items-center justify-center">
                      <FileAudio className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button
  variant="gradient" 
  size="lg" 
  className="flex-1"
  onClick={async () => {
    console.log("analyze button clicked!!");
    if (!file) return toast.error("Please upload a file first!");

    const formData = new FormData();
    formData.append("file", file);

    toast.loading("Analyzing audio...");

    try {
      const response = await fetch("http://127.0.0.1:8080/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      toast.dismiss();

      if (response.ok) {
        toast.success("Analysis complete!");
        console.log("Backend response:", data);
        onAnalysisComplete(data);
        // TODO: send data to parent (Index.tsx)
      } else {
        toast.error(data.error || "Error analyzing audio");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Backend not reachable. Check Flask server!");
    }
  }}
>
  Analyze Audio
</Button>

                  <input
                    type="file"
                    id="file-replace"
                    className="hidden"
                    accept="audio/*"
                    onChange={handleFileInput}
                  />
                  <label htmlFor="file-replace">
                    <Button variant="outline" size="lg" asChild>
                      <span>Replace File</span>
                    </Button>
                  </label>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};
