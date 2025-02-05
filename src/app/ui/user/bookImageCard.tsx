import { lusitana, playfair } from "../fonts";

export default function BookImageCard({createdAt}: {createdAt: Date}){
    return <div className="min-h-[141.5px] min-w-[100px] bg-gradient-to-bl from-indigo-900 via-zinc-900 to-indigo-900 text-white rounded-md"> 
    {/* <p className={`text-md leading-none font-bold pt-4 pl-2 ${lusitana.className}`}>HIGH</p>
    <p className={`text-md leading-none font-bold pl-2 ${lusitana.className}`}>PROFILE</p> */}
    <p className={`text-sm leading-1 font-bold pt-4 pl-2 ${lusitana.className}`}>{createdAt.toLocaleString("en-us", {month: 'long'}).toUpperCase()}</p>
    <p className={`text-xs  font-bold pl-2 ${lusitana.className}`}>EDITION'{createdAt.getFullYear().toString().slice(-2)}</p>
</div>
}