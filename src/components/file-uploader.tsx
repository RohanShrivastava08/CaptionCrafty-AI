"use client";

import { cn } from '@/lib/utils';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState, type DragEvent, useRef } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  filePreview: string | null;
}

export function FileUploader({ onFileSelect, filePreview }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      // For now, we only handle the first file.
      onFileSelect(files[0]);
    }
  };

  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200",
        isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:bg-muted"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*"
        onChange={(e) => handleFileChange(e.target.files)}
      />
      {filePreview ? (
        <Image src={filePreview} alt="File preview" layout="fill" objectFit="cover" className="rounded-lg" />
      ) : (
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">Image or Video (MAX. 10MB)</p>
        </div>
      )}
    </div>
  );
}
