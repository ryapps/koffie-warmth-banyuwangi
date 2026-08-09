import { Upload, X } from "lucide-react";
import React, { useCallback } from "react";
import { Button } from "../../components/ui/button";

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
  onImageClear?: () => void;
  currentImage?: string;
  label?: string;
  maxSizeMB?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  onImageClear,
  currentImage,
  label = "Unggah Foto",
  maxSizeMB = 5,
}) => {
  const [preview, setPreview] = React.useState<string | undefined>(currentImage);
  const [isDragActive, setIsDragActive] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const maxSize = maxSizeMB * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`Ukuran file tidak boleh lebih dari ${maxSizeMB}MB`);
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar (JPG, PNG, WebP)");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const previewStr = reader.result as string;
        setPreview(previewStr);
        onImageSelect(file, previewStr);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect, maxSizeMB],
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setPreview(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onImageClear) onImageClear();
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-medium tracking-wider uppercase text-muted-foreground mb-2">
        {label}
      </label>

      {preview ? (
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-lg border border-amber-200 bg-amber-50">
            <img src={preview} alt="Preview" className="h-48 w-full object-cover" />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <Button type="button" variant="outline" onClick={handleClick} className="w-full">
            Ubah Foto
          </Button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragActive
              ? "border-amber-500 bg-amber-50"
              : "border-amber-200 bg-white hover:border-amber-400"
          }`}
        >
          <Upload className="mx-auto h-8 w-8 text-amber-600 mb-2" />
          <p className="text-sm font-medium text-charcoal">Seret foto ke sini atau klik</p>
          <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP · Maks. {maxSizeMB}MB</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};
