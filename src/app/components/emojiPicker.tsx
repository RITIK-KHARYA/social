import data from '@emoji-mart/data'
import Picker from "@emoji-mart/react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Smile } from 'lucide-react'

export default function EmojiPicker({onChange}:{onChange:(e:string)=>void}){
  return (
    <Popover>
      <PopoverTrigger>
        <div className='hover:bg-neutral-900 w-auto h-auto p-[6px]  rounded-md border-2  border-neutral-900/90 box-shadow-md box-shadow-white'>
            <Smile size={20}/>

        </div>
        
      </PopoverTrigger>
      <PopoverContent className="bg-trasnparent border-none">
        <Picker 
        data={data}
        onEmojiSelect={(emoji:any)=>onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>

  )
}
