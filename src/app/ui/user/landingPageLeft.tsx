import Image from "next/image"
import landingImage from "../../../../public/image.png"
import { Button } from "../button"
import { PlusIcon } from "@heroicons/react/24/outline"

export default function LandingPageLeft(){
    return <div className="flex justify-center h-full">
        
        <div className="w-11/12">
            <div className="relative w-full rounded-lg overflow-hidden justify-center aspect-auto ">
                <Image 
                    src={landingImage} 
                    alt="Description of image" 
                    // width={500} height={300} 
                    // fill
                    // sizes="(max-width: 768px) 100vh, 700px"
                    priority
                    />
            </div>
            <div className="flex flex-row my-4 justify-center">
                {/* for less then sm, hide the component and make it visible in bottom */}
                <button className="w-full justify-center bg-zinc-900 py-3 font-bold rounded-lg text-gray-100 	">Start reading</button>
                <button className=" justify-center border border-zinc-900 mx-2 px-3 font-bold rounded-lg  "><PlusIcon height={20} width={20}/></button>
                
            </div>
        </div>
    </div>
}

