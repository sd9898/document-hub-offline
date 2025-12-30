import { useState, useCallback } from "react";
import { Tool, FileItem, ProcessingStatus as Status } from "@/types/tools";
import { Header } from "@/components/Header";
import { DropZone } from "@/components/DropZone";
import { FileList } from "@/components/FileList";
import { ProcessingStatus } from "@/components/ProcessingStatus";
import { Button } from "@/components/ui/button";
import { Play, Plus, Download, RotateCcw, CheckCircle2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ToolPageProps {
  tool: Tool;
  onBack: () => void;
}

const iconBgStyles: Record<string, string> = {
  pdf: "bg-gradient-to-br from-pdf to-[hsl(20_90%_50%)]",
  word: "bg-gradient-to-br from-word to-[hsl(190_100%_45%)]",
  excel: "bg-gradient-to-br from-excel to-[hsl(170_80%_40%)]",
  powerpoint: "bg-gradient-to-br from-powerpoint to-[hsl(45_95%_50%)]",
  image: "bg-gradient-to-br from-image to-[hsl(310_85%_55%)]",
};

export function ToolPage({ tool, onBack }: ToolPageProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFilesSelected = useCallback(
    (newFiles: File[]) => {
      const fileItems: FileItem[] = newFiles.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      }));

      setFiles((prev) => [...prev, ...fileItems]);
      setStatus("idle");

      toast({
        title: "Files added successfully",
        description: `${newFiles.length} file(s) selected from your computer`,
      });
    },
    [toast]
  );

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleReorderFiles = useCallback((reorderedFiles: FileItem[]) => {
    setFiles(reorderedFiles);
  }, []);

  const handleProcess = useCallback(() => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files from your computer to continue",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");
    setProgress(0);

    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("complete");
          toast({
            title: "Processing complete!",
            description: `Successfully processed ${files.length} file(s)`,
          });
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 150);
  }, [files, toast]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setStatus("idle");
    setProgress(0);
  }, []);

  const getActionText = () => {
    if (tool.id.includes("merge")) return "Merge Files";
    if (tool.id.includes("split")) return "Split PDF";
    if (tool.id.includes("compress")) return "Compress";
    if (tool.id.includes("rotate")) return "Rotate Pages";
    if (tool.id.includes("to-pdf")) return "Convert to PDF";
    if (tool.id.includes("to-word")) return "Convert to Word";
    if (tool.id.includes("to-jpg")) return "Convert to Images";
    return "Process";
  };

  const Icon = tool.icon;

  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-mesh pointer-events-none" />
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      {/* Floating Orbs */}
      <div className="orb orb-purple w-[400px] h-[400px] -top-32 -right-32 animate-float" />
      <div className="orb orb-blue w-[300px] h-[300px] bottom-20 -left-20 animate-float" style={{ animationDelay: '-2s' }} />

      <Header showBack onBack={onBack} title={tool.name} />

      <main className="relative flex-1 px-8 py-12">
        <div className="mx-auto max-w-4xl space-y-10">
          {/* Tool Info */}
          <div className="flex items-center gap-5 animate-fade-up">
            <div className={cn(
              "flex h-20 w-20 items-center justify-center rounded-2xl shadow-glow-lg",
              iconBgStyles[tool.category]
            )}>
              <Icon className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold font-display text-foreground">
                {tool.name}
              </h2>
              <p className="mt-1 text-lg text-muted-foreground">{tool.description}</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="chip">
                  Input: {tool.inputFormats.join(", ").toUpperCase()}
                </span>
                <span className="text-muted-foreground">→</span>
                <span className="chip chip-primary">
                  Output: {tool.outputFormat}
                </span>
              </div>
            </div>
          </div>

          {/* Drop Zone or File List */}
          {files.length === 0 ? (
            <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <DropZone
                acceptedFormats={tool.inputFormats}
                onFilesSelected={handleFilesSelected}
              />
            </div>
          ) : (
            <div className="space-y-6 animate-fade-up">
              <FileList
                files={files}
                onRemove={handleRemoveFile}
                onReorder={handleReorderFiles}
              />

              {/* Add More Files */}
              <label>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept={tool.inputFormats.join(",")}
                  onChange={(e) => {
                    const newFiles = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    if (newFiles.length > 0) {
                      handleFilesSelected(newFiles);
                    }
                    e.target.value = "";
                  }}
                />
                <Button variant="outline" size="lg" asChild className="cursor-pointer hover:bg-primary/5 hover:border-primary/30">
                  <span>
                    <Plus className="mr-2 h-5 w-5" />
                    Add More Files
                  </span>
                </Button>
              </label>
            </div>
          )}

          {/* Processing Status */}
          <ProcessingStatus status={status} progress={progress} />

          {/* Actions */}
          <div className="flex items-center justify-center gap-4 pt-6">
            {status === "complete" ? (
              <div className="flex flex-col items-center gap-6 animate-fade-up">
                <div className="flex items-center gap-3 text-excel">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="text-lg font-medium">Processing Complete!</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => {
                      toast({
                        title: "File saved",
                        description: "Output file has been saved to your selected location",
                      });
                    }}
                    className="action-button"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Save Output
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleReset} className="hover:bg-primary/5 hover:border-primary/30">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Start Over
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                size="lg"
                onClick={handleProcess}
                disabled={files.length === 0 || status === "processing"}
                className="action-button"
              >
                <Play className="mr-2 h-5 w-5" />
                {getActionText()}
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/50 px-8 py-6 glass">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>Files are processed locally on your computer • <span className="text-foreground font-medium">100% Private</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
