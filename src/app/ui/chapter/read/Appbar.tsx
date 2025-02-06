import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from 'react';
import DownloadButton from './PdfDownloadButton'; // Make sure to import DownloadButton
import PdfDownloadButton from "./PdfDownloadButton";
import PdfDownloadButtonWithPercentage from "./pdfDownloadButtonWithPercent";

  
interface AppbarProps {
    num: number;
    setNum: React.Dispatch<React.SetStateAction<number>>;
    pdfAppUrl: string;
    title: string
  }
  
export default function Appbar({ num, setNum, pdfAppUrl , title}: AppbarProps) {
  return (
    <div className="flex justify-between items-center  px-4  h-14 backdrop-brightness-50 text-white">
      {/* <Link
        href={"/user"}
        className="text-lg flex items-center justify-center border border-red-300"
      >
        Logo
      </Link> */}

      <div className="flex w-full items-center justify-center  text-gray-300">
        <div className="flex gap-2  justify-center items-center">
          <MagnifyingGlassMinusIcon
              className="h-6 pr-4 mx-2 text-gray-300 hover:text-gray-400 border-r-2 border-gray-600"
              onClick={() => {
              num < 7 && setNum(num + 1);
              }}
          />

          <div className="border border-gray-700 px-4 py-2 rounded-sm">{100 - 10 * num}</div>

          <MagnifyingGlassPlusIcon
            className="h-6 mx-2 text-gray-300 hover:text-gray-400 pl-4 border-l-2 border-gray-600"
            onClick={() => {
              num > 1 && setNum(num - 1);
            }}
          />
          
            <div className="border-4 border-black w-24" >

              {/* <PdfDownloadButton url={pdfAppUrl} fileName={title} /> */}
              <PdfDownloadButtonWithPercentage url={pdfAppUrl} fileName={title} />
            </div>
            </div>
      </div>

      {/* <div className="flex flex-col items-center justify-center pt-2 border border-red-300">
        <button>Sign in</button>
      </div> */}
    </div>
  );
}

// export function AppbarLoading() {
//   return (
//     <div className="flex justify-between items-center  px-4  h-14 backdrop-brightness-50 text-white">
//       {/* <Link
//         href={"/user"}
//         className="text-lg flex items-center justify-center border border-red-300"
//       >
//         Logo
//       </Link> */}

//       <div className="flex w-full items-center justify-center  text-gray-300">
//         <div className="flex gap-2  justify-center items-center">
//           <MagnifyingGlassMinusIcon
//               className="h-6 pr-4 mx-2 text-gray-300 hover:text-gray-400 border-r-2 border-gray-600"
//               // onClick={() => {
//               // num < 7 && setNum(num + 1);
//               // }}
//           />

//           <div className="border border-gray-700 px-4 py-2 rounded-sm">
//             {/* {100 - 10 * num} */}
//           </div>

//           <MagnifyingGlassPlusIcon
//             className="h-6 mx-2 text-gray-300 hover:text-gray-400 pl-4 border-l-2 border-gray-600"
//             // onClick={() => {
//             //   num > 1 && setNum(num - 1);
//             // }}
//           />
          
//             {/* <div className="invisible sm:visible" > */}

//               <PdfDownloadButton url={''} fileName={''} />
//             {/* </div> */}
//             </div>
//       </div>

//       {/* <div className="flex flex-col items-center justify-center pt-2 border border-red-300">
//         <button>Sign in</button>
//       </div> */}
//     </div>
//   );
// }









// import {
//     MagnifyingGlassMinusIcon,
//     MagnifyingGlassPlusIcon,
  
//   } from "@heroicons/react/24/outline";
//   import Link from "next/link";
//   import PdfDownloadButton from "./PdfDownloadButton";
  
  
//   interface AppbarProps {
//     num: number;
//     setNum: React.Dispatch<React.SetStateAction<number>>;
//     pdfAppUrl: string;
//     title: string
//   }
  
//   export default function Appbar({ num, setNum, pdfAppUrl , title}: AppbarProps) {
//     return (
//       <div className="grid grid-cols-12 gap-4 justify-between items-center border-b px-4 border-slate-300 h-14 backdrop-brightness-50 text-white">
//         <div className="col-span-4 text-lg flex   items-center border border-red-300" >
//           <Link
//               href={"/user"}
//               className="text-lg flex  justify-start items-center border border-red-300"
//           >
//               Logo
//           </Link>
  
//         </div>
  
//         <div className="col-span-4 w-full flex items-center justify-center border border-white text-gray-300">
//           <div className="flex flex-row justify-center items-center w-full">
//               <MagnifyingGlassMinusIcon
//               className="h-6 pr-4 mx-2 text-gray-300 hover:text-gray-400 border-r-2 border-gray-600"
//               onClick={() => {
//                   num < 7 && setNum(num + 1);
//               }}
//               />
//               <div className="border border-black px-4 py-2">{100 - 10 * num}</div>
//               <MagnifyingGlassPlusIcon
//               className="h-6 mx-2 text-gray-300 hover:text-gray-400 pl-4 border-l-2 border-gray-600"
//               onClick={() => {
//                   num > 1 && setNum(num - 1);
//               }}
//               />
//               <PdfDownloadButton url={pdfAppUrl} fileName={title} />
//           </div>
//           </div>
  
//         <div className="col-span-4 flex flex-row-reverse items-center  border border-red-300">
//           <button className="flex flex-col justify-end items-center  border border-red-300">Sign in</button>
//         </div>
//       </div>
//     );
//   }
  
  








// import {
//   MagnifyingGlassMinusIcon,
//   MagnifyingGlassPlusIcon,

// } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import PdfDownloadButton from "./PdfDownloadButton";


