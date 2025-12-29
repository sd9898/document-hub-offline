import { useCallback, useState } from "react";
import { Upload, FolderOpen } from "lucide-react";
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
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
        <Upload
          className={cn(
            "h-10 w-10 text-primary transition-transform duration-300",
            isDragging && "scale-110"
          )}
        />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-foreground">
        Drag & drop files here
      </h3>
      <p className="mb-6 text-muted-foreground">
        or select files from your computer
      </p>

      <label>
        <input
          type="file"
          className="hidden"
          multiple
          accept={acceptedFormats.join(",")}
          onChange={handleFileInput}
        />
        <Button variant="action" size="lg" asChild>
          <span className="cursor-pointer">
            <FolderOpen className="mr-2 h-5 w-5" />
            Select Files
          </span>
        </Button>
      </label>

      <p className="mt-6 text-sm text-muted-foreground">
        Supported formats:{" "}
        <span className="font-medium text-foreground">
          {acceptedFormats.join(", ").toUpperCase()}
        </span>
      </p>
    </div>
  );
}
