'use client';
import { useState, useEffect } from "react";
import CDisplay from "./CDisplay";
import { loadPdfPage } from "@/lib/userActions";

export default function CMapping() {
    console.log("Cmapping getting called");
    const arrUrl = [
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR6xJ9iWtj3PGd9FLhocAxNnRtyWlTbk6zV8Eg",
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRKJDmZuko8Aeds6YDuRnX7vzhf5w0FJy1mEoW",
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRkUbrOPwenPYMu4GKTi0R1yWFXIza2d3V9msU",
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRSx7FLeRXdzseGqCTpjVoQmgZDYUIJ0y3lABH",
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR3TdQ5q4EPNwZXlt5x70FMndbCa2S1JIA4kUT",
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRSEcqMFRXdzseGqCTpjVoQmgZDYUIJ0y3lABH",
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRFgKVYKImDRcrXKTIsYMFt0E1iWUQSqezP24A",
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRn5WmgxTD6vVP9zoYMaQ7DgGUO4FbhCu03wSj",
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRLj0FQ89UMfSQroewI3nyiB4DkqR8GYHWtEVp",
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRpyasYjLuFcaf3T5sezrJSNt8o1nMQ6m9OkAU",
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRS7vWhVRXdzseGqCTpjVoQmgZDYUIJ0y3lABH",
        "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR3t5a2yi4EPNwZXlt5x70FMndbCa2S1JIA4kU"
    ];


    const [pdfStringArray, setPdfStringArray] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchPdfPage = async (index: number) => {
            if (index < arrUrl.length) {
                const res = await loadPdfPage(arrUrl[index]);
                if (res) {
                    setPdfStringArray((prevArray) => [...prevArray, res]);
                    setCurrentIndex(index + 1);
                }
            }
        };

        if (currentIndex === null) {
            setCurrentIndex(0);
        } else {
            fetchPdfPage(currentIndex);
        }
    }, [currentIndex]);

    return (
        <div className="w-full h-full ">
            {pdfStringArray.length > 0 ? (
                <div>
                    {pdfStringArray.map((pdfPageString, index) => (
                        <div key={index} className="py-4"> {/* Add margin-y to separate the documents */}
                            <CDisplay base64string={pdfPageString} pgNum={index} />
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}


// "use client"
// import { useState, useEffect } from "react";
// import { loadPdfPage } from "@/lib/actions";
// import CDisplay from "./CDisplay";

// export default function CMapping() {
//     const arrUrl = ["https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR6xJ9iWtj3PGd9FLhocAxNnRtyWlTbk6zV8Eg",
//    "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRKJDmZuko8Aeds6YDuRnX7vzhf5w0FJy1mEoW","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRkUbrOPwenPYMu4GKTi0R1yWFXIza2d3V9msU","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRSx7FLeRXdzseGqCTpjVoQmgZDYUIJ0y3lABH","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR3TdQ5q4EPNwZXlt5x70FMndbCa2S1JIA4kUT","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRSEcqMFRXdzseGqCTpjVoQmgZDYUIJ0y3lABH","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRFgKVYKImDRcrXKTIsYMFt0E1iWUQSqezP24A","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRn5WmgxTD6vVP9zoYMaQ7DgGUO4FbhCu03wSj","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRLj0FQ89UMfSQroewI3nyiB4DkqR8GYHWtEVp","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRpyasYjLuFcaf3T5sezrJSNt8o1nMQ6m9OkAU","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRS7vWhVRXdzseGqCTpjVoQmgZDYUIJ0y3lABH","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR3t5a2yi4EPNwZXlt5x70FMndbCa2S1JIA4kU"];
//     // const arrUrl = ["https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR6xJ9iWtj3PGd9FLhocAxNnRtyWlTbk6zV8Eg"]

//     const [pdfStringArray, setPdfStringArray] = useState<string[]>([]);
//     // const [currentIndex, setCurrentIndex] = useState(0);
//     const [currentIndex, setCurrentIndex] = useState<number | null>(null);

//     useEffect(() => {
//         const fetchPdfPage = async (index: number) => {
//             if (index < arrUrl.length) {
//                 const res = await loadPdfPage(arrUrl[index]);
//                 if (res) {
//                     setPdfStringArray((prevArray) => [...prevArray, res]);
//                     setCurrentIndex(index + 1);
//                 }
//             }
//         };

//         // fetchPdfPage(currentIndex);
//         // Initial fetch 
//         if (currentIndex === null) { 
//             setCurrentIndex(0); 
//         } else { 
//             fetchPdfPage(currentIndex); 
//         }
//     }, [currentIndex]);

    
//     return (
//         <div className={` w-full h-full`}>
//             {/* It's a client component which maps all the URL to a server component to load the individual PDFs and pass the base64 string to a client component. */}

//             {pdfStringArray.length > 0 ? (
//                 <div className={` `}>
//                     {pdfStringArray.map((pdfPageString, index) => (
//                         <CDisplay key={index} base64string={pdfPageString} pgNum={index}  />
                        
//                     ))}
//                 </div>
//             ) : (
//                 <div>Loading...</div>
//             )}
//         </div>
//     );
// }


// // // import { loadPdfPage } from "@/lib/actions";
// // // import CDisplay from "./CDisplay";

// // // export default async function SMapping(){
// // //     const arrUrl = ["https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR6xJ9iWtj3PGd9FLhocAxNnRtyWlTbk6zV8Eg","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRKJDmZuko8Aeds6YDuRnX7vzhf5w0FJy1mEoW","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRkUbrOPwenPYMu4GKTi0R1yWFXIza2d3V9msU","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRSx7FLeRXdzseGqCTpjVoQmgZDYUIJ0y3lABH","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR3TdQ5q4EPNwZXlt5x70FMndbCa2S1JIA4kUT","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRSEcqMFRXdzseGqCTpjVoQmgZDYUIJ0y3lABH","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRFgKVYKImDRcrXKTIsYMFt0E1iWUQSqezP24A","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRn5WmgxTD6vVP9zoYMaQ7DgGUO4FbhCu03wSj","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRLj0FQ89UMfSQroewI3nyiB4DkqR8GYHWtEVp","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRpyasYjLuFcaf3T5sezrJSNt8o1nMQ6m9OkAU","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRS7vWhVRXdzseGqCTpjVoQmgZDYUIJ0y3lABH","https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR3t5a2yi4EPNwZXlt5x70FMndbCa2S1JIA4kU"];

// // //     const pdfStringArray: string[] = [];
// // //     arrUrl.map(async (pageUrl)=> {
// // //        const res = await loadPdfPage(pageUrl);
// // //        if(res){
// // //            pdfStringArray.push(res);
// // //        }
// // //     })

// // //     return (
// // //         <div>
// // //             It's a server component which maps all the url to a server component to load the individual pdf and pass the base64 string to client component
            
// // //             {/* {(pdfStringArray) ? (<div>
// // //                 {pdfStringArray.map((pdfPageString)=>{
// // //                     <CDisplay base64string="pdfPageString" />
// // //                 })}
// // //             </div>) : (<div>Pdf Not Found</div>)} */}
// // //         </div>
// // //     )
// // // }

// // import { loadPdfPage } from "@/lib/actions";
// // import CDisplay from "./CDisplay";

// // export default async function SMapping() {
// //     const arrUrl = [
// //         // Your URLs here
// //         "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR6xJ9iWtj3PGd9FLhocAxNnRtyWlTbk6zV8Eg",
// //         "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRKJDmZuko8Aeds6YDuRnX7vzhf5w0FJy1mEoW",
// //         // More URLs
// //     ];

// //     // Using Promise.all to resolve all loadPdfPage requests
// //     const pdfStringArray = await Promise.all(
// //         arrUrl.map(async (pageUrl) => {
// //             const res = await loadPdfPage(pageUrl);
// //             return res;
// //         })
// //     );

// //     return (
// //         <div>
// //             It's a server component which maps all the URL to a server component to load the individual PDFs and pass the base64 string to a client component.

// //             {pdfStringArray.length > 0 ? (
// //                 <div>
// //                     {pdfStringArray.map((pdfPageString, index) => (
// //                         <CDisplay key={index} base64string={pdfPageString} />
// //                     ))}
// //                 </div>
// //             ) : (
// //                 <div>Pdf Not Found</div>
// //             )}
// //         </div>
// //     );
// // }







// import { loadPdfPage } from "@/lib/actions";
// import CDisplay from "./CDisplay";

// export default async function SMapping() {
//     const arrUrl = [
//         // Your URLs here
//         "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR6xJ9iWtj3PGd9FLhocAxNnRtyWlTbk6zV8Eg",
//         "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRKJDmZuko8Aeds6YDuRnX7vzhf5w0FJy1mEoW",
//         // More URLs
//     ];

//     const pdfStringArray = [];

//     // Fetch each PDF sequentially
//     for (const pageUrl of arrUrl) {
//         const res = await loadPdfPage(pageUrl);
//         if (res) {
//             pdfStringArray.push(res);
//         }
//     }

//     return (
//         <div>
//             It's a server component which maps all the URLs to load the individual PDFs and pass the base64 string to a client component.

//             {pdfStringArray.length > 0 ? (
//                 <div>
//                     {pdfStringArray.map((pdfPageString, index) => (
//                         <CDisplay key={index} base64string={pdfPageString} />
//                     ))}
//                 </div>
//             ) : (
//                 <div>Pdf Not Found</div>
//             )}
//         </div>
//     );
// }
