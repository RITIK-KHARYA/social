"use client";
import { UploadButton } from "@/utils/uploadthing";

import "@uploadthing/react/styles.css";
interface ProfileProps {

  imageUrl: string;


}
export default function Profile({imageUrl}: ProfileProps) {
  return (
    <div className="bg-neutral-600/10 w-full h-[20%] ">
          <UploadButton
             endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
                console.log("Error: ", error);
              alert(`ERROR! ${error.message}`);
            }}
          />
    </div>
  )

}