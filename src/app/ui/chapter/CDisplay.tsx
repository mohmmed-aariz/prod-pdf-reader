'use client';

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";

// // pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();
// pdfjs.GlobalWorkerOptions.workerSrc= `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${reactPdf.pdfjs.version}/pdf.worker.min.mjs`

// working solution
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     '../../../../node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
//   ).toString();

export default function CDisplay({ base64string, pgNum, num }: { base64string: string, pgNum: any, num: number }) {
    // console.log("Cdisplay getting called ");
    const [width, setWidth] = useState(0);
    const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth * (1 - (0.1)*num)); // Adjust to 70% of the window width
        };
        console.log("width",width)

        window.addEventListener('resize', updateWidth);
        updateWidth();

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, [num]);

    const onLoadSuccess = ({  width, height }: {height: number, width: number}) => {
        setPageDimensions({ width, height });
    };

    // console.log(`${pgNum} loaded!`);

    return (
        <div className="flex justify-center border-4 border-black">
            {base64string ? (
                // <div className={`w-[70%] ${pageDimensions.width > pageDimensions.height ? 'h-[50vh]' : 'h-auto'}`}>
                // <div className={`w-[${100 - (10 * num)}] border-4 border-red-500 justify-center`}>
                <div className={`w-[${100 - (10 * num)}] border-4 border-red-500 justify-center`}>
                    <Document
                        file={base64string}
                        className="w-full border-4 border-green-400 "
                    >
                        <Page
                            pageIndex={0}
                            width={width}
                            // height={100}
                            // className={"h-1/2"}
                            onLoadSuccess={onLoadSuccess}
                            renderTextLayer={false}  // Keep text layer rendering
                            // className="my-4" // Adding margin to separate pages
                        />
                    </Document>
                </div>
            ) : (
                <div>
                    No Pdf Found!
                </div>
            )}
        </div>
    );
}


// 'use client';

// import { Document, Page, pdfjs } from "react-pdf";
// import { useEffect, useState } from "react";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

// export default function CDisplay({ base64string, pgNum }: { base64string: string, pgNum: any }) {
//     const [width, setWidth] = useState(0);

//     useEffect(() => {
//         const updateWidth = () => {
//             setWidth(window.innerWidth * 0.7); // Adjust to 70% of the window width
//         };

//         window.addEventListener('resize', updateWidth);
//         updateWidth();

//         return () => {
//             window.removeEventListener('resize', updateWidth);
//         };
//     }, []);

//     console.log(`${pgNum} loaded!`);

//     return (
//         <div className="flex justify-center">
//             {base64string ? (
//                 <div className="w-[70%]">
//                     <Document
//                         file={base64string}
//                         className="w-full"
//                     >
//                         <Page
//                             pageIndex={0}
//                             width={width}
//                         />
//                     </Document>
//                 </div>
//             ) : (
//                 <div>
//                     No Pdf Found!
//                 </div>
//             )}
//         </div>
//     );
// }


// // 'use client';

// // import { Document, Page, pdfjs } from "react-pdf";
// // import { useEffect, useState } from "react";

// // pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

// // export default function CDisplay({ base64string, pgNum }: { base64string: string, pgNum: any }) {
// //     const [width, setWidth] = useState(0);

// //     useEffect(() => {
// //         const updateWidth = () => {
// //             setWidth(window.innerWidth * 0.7); // Adjust to 70% of the window width
// //         };

// //         window.addEventListener('resize', updateWidth);
// //         updateWidth();

// //         return () => {
// //             window.removeEventListener('resize', updateWidth);
// //         };
// //     }, []);

// //     console.log(`${pgNum} loaded!`);

// //     return (
// //         <div>
// //             {base64string ? (
// //                 <div style={{ width: `${width}px` }}>
// //                     <Document
// //                         file={base64string}
// //                         // wid={width}
// //                     >
// //                         <Page
// //                             pageIndex={0}
// //                             // width={width}
// //                         />
// //                     </Document>
// //                 </div>
// //             ) : (
// //                 <div>
// //                     No Pdf Found!
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }


// // // 'use client';

// // // import { Document, Page, pdfjs } from "react-pdf";


// // // pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

// // // export default function CDisplay({base64string, pgNum}:{base64string: string, pgNum:any}){
// // //     console.log(`${pgNum} loaded!`)
    
// // //     return (
// // //         <div>
// // //             {base64string ? (
// // //                 <div>
// // //                     <Document
// // //                         className={`w-[70%] h-full`}
// // //                         file={base64string}
// // //                     >
// // //                         <Page
// // //                             // pageNumber={0}
// // //                             pageIndex={0}
// // //                             className={`w-[70%] `}
// // //                             />
// // //                     </Document> 
// // //                     {/* {base64string} */}
// // //                 </div>
// // //                 ): (
// // //                 <div>
// // //                     No Pdf Found!
// // //                 </div>
// // //             )}
// // //         </div>
// // //     )
// // // }