import { FileItem } from "@/types/tools";
import { X, GripVertical, FileIcon } from "lucide-react";
import { Button } from "./ui/button";

interface FileListProps {
  files: FileItem[];
  onRemove: (id: string) => void;
  onReorder: (files: FileItem[]) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getFileIcon(type: string): string {
  if (type.includes("pdf")) return "📄";
  if (type.includes("word") || type.includes("document")) return "📝";
  if (type.includes("sheet") || type.includes("excel")) return "📊";
  if (type.includes("presentation") || type.includes("powerpoint")) return "📑";
  if (type.includes("image")) return "🖼️";
  return "📁";
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="section-title">Selected Files ({files.length})</h3>
      </div>

      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={file.id}
            className="file-item animate-fade-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground/50" />

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-xl">
              {getFileIcon(file.type)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="truncate font-medium text-foreground">
                {file.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(file.id)}
              className="shrink-0 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
