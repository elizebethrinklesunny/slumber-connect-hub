import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, X, FileText } from "lucide-react";

export function FileUpload({
  value,
  onChange,
  accept = "image/*",
  kind = "image",
}: {
  value: string | null | undefined;
  onChange: (url: string | null) => void;
  accept?: string;
  kind?: "image" | "pdf";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${kind}s/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) {
      toast.error(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
    toast.success("Uploaded");
  };

  return (
    <div className="space-y-2">
      {value && kind === "image" && (
        <div className="relative inline-block">
          <img src={value} alt="" className="h-24 w-24 rounded border object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
          >
            <X size={12} />
          </button>
        </div>
      )}
      {value && kind === "pdf" && (
        <div className="flex items-center gap-2 rounded border p-2 text-sm">
          <FileText size={16} />
          <a href={value} target="_blank" rel="noreferrer" className="flex-1 truncate text-primary hover:underline">
            View PDF
          </a>
          <button type="button" onClick={() => onChange(null)} className="text-destructive">
            <X size={14} />
          </button>
        </div>
      )}
      <div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload size={14} className="mr-1" />
          {uploading ? "Uploading..." : value ? `Replace ${kind}` : `Upload ${kind}`}
        </Button>
      </div>
    </div>
  );
}
