import { lusitana } from "@/app/ui/fonts";
import NavbarUser from "@/app/ui/user/navbar";
import ServerNavbar from "@/app/ui/user/navbar/serverNavbar";

export const experimental_ppr = true;

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className={`flex flex-col ${lusitana.className} antialiased  `}>

    {/* <div className="flex flex-col h-screen w-screen "> */}
      <div className="  ">
        {/* <NavbarUser /> */}
        <ServerNavbar />
      </div>
      <div className=" flex-grow bg-slate-600 border-t border-red-400 overflow-auto pt-6">
        {children}
      </div>
    </div>
  );
}


// import NavbarUser from "@/app/ui/user/navbar";

// // export const experimental_ppr = true;
 
// export default function Layout({ children }: { children: React.ReactNode }) {
//     return (
//     <div className="flex flex-col h-screen w-screen bg-slate-200">
//       <div className="w-screen h-16 border-b  border-black px-4">
//         <NavbarUser />
//       </div>
//       <div className="h-screen bg-slate-600 border-t border-red-400">{children}</div>
//       {/* <div className="flex-grow pt-6  md:p-12 w-full">{children}</div> */}
//     </div>
//   );
// }


// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative">
//         <div className="flex justify-center fixed w-full top-0 z-10">
//             <div className="flex sm:justify-between  w-full  bg-black sm:w-4/5">
//             {/* <div className="flex sm:justify-between  w-full  bg-black md:w-3/5	"> */}

//                 <div className="flex justify-start w-full bg-slate-500 ">
//                     <div>Logo</div>
//                 </div>
//                 <div className="flex justify-end w-full bg-green-300">
//                     <button className="border border-black">Signup</button>
//                 </div>

//             </div>
//         </div>
//         <div className="mt-10">{children}</div>
//     </div>
//   );
// }