import { UploadButton } from "@/utils/uploadthing";
import toast from "react-hot-toast";
interface ImageUploaderProps {
  value?: string;
  onChange: (url?: string) => void;
}
export default function ImageUploader({value,onChange}:ImageUploaderProps) {
    return (
      <div>
        <UploadButton
          appearance={{
            button:
              "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
            container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
            allowedContent:
              "flex h-8 flex-col items-center justify-center px-2 text-white",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(data) => {
            onChange(data?.[0].url)
          }}
          onUploadError={(error) => {
            toast.error(error.message);
          }}
        />
      </div>
    );

}