import { useState, useCallback } from "react";
import { Tool, FileItem, ProcessingStatus as Status } from "@/types/tools";
import { Header } from "@/components/Header";
import { DropZone } from "@/components/DropZone";
import { FileList } from "@/components/FileList";
import { ProcessingStatus } from "@/components/ProcessingStatus";
import { Button } from "@/components/ui/button";
import { Play, Plus, Download, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ToolPageProps {
  tool: Tool;
  onBack: () => void;
}

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
        title: "Files added",
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
        return prev + Math.random() * 15;
      });
    }, 200);
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
    <div className="flex min-h-screen flex-col bg-background">
      <Header showBack onBack={onBack} title={tool.name} />

      <main className="flex-1 px-8 py-10">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Tool Info */}
          <div className="flex items-center gap-4 animate-fade-up">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {tool.name}
              </h2>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
          </div>

          {/* Drop Zone or File List */}
          {files.length === 0 ? (
            <DropZone
              acceptedFormats={tool.inputFormats}
              onFilesSelected={handleFilesSelected}
            />
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
                <Button variant="outline" size="lg" asChild>
                  <span className="cursor-pointer">
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
          <div className="flex items-center justify-center gap-4 pt-4">
            {status === "complete" ? (
              <>
                <Button
                  variant="action"
                  size="xl"
                  onClick={() => {
                    toast({
                      title: "File saved",
                      description:
                        "Output file has been saved to your selected location",
                    });
                  }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Save Output
                </Button>
                <Button variant="outline" size="lg" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Start Over
                </Button>
              </>
            ) : (
              <Button
                variant="action"
                size="xl"
                onClick={handleProcess}
                disabled={files.length === 0 || status === "processing"}
              >
                <Play className="mr-2 h-5 w-5" />
                {getActionText()}
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-8 py-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">
            Output: <span className="font-medium text-foreground">{tool.outputFormat}</span>{" "}
            • Files are processed locally on your computer
          </p>
        </div>
      </footer>
    </div>
  );
}
