'use client';

import { loadPdfPage } from "@/lib/userActions";
import { useState, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Appbar from "./Appbar";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     '../../../../../node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
//   ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;


export default function CombinedDisplay( {pdfAppUrl, totalPages, pdfPagesUrl, title}: {
    title: string;
    pdfAppUrl: string;
    totalPages: number;
    pdfPagesUrl: string[];
} ) {
    const arrUrl = pdfPagesUrl;

    const [pdfStringArray, setPdfStringArray] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [num, setNum] = useState<number>(3);
    const [width, setWidth] = useState(0);

    const updateNumBasedOnScreenSize = () => {
        console.log("inside updateNumBasedOnScreenSize");
        const screenWidth = window.innerWidth;
        // console.log(screenWidth);
        if (screenWidth < 640) {
            setNum(1);
        } else if (screenWidth < 768) {
            setNum(2);
        } 
        else if (screenWidth < 1024) {
            setNum(3);
        } else  {
            setNum(4); 
        }
        // else {
        //     setNum(5)
        // }
        // else if (screenWidth < 1280) {
        //     setNum(4); 
        // } else {
        //     setNum(6);
        // }

        //  else if (screenWidth < 1440) {
        //     setNum(5); 
        // } else if (screenWidth < 1920) {
        //     setNum(6); 
        // }
        
    };

    useEffect(()=>{
        updateNumBasedOnScreenSize(); // Set num on initial load
        // console.log("title is: ", title )

    }, [])

    useEffect(() => {
        const fetchPdfPage = async (index: number) => {
            if (index < arrUrl.length) {
                const res = await loadPdfPage(arrUrl[index]);
                // console.log(res);
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

    useEffect(() => {
        console.log(num);
        const updateWidth = () => {
            setWidth(window.innerWidth * (1 - 0.1 * num)); // Adjust to (100 - 10*num)% of the window width
        };

        const handleResize = () => {
            // updateNumBasedOnScreenSize();
            updateWidth();
        };

        window.addEventListener('resize', handleResize);

        updateWidth();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [num]);

    const memoizedPages = useMemo(() => (
        pdfStringArray.map((pdfPageString, index) => (
            <div key={index} className="py-2 flex justify-center  ">
                <div className={`w-[${width}] justify-center`}>
                    <Document
                        file={pdfPageString}
                        className="w-full shadow-black shadow-2xl"
                    >
                        <Page
                            pageIndex={0}
                            width={width}
                            renderTextLayer={false}
                        />
                    </Document>
                </div>
            </div>
        ))
    ), [pdfStringArray, width]);

    return (
        <div className="w-full h-full ">
        {/* <div className="w-full h-full bg-gradient-to-r from-gray-900 via-rose-800 to-gray-900"> */}
            {/* <div className="flex flex-row justify-center border border-black">
                <button className="border border-gray-950 p-3 bg-slate-500" onClick={() =>{ num < 7 && setNum(num + 1);
                }}>
                    -
                </button>
                <button className="border border-gray-950 p-3 bg-slate-500" onClick={() => num > 1 && setNum(num - 1)}>
                    +
                </button>
                <DownloadButton url={pdfAppUrl} />
            </div> */}

            {/* <Appbar num={num} setNum={setNum}/> */}
            <Appbar num={num} setNum={setNum} pdfAppUrl={pdfAppUrl} title={title} />

            {pdfStringArray.length > 0 ? (
                <div>
                    {memoizedPages}
                </div>
            ) : (
                // <div className="flex justify-center">Loading...</div>
                <div></div>
            )}
            {pdfStringArray.length < totalPages ? (
                <div className="bg-black text-white flex justify-center">
                    Loading...
                </div>
            ) : (
                <div className="bg-black text-white flex justify-center">
                    Completed!
                </div>            
            )}
        </div>
    );
}




// import React from 'react';
// import Appbar from "./Appbar";

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
//       <button onClick={downloadFile} disabled={isLoading}>
//         {isLoading ? 'Downloading...' : 'Download Example PDF'}
//       </button>
//       {isLoading && <p>Fetching your file, please wait...</p>}
//     </div>
//   );
// };





















// 'use client';

// import { loadPdfPage } from "@/lib/userActions";
// import { useState, useEffect, useMemo } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// // pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     '../../../../../node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
//   ).toString();
 

// //   interface ContentInfo {
// //     pdfAppUrl: string | null;
// //     totalPages: number | null ;
// //     pdfPagesUrl: string[] | null;
// // }

// export default function CombinedDisplay( {pdfAppUrl, totalPages, pdfPagesUrl}: {
//     pdfAppUrl: string;
//     totalPages: number;
//     pdfPagesUrl: string[];
// } ) {
//     const arrUrl = pdfPagesUrl;
//     // const arrUrl = [
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAYATvmL4zavBtPZwLS4M0Fhr1msU2RQpJ8KW9",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAlr5F0iCXW2Qeao8hBfYk6v3ARzVKFI9xGN04",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAvdYTHnUcr9lhp2QOm3iUHXDFCu7aNzdKWvA8",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlATW5EMSZP8rndD60aYu9mCQ5FSzsqXwoVAfRH",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAl4MJtLrCXW2Qeao8hBfYk6v3ARzVKFI9xGN0",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAMW5OYHLjQWsKkRfv7lYmIG1JP8znTjF65Brw",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAupg0zqdFAHEUo175aXZDhyrCVpTIgmQGwf6L",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAyCy790vckmo1HCxYj7KVIRGAh24d9USsliaJ",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAgqnRjOMZEazOQNW7l8wbTfdtxXDqBreL1cyk",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlArNeL6fDiOKMsoVbCDZ76UvWSBIAPpc9Nkf0g",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAOdvDAiJ1pHdhkBIGMeWfaovJqARblUZ7j9gx",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA02iqQuxW8rbRfKkztP1gTwBneQumhDSMUHp4",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAW5y6oskySmxrJTolfEgA2B03dutqFvQL1IsG",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlADeVXUq4mbAycE4H0kGvKIXMoR6hTBNJ7miLF",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAa2ZU8u6V0SIhrLjaJuBmCbNq2vUHoE7wAnel",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlADVEJf7mbAycE4H0kGvKIXMoR6hTBNJ7miLF9",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlArjhgJMDiOKMsoVbCDZ76UvWSBIAPpc9Nkf0g",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAlMXjTbCXW2Qeao8hBfYk6v3ARzVKFI9xGN04",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAHbVfDpwpf7YneLMbqTm62yXkCAzcZjo35KlF",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAlk9tgaCXW2Qeao8hBfYk6v3ARzVKFI9xGN04",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAJRSd6alLAGHNFsfydaCPuomKnXxQ3vYg2J1I",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAlb9vT2CXW2Qeao8hBfYk6v3ARzVKFI9xGN04",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAg8VQdNMZEazOQNW7l8wbTfdtxXDqBreL1cyk",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA3OtWQfi48IQCeRZYKqMvsLtxhOGm1DNPS6Ar",
//     //     "https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA8BH1sD0SFdfNJGs3eWHOmicnIX1ujyxPbohk"
//     // ];

//     // console.log("array url is : ", arrUrl);
//     const [pdfStringArray, setPdfStringArray] = useState<string[]>([]);
//     const [currentIndex, setCurrentIndex] = useState<number | null>(null);
//     const [num, setNum] = useState<number>(3);
//     const [width, setWidth] = useState(0);
//     const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });

//     useEffect(() => {
//         const fetchPdfPage = async (index: number) => {
//             if (index < arrUrl.length) {
//                 console.log(index)
//                 const res = await loadPdfPage(arrUrl[index]);
//                 if (res) {
//                     setPdfStringArray((prevArray) => [...prevArray, res]);
//                     setCurrentIndex(index + 1);
//                 }
//             }
//         };

//         if (currentIndex === null) {
//             setCurrentIndex(0);
//         } else {
//             fetchPdfPage(currentIndex);
//         }
//     }, [currentIndex]);

//     useEffect(() => {
//         console.log(num);
//         const updateWidth = () => {
//             setWidth(window.innerWidth * (1 - 0.1 * num)); // Adjust to (100 - 10*num)% of the window width
//         };

//         const handleResize = () => {
//             updateWidth();
//         };

//         window.addEventListener('resize', handleResize);
//         updateWidth();

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [num]);

//     // const onLoadSuccess = ({ width, height }: { height: number, width: number }) => {
//     //     setPageDimensions({ width, height });
//     // };

//     const memoizedPages = useMemo(() => (
//         pdfStringArray.map((pdfPageString, index) => (
            
//             <div key={index} className="py-2 flex justify-center border-4 border-black"> {/* Add margin-y to separate the documents */}
//                 <div className={` w-[${width}] border-4 border-red-500 justify-center`}>
//                     <Document
//                         file={pdfPageString}
//                         className="w-full border-4 border-green-400"
//                     >
//                         <Page
//                             pageIndex={0}
//                             width={width}
//                             renderTextLayer={false}  // Keep text layer rendering
//                             // onLoadSuccess={onLoadSuccess}
//                         />
//                     </Document>
//                 </div>
//             </div>
//         ))
//     ), [pdfStringArray, width]);

//     return (
//         <div className="w-full h-full bg-slate-400">
//             <div className="flex flex-row justify-center">
//                 <button className="border border-gray-950 p-3 bg-slate-500" onClick={() =>{ num < 7 && setNum(num + 1);
//                 }}>
//                     -
//                 </button>
//                 <button className="border border-gray-950 p-3 bg-slate-500" onClick={() => num > 1 && setNum(num - 1)}>
//                     +
//                 </button>
//                 <DownloadButton url={pdfAppUrl} />
//             </div>
//             {pdfStringArray.length > 0 ? (
//                 <div>
//                     {memoizedPages}
//                 </div>
//             ) : (
//                 <div>Loading...</div>
//             )}
//         </div>
//     );
// }


// import React from 'react';

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
//       <button onClick={downloadFile} disabled={isLoading}>
//         {isLoading ? 'Downloading...' : 'Download Example PDF'}
//       </button>
//       {isLoading && <p>Fetching your file, please wait...</p>}
//     </div>
//   );
// };
