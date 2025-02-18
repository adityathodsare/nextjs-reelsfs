"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [uploading, setUplading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUplading(false);
  };

  const handleSucess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setUplading(false);
    setError(null);
    onSuccess(res);
  };

  const handleStartUpload = () => {
    setUplading(true);
    setError(null);
  };

  const handleProgress = (evt: ProgressEvent) => {
    // console.log("Start", evt);
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.loaded) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please select a video file");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        // 100 mb
        setError("Please select a file less than 100mb");
        return false;
      }
    } else {
      const validFormat = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validFormat.includes(file.type)) {
        setError("Please select a valid image file");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5 mb
        setError("Please select a file less than 10mb");
        return false;
      }
    }
    return false;
  };

  return (
    <div className="App">
      <h1>ImageKit Next.js quick start</h1>
      <p>Upload an image with advanced options</p>
      <IKUpload
        fileName={
          fileType === "video" ? "sample-video.mp4" : "sample-image.jpg"
        }
        useUniqueFileName={true}
        responseFields={["tags"]}
        validateFile={validateFile}
        onError={onError}
        onSuccess={handleSucess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        folder={fileType === "video" ? "/videos" : "/images"}
      />
      {uploading && (
        <div className="flex items-center gap-2 justify-center text-primary">
          <Loader2 className="animate-spin w-4 h-4 " />
          <span>uploading...</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 justify-center text-red-500">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
