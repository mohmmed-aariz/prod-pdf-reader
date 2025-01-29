import { lusitana, playfair } from "../fonts";

export default function BookImageCard(){
    return <div className="min-h-[141.5px] min-w-[100px] bg-gradient-to-bl from-indigo-900 via-zinc-900 to-indigo-900 text-white rounded-md"> 
    {/* <p className={`text-md leading-none font-bold pt-4 pl-2 ${lusitana.className}`}>HIGH</p>
    <p className={`text-md leading-none font-bold pl-2 ${lusitana.className}`}>PROFILE</p> */}
    <p className={`text-sm leading-1 font-bold pt-4 pl-2 ${lusitana.className}`}>JANUARY</p>
    <p className={`text-xs  font-bold pl-2 ${lusitana.className}`}>EDITION'25</p>
</div>
}