import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { cn } from '../lib/utils';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept: Record<string, string[]>;
  className?: string;
}

export function FileUploader({ onFileSelect, accept, className }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400',
        className
      )}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive ? (
          'Drop the file here...'
        ) : (
          'Drag & drop a file here, or click to select'
        )}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Supports PDF, TXT, and CSV files
      </p>
    </div>
  );
}