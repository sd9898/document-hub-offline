import { useCallback, useState } from "react";
import { Upload, FolderOpen, FileSearch } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  acceptedFormats: string[];
  onFilesSelected: (files: File[]) => void;
}

export function DropZone({ acceptedFormats, onFilesSelected }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter((file) => {
        const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
        return acceptedFormats.includes(ext);
      });

      if (files.length > 0) {
        onFilesSelected(files);
      }
    },
    [acceptedFormats, onFilesSelected]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      if (files.length > 0) {
        onFilesSelected(files);
      }
      e.target.value = "";
    },
    [onFilesSelected]
  );

  return (
    <div
      className={cn("dropzone", isDragging && "dropzone-active")}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/5 animate-float" />
        <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-word/5 animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 right-20 w-12 h-12 rounded-full bg-excel/5 animate-float" style={{ animationDelay: '-1.5s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Upload Icon */}
        <div className="relative mb-8">
          <div className={cn(
            "flex h-24 w-24 items-center justify-center rounded-3xl transition-all duration-300",
            isDragging 
              ? "bg-primary scale-110 shadow-glow" 
              : "bg-gradient-to-br from-primary/20 to-primary/5"
          )}>
            <Upload
              className={cn(
                "h-12 w-12 transition-all duration-300",
                isDragging ? "text-primary-foreground scale-110" : "text-primary"
              )}
            />
          </div>
          
          {/* Animated rings */}
          {isDragging && (
            <>
              <div className="absolute inset-0 rounded-3xl border-2 border-primary animate-ping opacity-20" />
              <div className="absolute inset-[-8px] rounded-3xl border border-primary/30 animate-pulse" />
            </>
          )}
        </div>

        <h3 className="mb-3 text-2xl font-semibold font-display text-foreground">
          {isDragging ? "Drop files here!" : "Drag & drop files"}
        </h3>
        
        <p className="mb-8 text-muted-foreground text-center max-w-md">
          Drop your files here or click below to browse your computer
        </p>

        <label>
          <input
            type="file"
            className="hidden"
            multiple
            accept={acceptedFormats.join(",")}
            onChange={handleFileInput}
          />
          <Button 
            variant="default" 
            size="lg" 
            asChild
            className="action-button cursor-pointer"
          >
            <span>
              <FolderOpen className="mr-2 h-5 w-5" />
              Select Files
            </span>
          </Button>
        </label>

        {/* Supported formats */}
        <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
          <FileSearch className="h-4 w-4" />
          <span>Supported:</span>
          <div className="flex items-center gap-2">
            {acceptedFormats.map((format) => (
              <span
                key={format}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {format.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
