"use client";
import { useImageStore } from "@/hooks/use-modal-store";
import { UploadButton } from "@/utils/uploadthing";
import { ImageDown } from "lucide-react";
import toast from "react-hot-toast";
interface ImageUploaderProps {
  value?: string;
  onChange: (url?: string) => void;
}
export default function ImageUploader({value,onChange}:ImageUploaderProps) {
  const { imageUrl, setImageUrl } = useImageStore();
    return (
      <div>
        <UploadButton
          content={{ button: <ImageDown size={28} className="p-1"/>}}
          appearance={{
            button:
              "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-md  bg-none after:bg-orange-400",
            container:
              "w-[35px] h-[35px] flex-row rounded-md border-cyan-300 hover:bg-neutral-900 border-2 box-shadow-md transition-colors border-neutral-900 ",
            allowedContent: "hidden",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(data) => {
            onChange(data?.[0].url);
            setImageUrl(data?.[0].url)
            console.log(imageUrl)
          }}
          onUploadError={(error) => {
            toast.error(error.message);
          }}
        />
      </div>
    );

}