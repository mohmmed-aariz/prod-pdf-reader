import Link from "next/link";
import AppLogo from "../app-logo";
import NavSignupButton from "./navSignupButton";

export default async function NavbarUser(){
    
    return (
        <div className="flex justify-center h-full w-full bg-gray-900 mx-6  lg:mx-8">
            <div className="flex  h-full w-full  xl:w-4/5 transition-all duration-500">

                <div className="flex flex-row justify-start w-full  ">
                    {/* <div className="flex justify-center"><AppLogo /></div> */}
                    <div className="flex flex-col justify-center">
                        <Link href={"/user"}><AppLogo /></Link>
                        
                    </div>
                </div>
                <div className="flex justify-end w-full ">
                    {/* <button className="border border-black">Signup</button> */}
                    <NavSignupButton />
                </div>

            </div>
        </div>
    )
}

// export default function NavbarUser(){
//     return (
//         <div className="flex justify-center fixed w-full top-0 z-10 bg-green-950">
//             <div className="flex md:justify-between  w-full  bg-black md:w-4/5">
//             {/* <div className="flex sm:justify-between  w-full  bg-black md:w-3/5	"> */}

//                 <div className="flex justify-start w-full bg-slate-500 ">
//                     <div>Logo</div>
//                 </div>
//                 <div className="flex justify-end w-full bg-green-300">
//                     <button className="border border-black">Signup</button>
//                 </div>

//             </div>
//         </div>
//     )
//     // return (
//     //     // <div className="flex justify-between ">
//     //     <div className="flex justify-between bg-blue-500 text-white p-4 fixed w-full top-0">
//     //         <div>Left</div>
//     //         <div>Right</div>
//     //     </div>
//     // )
// }