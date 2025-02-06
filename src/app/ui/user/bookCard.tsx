"use client";

import Image from "next/image";
import BookImageCard from "./bookImageCard";
import { useRouter } from "next/navigation";
import PdfDownloadButtonWithPercentage from "../chapter/read/pdfDownloadButtonWithPercent";
import LandingPagePdfDownloadButton from "./downloadButton/button";

export default function BookCard({
    id,
    title,
    description,
    coverImageUrl,
    createdAt,
    pdfAppUrl
}: {
    id: string,
    title: string,
    description: string,
    coverImageUrl: string,
    createdAt: Date ,
    pdfAppUrl: string
}){
    console.log("image info: ",title, id, createdAt, coverImageUrl);
    // console.log("CreatedAt: ", createdAt.toLocaleString("en-us", {month: 'long'}));
    const router = useRouter()


    return (
        <div className="relative flex flex-row justify-start rounded-xl shadow-sm overflow-hidden my-2
        hover:bg-gradient-to-r hover:from-slate-300 hover:to-stone-50 hover:opacity-90 cursor-pointer
        border border-gray-300
        "
        
        onClick={()=>{
            router.push(`/chapter/${id}/read`);
        }}
        >
        {/* <div className="relative flex flex-row justify-start rounded-xl bg-gray-50 shadow-sm overflow-hidden my-2
        transition-all delay-0 duration-500 ease-in-out hover:bg-gradient-to-r hover:from-slate-300 hover:to-stone-50
        hover:opacity-80
         "> */}
        {/* <div className="transition delay-150 duration-300 relative flex flex-row justify-start rounded-xl bg-gray-50 shadow-sm overflow-hidden my-2
         ease-in-out hover:bg-gradient-to-r hover:from-slate-300 hover:to-stone-50
         "> */}
            {coverImageUrl ? (
                <Image 
                    className="mr-2 rounded-md w-[100px] h-[auto] min-h-[141.5px] min-w-[100px]"
                    src={coverImageUrl} 
                    alt="img" 
                    width={150} 
                    height={100} 
                    priority={true} 
                    
                />
            ) : (
                <div className="mr-2 rounded-md w-[100px] h-[auto] min-h-[141.5px] min-w-[100px]">
                    {/* add year to image */}
                    <BookImageCard createdAt={createdAt}/>
                </div>
            )}
            
            {/* <div className="ml-4 border-b-2 border-gray-300 flex flex-col justify-center w-full"> */}
            <div className="ml-4  flex flex-col justify-center w-full">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-gray-600 text-sm w-5/6 line-clamp-2">
                    {description}
                </p>
            </div>
            {/* <button className="border border-black" onClick={(e)=>{      e.stopPropagation();
console.log("hello")}}>hello</button> */}
<div className="flex flex-row min-h-full  justify-between items-center  pr-2 lg:pr-4">
<LandingPagePdfDownloadButton url={pdfAppUrl} fileName={title} fileId={id}  />
</div>
        </div>
    )
}














// "use client"

// import Image from "next/image";
// import BookImageCard from "./bookImageCard";

// export default function BookCard({
//     id,
//     title,
//     description,
//     coverImageUrl,
//     createdAt
// }: {
//     id: string,
//     title: string,
//     description: string,
//     coverImageUrl: string,
//     createdAt: Date 
// }){
//     console.log(id, createdAt.getFullYear(), coverImageUrl);


//     return (
//             <div className="transition delay-150 duration-300 relative flex flex-row  justify-start rounded-xl bg-gray-50   shadow-sm overflow-hidden my-2 hover:bg-gradient-to-bl from-zinc-900 via-indigo-900 to-gray-900 ">
//                 {coverImageUrl  ? (
//                     <Image 
//                     className="mr-2 rounded-md w-[100px] h-[auto]"
//                     src={coverImageUrl} 
//                     alt={"img"} 
//                     width={150} 
//                     height={100} 
//                     priority={true} 
//                 />
              
                  
//                     // <Image 
//                     // className="mr-2 rounded-md w-[100px]  h-[auto]"
//                     // // src='/landingPage.jpg'
//                     // src={coverImageUrl}
//                     // alt={"img"} 
//                     // width={150} 
//                     // height={100} 
//                     // // style={{height: '125px', width: 'auto'}}
//                     // // style={{width: '150px', height: 'auto'}}
//                     // priority={true} /> 
//                 ) : (
//                     <div>
//                         <BookImageCard />
//                     </div>
//                 ) }
            
//             <div className="ml-4 border-b border-gray-300 flex  flex-col justify-center  ">
//                 <h2 className="text-xl font-semibold">{title}</h2>
//                 {/* <p className="mt-2 text-gray-600 text-sm w-11/12 ">This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.</p> */}
//                 <p className="mt-2 text-gray-600 text-sm w-5/6 line-clamp-2 ">
//                     {description}
//                 {/* This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product. */}
//                 </p>
    
//             </div>
//             </div>
//         )
// }


// // import Image from "next/image";

// // export default function BookCard(){
// //     return (
// //         <div className=" relative flex flex-row  justify-start rounded-xl bg-gray-50   shadow-sm">
// //         <Image 
// //             className="mr-2 rounded-md w-[100px] xl:w-[150px] h-[auto] transition-all duration-700"            // src='/image.png'
// //             src='/landingPage.jpg'
// //             alt={"img"} 
// //             width={150} 
// //             height={100} 
// //             // style={{height: '125px', width: 'auto'}}
// //             // style={{width: '150px', height: 'auto'}}
// //             priority={true} />
// //         <div className="ml-4 border-b border-gray-300 flex  flex-col justify-center  ">
// //             <h2 className="text-xl font-semibold">Product Name</h2>
// //             {/* <p className="mt-2 text-gray-600 text-sm w-11/12 ">This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.</p> */}
// //             <p className="mt-2 text-gray-600 text-sm w-11/12 line-clamp-2 ">This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.</p>

// //         </div>
// //         </div>
// //     )
// // }

// // // import Image from "next/image";

// // // export default function BookCard(){
// // //     return (
// // //         <div className="flex flex-row items-center justify-start rounded-xl bg-gray-50   shadow-sm">
// // //         <Image 
// // //             className="mr-2 rounded-md w-[100px] xl:w-[150px] h-[auto]"            // src='/image.png'
// // //             src='/landingPage.jpg'
// // //             alt={"img"} 
// // //             width={150} 
// // //             height={100} 
// // //             // style={{height: '125px', width: 'auto'}}
// // //             // style={{width: '150px', height: 'auto'}}
// // //             priority={true} />
// // //         <div>
// // //             <p>Cover image of book</p>
// // //         </div>
// // //         </div>
// // //     )
// // // }