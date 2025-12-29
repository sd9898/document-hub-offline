import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { ProcessingStatus as Status } from "@/types/tools";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

interface ProcessingStatusProps {
  status: Status;
  progress: number;
  message?: string;
}

export function ProcessingStatus({
  status,
  progress,
  message,
}: ProcessingStatusProps) {
  if (status === "idle") return null;

  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-fade-up">
      <div className="flex items-center gap-4">
        {status === "processing" && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {status === "complete" && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-excel/10">
            <CheckCircle2 className="h-6 w-6 text-excel" />
          </div>
        )}

        {status === "error" && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
        )}

        <div className="flex-1">
          <h3
            className={cn(
              "font-semibold",
              status === "processing" && "text-primary",
              status === "complete" && "text-excel",
              status === "error" && "text-destructive"
            )}
          >
            {status === "processing" && "Processing..."}
            {status === "complete" && "Complete!"}
            {status === "error" && "Error"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {message || (status === "processing" ? "Please wait..." : "")}
          </p>
        </div>
      </div>

      {status === "processing" && (
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="mt-2 text-right text-sm text-muted-foreground">
            {Math.round(progress)}%
          </p>
        </div>
      )}
    </div>
  );
}
