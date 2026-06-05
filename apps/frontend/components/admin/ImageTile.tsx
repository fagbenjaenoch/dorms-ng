import { X } from "lucide-react";
import Image from "next/image";

interface ImageTileProp {
  previewUrl: string;
  altText: string;
  onCancel: () => void;
}

export default function ImageTile({ previewUrl, altText, onCancel }: ImageTileProp) {
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
