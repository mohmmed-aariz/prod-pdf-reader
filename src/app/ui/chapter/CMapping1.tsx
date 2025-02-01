'use client';
import { useState, useEffect } from "react";
import CDisplay from "./CDisplay";
import { loadPdfPage } from "@/lib/userActions";

export default function CMapping() {
    console.log("Cmapping getting called");
    // const arrUrl = [
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR6xJ9iWtj3PGd9FLhocAxNnRtyWlTbk6zV8Eg",
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRKJDmZuko8Aeds6YDuRnX7vzhf5w0FJy1mEoW",
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRkUbrOPwenPYMu4GKTi0R1yWFXIza2d3V9msU",
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRSx7FLeRXdzseGqCTpjVoQmgZDYUIJ0y3lABH",
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR3TdQ5q4EPNwZXlt5x70FMndbCa2S1JIA4kUT",
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRSEcqMFRXdzseGqCTpjVoQmgZDYUIJ0y3lABH",
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRFgKVYKImDRcrXKTIsYMFt0E1iWUQSqezP24A",
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRn5WmgxTD6vVP9zoYMaQ7DgGUO4FbhCu03wSj",
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRLj0FQ89UMfSQroewI3nyiB4DkqR8GYHWtEVp",
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRpyasYjLuFcaf3T5sezrJSNt8o1nMQ6m9OkAU",
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDRS7vWhVRXdzseGqCTpjVoQmgZDYUIJ0y3lABH",
    //     "https://utfs.io/a/omia6ie4wa/QHWVkOc63xDR3t5a2yi4EPNwZXlt5x70FMndbCa2S1JIA4kU"
    // ];

    // const arrUrl = [
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAYNXQ094zavBtPZwLS4M0Fhr1msU2RQpJ8KW9',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAUzatX0nKtDoAUW8FjB9c42aQVZbTguLxJnpl',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAKRA3XOh5wFcJxRf39lPAamWVkqQt0zUIhngL',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA8U6wfS0SFdfNJGs3eWHOmicnIX1ujyxPbohk',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA8JtWeT0SFdfNJGs3eWHOmicnIX1ujyxPbohk',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAhggcii6IiCNlAXKuzHjImaFwU2ds41tVfc7h',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAURM0hHnKtDoAUW8FjB9c42aQVZbTguLxJnpl',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAjkRnS60GVF0dDr31o5kLX6Q9vPTMigKIzp7x',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAWZ0SN8VkySmxrJTolfEgA2B03dutqFvQL1Is',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAdm1qRDreTw5P1oQ3yB0haYkzpj2ISlXKCnVg',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAuzhzTpdFAHEUo175aXZDhyrCVpTIgmQGwf6L',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA62uUtNH73J8nKQjl9NsZEm14TOBYe70Fufvg',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAeXCzvuStb79pwRYzA3NvXWPnri8Ff2qVICSG',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA4cvI21P2wbR7K1U8JPfEH46zmdkiDr0Gxajn',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAUuLDAqnKtDoAUW8FjB9c42aQVZbTguLxJnpl',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAl4P1w0LCXW2Qeao8hBfYk6v3ARzVKFI9xGN0',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAnzKh4osKwG2cI6UzkRPoahOdrWpJS31yQ7H4',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAlJWRJWCXW2Qeao8hBfYk6v3ARzVKFI9xGN04',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAZRQ1n1Lsa3ifjmbCy9p68vweV1dSgUtDEq7z',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAHcVDrdawpf7YneLMbqTm62yXkCAzcZjo35Kl',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAUPYEaanKtDoAUW8FjB9c42aQVZbTguLxJnpl',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAdmqEbjqreTw5P1oQ3yB0haYkzpj2ISlXKCnV',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAifMBYnQQwLHJrcuyBdFSoDPhYnMRk6z2AjOW',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAeOX9Z1Stb79pwRYzA3NvXWPnri8Ff2qVICSG',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAsc4fznOhlCTRNSoKbw1DJQ5FVGItvupYWf8k',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAn0AwYNsKwG2cI6UzkRPoahOdrWpJS31yQ7H4',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAKzGlZKdh5wFcJxRf39lPAamWVkqQt0zUIhng',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA1Q1FZF24WKwxTkCYnHXDIAPe0St7BfsUOpyZ',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlASLrJSFqfpkQ67KLRJ2nvgcrqHV9MyZeTGIbo',
    //     'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAjkLmkuUGVF0dDr31o5kLX6Q9vPTMigKIzp7x'
    //   ]

    const arrUrl = [
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlACFv5XfYkuMATx2zOBEgovd5RacJPi09H6SK8',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAS1cl9yqfpkQ67KLRJ2nvgcrqHV9MyZeTGIbo',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAJzWiJ9lLAGHNFsfydaCPuomKnXxQ3vYg2J1I',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlACZyfW0YkuMATx2zOBEgovd5RacJPi09H6SK8',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA0CDwv7xW8rbRfKkztP1gTwBneQumhDSMUHp4',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAhgGmHilIiCNlAXKuzHjImaFwU2ds41tVfc7h',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlApkdR44aw37NBHqJQRybdOfr9l06KjuLcg4xT',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA6LmGwm73J8nKQjl9NsZEm14TOBYe70Fufvgi',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAkN95SzTAm8rbLZKWTNlsOqcfSGeoD0Qdgw3z',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAiCH6RCQQwLHJrcuyBdFSoDPhYnMRk6z2AjOW',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAwFVDVgC96xRDvGhTEdgO2m8fUs4n9aPLZJYF',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAnM4xCcsKwG2cI6UzkRPoahOdrWpJS31yQ7H4',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAl07RqmCXW2Qeao8hBfYk6v3ARzVKFI9xGN04',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAw5yPh396xRDvGhTEdgO2m8fUs4n9aPLZJYFo',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAHhoyMPwpf7YneLMbqTm62yXkCAzcZjo35KlF',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAYEwXHS4zavBtPZwLS4M0Fhr1msU2RQpJ8KW9',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAn6M6JBsKwG2cI6UzkRPoahOdrWpJS31yQ7H4',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlACZUw7VYkuMATx2zOBEgovd5RacJPi09H6SK8',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAftli7Ky0TQkUepgL4RazrHWmFKJnP871xEZB',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA6pBjGK73J8nKQjl9NsZEm14TOBYe70Fufvgi',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAGz9bdFWwrqzds6LM70uPUyDxAvocpebX4TYF',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAjhNxRLGVF0dDr31o5kLX6Q9vPTMigKIzp7xU',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA0M3GOcxW8rbRfKkztP1gTwBneQumhDSMUHp4',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAnQuNUlsKwG2cI6UzkRPoahOdrWpJS31yQ7H4',
        'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlA2WiIYm8fJGUMQ6D9uqAwOoVB3I8FPxjYbWce'
      ]

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
                            <CDisplay base64string={pdfPageString} pgNum={index}  num={1}/>
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
