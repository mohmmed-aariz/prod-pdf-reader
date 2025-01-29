import { PDFDocument } from 'pdf-lib';

import axios from 'axios';


export async function loadPdfPage(pdfUrl: string): Promise<string | null> {
  // let pdfUrl = pdfUrl_;

  //  pdfUrl = 'https://utfs.io/f/QHWVkOc63xDRodKu1JalH1uDm5rSaE9fOyqwFB7j3LzNIUW2';
  // let pdfUrl = new URL(pdfUrl_);
  // console.log("pdfUrl is ",pdfUrl);
  try {
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
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

    // Assuming 'publicpages' is a parameter you need to provide
    // const publicpages = /* Get the value of publicpages */ 0;

    // for (let i = 0; i < pageCount; i++) {
    //   if (i >= publicpages) {
    //     pdfDoc.removePage(pageCount - i);
    //   }
    // }

    const base64string = await pdfDoc.saveAsBase64({ dataUri: true });

    return base64string;
  } catch (error) {
    console.error("Error converting PDF:", error);
    return null;
  }
}


