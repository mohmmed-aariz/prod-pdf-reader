'use client';

import { loadPdfPage } from "@/lib/userActions";
import { useState, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     '../../../../node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
//   ).toString();
 

export default function CombinedComponent() {
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
    ];

    const [pdfStringArray, setPdfStringArray] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [num, setNum] = useState<number>(3);
    const [width, setWidth] = useState(0);
    const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });

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

    useEffect(() => {
        console.log(num);
        const updateWidth = () => {
            setWidth(window.innerWidth * (1 - 0.1 * num)); // Adjust to (100 - 10*num)% of the window width
        };

        const handleResize = () => {
            updateWidth();
        };

        window.addEventListener('resize', handleResize);
        updateWidth();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [num]);

    // const onLoadSuccess = ({ width, height }: { height: number, width: number }) => {
    //     setPageDimensions({ width, height });
    // };

    const memoizedPages = useMemo(() => (
        pdfStringArray.map((pdfPageString, index) => (
            
            <div key={index} className="py-4 flex justify-center border-4 border-black"> {/* Add margin-y to separate the documents */}
                <div className={` w-[${width}] border-4 border-red-500 justify-center`}>
                    <Document
                        file={pdfPageString}
                        className="w-full border-4 border-green-400"
                    >
                        <Page
                            pageIndex={0}
                            width={width}
                            renderTextLayer={false}  // Keep text layer rendering
                            // onLoadSuccess={onLoadSuccess}
                        />
                    </Document>
                </div>
            </div>
        ))
    ), [pdfStringArray, width]);

    return (
        <div className="w-full h-full bg-slate-400">
            <div className="flex flex-row justify-center">
                <button className="border border-gray-950 p-3 bg-slate-500" onClick={() =>{ num < 7 && setNum(num + 1);
                }}>
                    -
                </button>
                <button className="border border-gray-950 p-3 bg-slate-500" onClick={() => num > 1 && setNum(num - 1)}>
                    +
                </button>
            </div>
            {pdfStringArray.length > 0 ? (
                <div>
                    {memoizedPages}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
