import { FileItem } from "@/types/tools";
import { X, GripVertical, FileIcon, File } from "lucide-react";
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

const fileTypeConfig: Record<string, { icon: string; color: string; bg: string }> = {
  pdf: { icon: "📄", color: "text-pdf", bg: "bg-pdf/10" },
  doc: { icon: "📝", color: "text-word", bg: "bg-word/10" },
  docx: { icon: "📝", color: "text-word", bg: "bg-word/10" },
  xls: { icon: "📊", color: "text-excel", bg: "bg-excel/10" },
  xlsx: { icon: "📊", color: "text-excel", bg: "bg-excel/10" },
  ppt: { icon: "📑", color: "text-powerpoint", bg: "bg-powerpoint/10" },
  pptx: { icon: "📑", color: "text-powerpoint", bg: "bg-powerpoint/10" },
  jpg: { icon: "🖼️", color: "text-image", bg: "bg-image/10" },
  jpeg: { icon: "🖼️", color: "text-image", bg: "bg-image/10" },
  png: { icon: "🖼️", color: "text-image", bg: "bg-image/10" },
  gif: { icon: "🖼️", color: "text-image", bg: "bg-image/10" },
  webp: { icon: "🖼️", color: "text-image", bg: "bg-image/10" },
};

function getFileConfig(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  return fileTypeConfig[ext] || { icon: "📁", color: "text-muted-foreground", bg: "bg-muted" };
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Selected Files
          </h3>
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {files.length}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {files.map((file, index) => {
          const config = getFileConfig(file.name);
          
          return (
            <div
              key={file.id}
              className="file-item animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground/40 hover:text-muted-foreground transition-colors" />

              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${config.bg} text-2xl`}>
                {config.icon}
              </div>

              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-foreground">
                  {file.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                  <span className="text-xs text-muted-foreground uppercase">
                    {file.name.split(".").pop()}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(file.id)}
                className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