// interface AppbarProps {
//   num: number;
//   setNum: React.Dispatch<React.SetStateAction<number>>;
//   pdfAppUrl: string;
//   title: string
// }

// export default function Appbar({ num, setNum, pdfAppUrl , title}: AppbarProps) {
//   return (
//     <div className="grid grid-cols-12 gap-4 justify-between items-center border-b px-4 border-slate-300 h-14 backdrop-brightness-50 text-white">
//       <div className="col-span-4 text-lg flex   items-center border border-red-300" >
//         <Link
//             href={"/user"}
//             className="text-lg flex  justify-start items-center border border-red-300"
//         >
//             Logo
//         </Link>

//       </div>

//       <div className="col-span-4 w-full flex items-center justify-center border border-white text-gray-300">
//         <div className="flex flex-row justify-center items-center w-full">
//             <MagnifyingGlassMinusIcon
//             className="h-6 pr-4 mx-2 text-gray-300 hover:text-gray-400 border-r-2 border-gray-600"
//             onClick={() => {
//                 num < 7 && setNum(num + 1);
//             }}
//             />
//             <div className="border border-black px-4 py-2">{100 - 10 * num}</div>
//             <MagnifyingGlassPlusIcon
//             className="h-6 mx-2 text-gray-300 hover:text-gray-400 pl-4 border-l-2 border-gray-600"
//             onClick={() => {
//                 num > 1 && setNum(num - 1);
//             }}
//             />
//             <PdfDownloadButton url={pdfAppUrl} fileName={title} />
//         </div>
//         </div>


//       {/* <div className="col-span-4 w-full grid grid-cols-12 gap-4 items-center justify-center border border-white text-gray-300">
//         <div className="col-start-4 col-span-6 flex flex-row justify-center items-center">
//         <MagnifyingGlassMinusIcon
//             className="h-6 pr-4 mx-2 text-gray-300 hover:text-gray-400 border-r-2 border-gray-600"
//             onClick={() => {
//               num < 7 && setNum(num + 1);
//             }}
//           />
//           <div className="border border-black px-4 py-2">{100 - 10 * num}</div>
//           <MagnifyingGlassPlusIcon
//             className="h-6 mx-2 text-gray-300 hover:text-gray-400 pl-4 border-l-2 border-gray-600"
//             onClick={() => {
//               num > 1 && setNum(num - 1);
//             }}
//           />
          
//           <PdfDownloadButton url={pdfAppUrl} fileName={title} />
//         </div>
//       </div> */}

//       <div className="col-span-4 flex flex-row-reverse items-center  border border-red-300">
//         <button className="flex flex-col justify-end items-center  border border-red-300">Sign in</button>
//       </div>
//     </div>
//   );
// }





// import React, { useState } from 'react';

// const DownloadButton = ({url}: {url: string}) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const downloadFile = async () => {
//     setIsLoading(true);
//     const fileUrl = 'https://smkhor7zi7.ufs.sh/f/hZVG1XIiCNlA9AzXXzc5F1D6nzt8WqQPI7yGANTCSVhasbrJ';
//     const fileName = 'example.pdf';

//     try {
//       const response = await fetch(fileUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', fileName);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Failed to download file', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* <h1>Download Your File</h1> */}
//       {!isLoading ? (
//                 <button
//                 type="button"
//                 // className="px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex"
//                 className="items-center justify-center flex hover:text-gray-400 border border-black "
//             >
//                 <ArrowDownTrayIcon className="h-6  mx-2 text-gray-300   hover:text-gray-400 " />
//             </button>
//             ) : (
//                 <button  type="button" className=" inline-flex items-center">

//             <svg aria-hidden="true" role="status" className="inline w-5 h-5 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
//             </svg>
//             </button>           
//             )}
//       <button onClick={downloadFile} disabled={isLoading}>
        
//       </button>
//       {/* {isLoading && <p>Fetching your file, please wait...</p>} */}
//     </div>
//   );
// };




// import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
// import Link from "next/link"

// export default function Appbar({num, setNum}: {num: any, setNum: any}){
//     return (
//         <div className=" flex justify-between border-b px-4 border-slate-300 h-14 backdrop-brightness-50 text-white">
//             <Link href={'/user'} className="text-lg flex flex-col justify-center ">
//                 Logo
//             </Link>
//             <div className="w-full h-full flex justify-center items-center border border-white text-gray-300 ">
//                 <button className="flex flex-row  mx-2 border-x-2 border-gray-600">
//                     <MagnifyingGlassPlusIcon
//                         className="h-6 w-6 mx-2 text-gray-300   hover:text-gray-400  "
//                         onClick={()=>{
//                             num > 1 && setNum(num - 1)
//                         }}
//                         />
//                     <div className="border border-black ">
//                         {100 - 10*(num)}
//                     </div>
//                     <MagnifyingGlassMinusIcon className="h-6 w-6 mx-2 text-gray-300   hover:text-gray-400"
//                         onClick={()=>{
//                             num < 7 && setNum(num + 1)
//                         }}
//                         />

//                 </button>
//                 {/* <button  type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"> */}

// {/* saperate */}
//                 <div className="flex flex-row">
                    // {/* loading */}
                    // <button  type="button" className=" inline-flex items-center">

                    //     <svg aria-hidden="true" role="status" className="inline w-5 h-5 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    //     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    //     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                    //     </svg>
                    //     Loading...
                    // </button>

//                 {/* download */}
//                 <button
//                     type="button"
//                     // className="px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex"
//                     className="px-4 py-3 flex hover:text-gray-400 "

// >
//                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                     </svg>

//                 </button>

//                 </div>

//             </div>
//             <div className="flex flex-col justify-center pt-2">
//                 <button>Sign in</button>
//             </div>
//         </div>
//     )
// }
