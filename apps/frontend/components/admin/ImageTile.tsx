import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageTileProp {
  file: File;
  altText: string;
  onCancel: () => void;
}

export default function ImageTile({ file, altText, onCancel }: ImageTileProp) {
  const [previewUrl, setPreviewUrl] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWPjfDwAEfQHzbpFsPDAAAAAElFTkSuQmCC",
  ); // defaults to gray base64 background
  useEffect(() => {
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [file]);

  return (
    <div className="relative w-fit border border-gray-200">
      <Image
        width={150}
        height={150}
        src={previewUrl}
        alt={altText}
        objectFit="cover"
      />
      <div
        className="absolute top-[-3] right-[-3] bg-white rounded-full shadow-lg cursor-pointer"
        onClick={onCancel}
      >
        <X size={10} />
      </div>
    </div>
  );
}
