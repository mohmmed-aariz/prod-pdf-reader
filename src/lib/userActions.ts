// "use server";


import { PDFDocument } from 'pdf-lib';

import axios, { AxiosRequestConfig } from 'axios';
import { fetchLatestDocumentId } from './data';


// export async function loadPdfPage(pdfUrl: string): Promise<string | null> {
//   // let pdfUrl = pdfUrl_;

//   //  pdfUrl = 'https://utfs.io/f/QHWVkOc63xDRodKu1JalH1uDm5rSaE9fOyqwFB7j3LzNIUW2';
//   // let pdfUrl = new URL(pdfUrl_);
//   // console.log("pdfUrl is ",pdfUrl);
//   try {
//     const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
//     const pdfDoc = await PDFDocument.load(response.data);
//     const pageCount = pdfDoc.getPageCount();
//     const pages = pdfDoc.getPages();

//     let aspectRatioFirstPage = "0.70711 / 1";
//     let { width, height } = pages[0].getSize();

//     if (width && height) {
//       const ratio = height >= width ? width / height : height / width;
//       aspectRatioFirstPage = `${ratio.toString().slice(0, 7)} / 1`;
//     } else {
//       throw new Error("Invalid values for width or height.");
//     }

//     // Assuming 'publicpages' is a parameter you need to provide
//     // const publicpages = /* Get the value of publicpages */ 0;

//     // for (let i = 0; i < pageCount; i++) {
//     //   if (i >= publicpages) {
//     //     pdfDoc.removePage(pageCount - i);
//     //   }
//     // }

//     const base64string = await pdfDoc.saveAsBase64({ dataUri: true });

//     return base64string;
//   } catch (error) {
//     console.error("Error converting PDF:", error);
//     return null;
//   }
// }


// export async function loadPdfPage(pdfUrl: string): Promise<string | null> {
//   // let pdfUrl = pdfUrl_;

//   //  pdfUrl = 'https://utfs.io/f/QHWVkOc63xDRodKu1JalH1uDm5rSaE9fOyqwFB7j3LzNIUW2';
//   // let pdfUrl = new URL(pdfUrl_);
//   // console.log("pdfUrl is ",pdfUrl);
//   try {
//     const config: AxiosRequestConfig = {
//       responseType: 'arraybuffer',
//       // timeout: 10000,  // Set a timeout of 10 seconds
//     };
//     const response = await axios.get(pdfUrl, config);
//     const pdfDoc = await PDFDocument.load(response.data);
//     const pageCount = pdfDoc.getPageCount();
//     const pages = pdfDoc.getPages();

//     let aspectRatioFirstPage = "0.70711 / 1";
//     let { width, height } = pages[0].getSize();

//     if (width && height) {
//       const ratio = height >= width ? width / height : height / width;
//       aspectRatioFirstPage = `${ratio.toString().slice(0, 7)} / 1`;
//     } else {
//       throw new Error("Invalid values for width or height.");
//     }

//     // Assuming 'publicpages' is a parameter you need to provide
//     // const publicpages = /* Get the value of publicpages */ 0;

//     // for (let i = 0; i < pageCount; i++) {
//     //   if (i >= publicpages) {
//     //     pdfDoc.removePage(pageCount - i);
//     //   }
//     // }

//     const base64string = await pdfDoc.saveAsBase64({ dataUri: true });

//     return base64string;
//   } catch (error) {
//     console.error("Error converting PDF:", error);
//     return null;
//   }
// }

// adding retry logic:

export async function loadPdfPage(pdfUrl: string): Promise<string | null> {
  const maxRetries = 3;  // Define the maximum number of retries
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      const config: AxiosRequestConfig = {
        responseType: 'arraybuffer',
        // timeout: 10000,  // Set a timeout of 10 seconds if needed
      };
      const response = await axios.get(pdfUrl, config);
      const pdfDoc = await PDFDocument.load(response.data);
      const pageCount = pdfDoc.getPageCount();
      const pages = pdfDoc.getPages();

      let aspectRatioFirstPage = "0.70711 / 1";
      let { width, height } = pages[0].getSize();

      if (width && height) {
        const ratio = height >= width ? width / height : height / width;
        aspectRatioFirstPage = `${ratio.toString().slice(0, 7)} / 1`;
      } else {
        throw new Error("Invalid values for width or height.");
      }

      const base64string = await pdfDoc.saveAsBase64({ dataUri: true });

      return base64string;
    } catch (error) {
      console.log("Error fetching PDF, retrying...", error);
      retryCount++;
      if (retryCount === maxRetries) {
        console.error("Max retries reached, unable to fetch PDF.");
        return null;
      }
    }
  }
  return null;
}



export async function readLatestDocument(){
  const latestDoc = await fetchLatestDocumentId();

  return latestDoc  
}