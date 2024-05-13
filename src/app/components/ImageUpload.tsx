
import { UploadDropzone } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { OurFileRouter } from "../api/uploadthing/core";
interface ImageUploaderProps {
  value?: string;
  onChange: (url?: string) => void;
  isImageUploading?: boolean;
  setIsImageUploading?: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ImageUpload({ value, onChange, isImageUploading, setIsImageUploading }: ImageUploaderProps) {
  return (
    <div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(data: any) => {
          onChange(data?.[0].url);
           setIsImageUploading && setIsImageUploading(false);
        }}
        onUploadError={(error: any) => {
          console.log(error);
          toast.error(error.message);
        }}
        onUploadBegin={(name) => {
         setIsImageUploading && setIsImageUploading(false);
          console.log("Uploading: ", name);
        }}
      />
    </div>
  );
}
