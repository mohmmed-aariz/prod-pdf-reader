import Image from "next/image"
import { Button } from "../button"
import { PlusIcon } from "@heroicons/react/24/outline"

export default function LandingPageLeft(){
    return <div className="flex justify-center h-full">
        
        <div className="w-11/12">
            <div className="relative w-full rounded-lg overflow-hidden justify-center aspect-auto ">
                <Image 
                    src='/tree.jpg' 
                    // src={"https://utfs.io/f/hZVG1XIiCNlATopO8iOZP8rndD60aYu9mCQ5FSzsqXwoVAfR"}
                    // src='/landingPage.jpg'
                    alt="Description of image" 
                    // width={500} height={300} 
                    // fill
                    // sizes="(max-width: 768px) 100vh, 700px"
                    priority
                    width={1920}
                    height={1080}
                    />
            </div>
            <div className="flex flex-row my-4 justify-center">
                {/* for less then sm, hide the component and make it visible in bottom */}
                <button className="w-full justify-center bg-gray-900 py-3 font-bold rounded-lg text-gray-100 	">Start reading</button>
                <button className=" justify-center border border-gray-900 mx-2 px-3 font-bold rounded-lg  "><PlusIcon height={20} width={20}/></button>
                
            </div>
        </div>
    </div>
}

