"use server";

import prisma from "./db";
import bcryptjs from "bcryptjs";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options";

// Actons for Agency

export async function agencySignUp(
  currentState: { success: boolean; message: string },
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  // let count = 0;
  // for (let i = 0; i < 10000000000; i++) {
  //   count++;
  // }

  try {
    const hashPassword = await bcryptjs.hash(password, 10);

    const userExists = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (userExists) {
      return {
        success: false,
        message: "User already exists!",
      };
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        username: username,
        password: hashPassword,
        role: "AGENCY_USER"
      },
    });

    const agencyId = await prisma.agency.create({
      data: {
        userId: user.id
      }
    })

    return {
      success: true,
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      message: `An error occured while registering the user!`,
    };
  }
}

export async function getAgencyUser(){
  const session = await getServerSession(NEXT_AUTH);

  return session
}




import { PDFDocument, PDFPage } from 'pdf-lib';
import { utapi } from "@/server/uploadthing";
import sharp from "sharp";
import { PdfPage, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

    
const addPdfToDb = async (title: string, pdfUrl: string, pdfAppUrl: string, pdfKey: string, totalPages: number, size: number, authorId?: string, coverImageUrl?: string, coverImageKey?: string, description?: string , hide?: boolean  ) => {
  console.log("inside addPdfToDb");
  console.log("Data to upload is: ", {
    title,
    description,
    coverImageUrl,
    coverImageKey,
    pdfUrl,
    pdfAppUrl,
    pdfKey,
    totalPages,
    size,
    authorId,
    hide
  })

  try {
    console.log("inside try block");
    const res = await prisma.pdfDocument.create({
      data: {
        title,
        description,
        coverImageUrl,
        coverImageKey,
        pdfUrl,
        pdfAppUrl,
        pdfKey,
        totalPages,
        size,
        authorId,
        hide
      }
    })
    console.log(res);
    return res;

  } catch (error) {
    // console.log("DB error: ", error)
      return {id: '1', error}
  }
  // const res = await prisma.pdfDocument.create({
  //   data: {
  //     title,
  //     description,
  //     coverImageUrl,
  //     pdfUrl,
  //     pdfAppUrl,
  //     pdfKey,
  //     totalPages,
  //     size,
  //     authorId,
  //     hide
  //   }
  // })
  // console.log(res);

  // return res;
}


export const addPdfPagesToDb = async (title: string, pageNumber: number, pdfUrl: string, pdfAppUrl: string, pdfKey: string, pdfDocumentId: string) => {
  const newFile = await prisma.pdfPage.create({
      data: {
          title: title,
          pageNumber: pageNumber,
          pdfUrl: pdfUrl,
          pdfAppUrl: pdfAppUrl,
          pdfKey: pdfKey,
          pdfDocumentId: pdfDocumentId
      }
  })

  console.log(`${pageNumber}: `, newFile);
  return newFile;   
}

export async function uploadFirstFilePagesLite(firstFile: File, docId: string, fileName: string ) {
  // replace docId with fileName
  console.log("inside uploadFiles server session lite");

  const fileBuffer = await firstFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBuffer);

  const totalPages = pdfDoc.getPageCount();
  // const fileName = pdfDoc;
  // console.log(fileName);
  const sanitizedFileName = fileName.replace(/\s/g, '_');
  console.log(`Total Pages: ${totalPages}`);

  const pageUrlArr = [];
  const pageKeyArr = [];

  for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      // const newFile = new File([blob], `${docId}_page_${i + 1}.pdf`, { type: 'application/pdf' });
      const newFile = new File([blob], `${sanitizedFileName}_page_${i + 1}.pdf`, { type: 'application/pdf' });


      console.log(`Uploading page ${i + 1}`);
      // const pdfPageTitle = `${docId}_${i+1}`;
      const pdfPageTitle = `${sanitizedFileName}_${i+1}`;

      const response = await utapi.uploadFiles(newFile);

      // const dataToUpload = response[0].data;
      const dataToUpload = response.data;

      // const session = await getServerSession(NEXT_AUTH);

      try {
          if (dataToUpload) {
              // add file name to dfPage
              const dbRes = await addPdfPagesToDb(pdfPageTitle,i+1,dataToUpload.url, dataToUpload.appUrl, dataToUpload.key, docId)
              // console.log(dbRes);
              pageUrlArr.push(dbRes.pdfAppUrl);
              pageKeyArr.push(dbRes.pdfKey);
          }
      } catch (err) {
          throw new Error("Error while uploading the document to DB");
      }
  }

  console.log("Page url array: ", pageUrlArr);
  console.log("Page key array: ", pageKeyArr);

  return [pageUrlArr, pageKeyArr];
  
}









// export async function uploadFileAndPages(  
//   currentState: { success: boolean; message: string },
//   formData: FormData
// ) {

//   const session = await getServerSession(NEXT_AUTH);
//   const userId = session?.user.id || "";


//   const agencyInfo = await prisma.agency.findFirst({
//     where: {
//       userId: userId
//     }
//   })

//   console.log("agency info is: ",agencyInfo);

//   // // let count = 0;
//   // // for (let i = 0; i < 10000000000; i++) {
//   // //   count++;
//   // // }

  
//   // // to get file description
//   // let description = '';
//   // const fileDescription = formData.get("fileDescription"); 
//   // if(fileDescription){
//   //   description = fileDescription.toString();
//   // }
//   // console.log("File description is : ", description);

//   // const status = formData.get('status');
//   // let hide = (status === 'hide')? (true) : (false);

//   // console.log("Status is: ", status)
//   // console.log("Hide is : ", hide);

//   // const dataToUpload = {
//   //   title: "December'24 edition",
//   //   description: 'this is e-magazine for December edition',
//   //   coverImageUrl: 'https://utfs.io/f/hZVG1XIiCNlA1ZzfDh24WKwxTkCYnHXDIAPe0St7BfsUOpyZ',
//   //   pdfUrl: 'https://utfs.io/f/hZVG1XIiCNlAwzlOkY96xRDvGhTEdgO2m8fUs4n9aPLZJYFo',
//   //   pdfAppUrl: 'https://utfs.io/a/smkhor7zi7/hZVG1XIiCNlAwzlOkY96xRDvGhTEdgO2m8fUs4n9aPLZJYFo',
//   //   pdfKey: 'hZVG1XIiCNlAwzlOkY96xRDvGhTEdgO2m8fUs4n9aPLZJYFo',
//   //   totalPages: 25,
//   //   size: 33809738,
//   //   authorId: '496ec52f-2510-491b-95f7-4af17f8d0d7d',
//   //   hide: true
//   // }
//   // console.log("Uploading started!");
//   // const dbRes = await addPdfToDb(dataToUpload.title, dataToUpload.pdfUrl, dataToUpload.pdfAppUrl, dataToUpload.pdfKey, dataToUpload.totalPages, dataToUpload.size, dataToUpload.authorId, dataToUpload.coverImageUrl, dataToUpload.description, dataToUpload.hide);
  
//   // console.log("result: ", dbRes)


//   return {
//     success: true,
//     message: "message"
//   }
// }





export async function uploadFileAndPages(  
  currentState: { success: boolean; message: string },
  formData: FormData
) {
  const session = await getServerSession(NEXT_AUTH);
  const userId = session?.user.id || "";


  const agencyInfo = await prisma.agency.findFirst({
    where: {
      userId: userId
    }
  })

  console.log("agency info is: ",agencyInfo);
  const authorId = agencyInfo?.id ;

  // const authorIdAgency = agencyInfo
  const authorRole = session?.user.role;
  let coverImageResUrl = '';
  let coverImageResKey = '';

  // to set the status of the file 
  const status = formData.get('status');
  let hide = (status === 'hide')? (true) : (false);  
  console.log("Status is: ", status)
  console.log("Hide: ", hide);

  // to get file name 
  let fileName = '';
  const fileFormName = formData.get("fileName");
  if(fileFormName){
    fileName = fileFormName.toString();
  }
  console.log("file name is: ", fileName);

  // to get file description
  let description = '';
  const fileDescription = formData.get("fileDescription"); 
  if(fileDescription){
    description = fileDescription.toString();
  }
  console.log("File description is : ", description);
  

  console.log("inside uploadFiles server session")

  console.log("File name: ", formData.get('fileName'));

  // upload cover image 
  const coverImg = formData.get("coverImg");

  console.log("Cover image:",coverImg);

  if(coverImg && coverImg instanceof File && coverImg.size > 0){
    console.log("CoverImage is : ", coverImg);
    const coverImgRes = await uploadCoverImage(coverImg);
    // const res = await utapi.uploadFiles([coverImg]);
    // console.log("Uploade Successful: ", res);

    // return res[0].data;
    coverImageResUrl = coverImgRes?.url || "";
    coverImageResKey = coverImgRes?.key || "";
    console.log("Cover image url: ",coverImageResUrl);
    console.log("Cover image key: ",coverImageResKey);
  }



  const files = formData.getAll("files").map((file) => { 
      if (file instanceof File) { 
          return file; 
      } 
      
      throw new Error("Invalid file type"); 
  }); 

  const firstFile = files[0];

  const fileBuffer = await firstFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBuffer);

  const totalPages = pdfDoc.getPageCount();

  console.log("Uploading doc file");
  const response = await utapi.uploadFiles(firstFile); 
  const dataToUpload = response.data;
  console.log("Response of file Upload", response);
  
  // if file name is not given in the form, then take it from the pdf file
  if(!fileName){
    fileName = dataToUpload?.name || "";
  }

  try {
      if(dataToUpload){
        console.log("inside dataToUpload in DB");
          // uploading file to db
          // const dbRes = await addPdfToDb(dataToUpload?.name , dataToUpload?.key , dataToUpload?.url , dataToUpload?.appUrl , authorId , dataToUpload?.size, totalPages )
          const dbRes = await addPdfToDb(fileName, dataToUpload.url, dataToUpload.appUrl, dataToUpload.key, totalPages, dataToUpload.size, authorId, coverImageResUrl,coverImageResKey, description, hide);
          console.log("dbRes: ", dbRes);
          // const dbRes = {"id": 2};

          if(dbRes){
              // uploading pages to db
              const [pdfPagesUrl, pdfPagesKey] = await uploadFirstFilePagesLite(firstFile , dbRes.id, fileName );
              // how to add pdfPagesUrl to PdfDocument table
              await updatePdfDocumentWithPageUrls(dbRes.id, pdfPagesUrl, pdfPagesKey);
              console.log("Upload Successful!");
              
              return {
                success: true,
                message: "Upload Successful",
              };
          }

          return {
            success: false,
            message: "Unable to upload page urls"
          }
      }
      return {
        success: false,
        message: "Error while uploading"
      }

      
  } catch (err) {
      // throw new Error("error while uploading the document to db");
      // console.log("Error: ", err)
      // console.error(err)
      return {
        success: false,
        message: "error: " + err
      }
      
  }

  


}


async function updatePdfDocumentWithPageUrls(pdfDocumentId: string, pdfPagesUrl: string[], pdfKeysUrl: string[]){
  await prisma.pdfDocument.update({
      where: {
          id: pdfDocumentId
      },
      data: {
          pdfPagesUrl: pdfPagesUrl,
          pdfPagesKey: pdfKeysUrl
          // pdfPagesUrl: JSON.stringify(pdfPagesUrl),
      }
  })
}



export async function uploadCoverImage(file: File) {
  console.log("Uploading Cover Image")

  // const coverImg = formData.get("coverImg");
  // console.log(coverImg);

  if(file && file instanceof File){
    const res = await utapi.uploadFiles([file]);
    console.log("Uploade Successful: ", res);

    return res[0].data;
  }

  
}



export async function onButtonPress(formData: FormData) {
  console.log("on button press called")
  // const res = await prisma.pdfDocument.create({
  //     data: {
  //         title: "title",
  //         description: "description",
  //         coverImageUrl: "coverImageUrl",
  //         pdfUrl: "pdfUrl",
  //         pdfAppUrl: "pdfAppUrl",
  //         pdfKey: "pdfKey",
  //         totalPages: 11,
  //         // hide: true,
  //         size: 11,
  //     }
  // })
  // console.log(res);


  const coverImg = formData.get("coverImg");
  console.log(coverImg);

  if(coverImg && coverImg instanceof File){
    const res = await utapi.uploadFiles([coverImg]);
    console.log("Uploade Successful res: ", res);

    const arrayBuffer = await coverImg.arrayBuffer();
    const resizedImg = await sharp(arrayBuffer).resize(150, null, {withoutEnlargement: true, fit: "inside"}).withMetadata().jpeg({quality: 80}).toBuffer();
  
    // const resResized = await utapi.uploadFiles(resizedImg);
    // Convert the resized buffer to a new Blob/File
    const resizedFile = new File([resizedImg], coverImg.name, { type: coverImg.type });

    // Upload the resized image using utapi
    const resResized = await utapi.uploadFiles([resizedFile]);
    console.log("Upload Successful resResized: ", resResized);
    // return res[0].data;
  }
}



export async function updateDocument(  
  currentState: { success: boolean; message: string },
  formData: FormData
){
  // zod validation on data

  const fileName = formData.get("fileName")?.toString() ;
  const fileDescription = formData.get("fileDescription")?.toString();
  const status = formData.get("status");
  const id = formData.get("id")?.toString();
  const booleanStatus = status === 'hidden';
  console.log("Status original: ", status)
  console.log("Status: ", booleanStatus);


  try {
    const res = await prisma.pdfDocument.update({
      where: {  id },
      data: {
        title: fileName ,
        description: fileDescription,
        hide: booleanStatus
      }
    })
    return {
      success: true,
      message: ""
    }

    // return res;
  } catch (error) {
    return {
      success: false,
      message: "Database Error: Failed to Update Invoice."
    }
  }

  // revalidatePath('/dashboard/invoices');
  // redirect('/dashboard/invoices');
}



export async function deleteDocument(id: string){
  console.log("Inside deleteDocument");

  const res = await prisma.pdfDocument.findFirst({
    where: {
      id: id
    },
    select: {
      pdfKey: true,
      coverImageKey: true,
      pdfPagesKey: true
    }
  })

  console.log(res);

  const allKeys: string[] = [
    res?.coverImageKey || '',
    res?.pdfKey || '',
    ...res?.pdfPagesKey || [],
  ].filter(Boolean) ;

  console.log("all keys:: ", allKeys);

  const deleteDataFromUT = await utapi.deleteFiles(allKeys)

  console.log(deleteDataFromUT);
  // DeleteFileResponse { success: true, deletedCount: 32 }

  if(deleteDataFromUT.success){
    // res?.pdfPagesKey.map(async (key) => { 
    //   const pageDeleteRes = await prisma.pdfPage.deleteMany({
    //     where: {
    //       pdfKey: {
    //         in: 
    //       }
    //     }
    //   })
    // } )

    const pagesDeleteRes = await prisma.pdfPage.deleteMany({
      where: {
        pdfKey: {
          in: res?.pdfPagesKey
        }
      }
    })

    const pdfDeleteRes = await prisma.pdfDocument.delete({
      where: {
        pdfKey: res?.pdfKey
      }
    })
    // const coverImageDeleteRes = prisma.pdfDocument.deleteMany({
    //   where: {
    //     coverImageKey: res?.coverImageKey 
    //   }
    // })
    
    console.log("Delete result:: ", pagesDeleteRes, pdfDeleteRes);
      revalidatePath('/agency/content');

  }

  // return res;
}





export async function deleteSubscriber(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {id: id},
      select: {role: true}
    });

    if (user?.role !== Role.ADMIN){

      await prisma.user.delete({
        where: {
          id: id
        }
      })
    }

    console.log({ message: "Operation not allowed: Cannot delete an ADMIN subscriber."});

  } catch (error) {
    console.error('Database Error:', error);
  }

  revalidatePath('/agency/subscribers');
}

































// // import Poppler from "node-poppler";
// import { pdf } from "pdf-to-img";
// import * as pdfjsLib from 'pdfjs-dist'

// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.js';

// export async function pdfToImg(formData: FormData){
//   console.log("inside pdfToImg")
//   const files = formData.getAll("files").map((file) => { 
//       if (file instanceof File) { 
//           return file; 
//       } 
      
//       throw new Error("Invalid file type"); 
//   }); 

//   const firstFile = files[0];
//   const arrayBuffer = await firstFile.arrayBuffer();
//   const fileBuffer = Buffer.from(arrayBuffer);

//   const images = await pdf(fileBuffer);
//   console.log(images);

// }



// import * as pdfjsLib from 'pdfjs-dist'
// import { createCanvas } from 'canvas';

// // Set the PDF.js worker source from the CDN 
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.7.570/pdf.worker.min.js';

// export async function convertPdfPageToImg(formData: FormData){
//   const files = formData.getAll("files").map((file)=> {
//     if( file instanceof File){
//       return file
//     }

//     throw new Error("Invalid file type")
//   })

//   const firstFile = files[0];

//   const fileBuffer = await firstFile.arrayBuffer();
//   // const pdfDoc = await PDFDocument.load(fileBuffer);
//   // const pages = pdfDoc.getPages();
//   // const pdf = await pdfjsLib.getDocument({data: fileBuffer}).promise;
//   const pdf = await pdfjsLib.getDocument({data: fileBuffer}).promise;
//   const imageBuffers = [];

//   for(let i = 0; i < pdf.numPages; i++){
//     const page = await pdf.getPage(i);
//     const viewport = page.getViewport({ scale: 1.5 });
//     const canvas = createCanvas(viewport.width, viewport.height);
//     const ctx = canvas.getContext('2d') as any;

//     await page.render({ canvasContext: ctx, viewport }).promise;
//     const buffer = await sharp(canvas.toBuffer()).png().toBuffer();
//     imageBuffers.push(buffer);
//   }

//   // Prepare the files for uploading
//   const filesToUpload = imageBuffers.map((buffer, index) => {
//     const file = new File([buffer], `page_${index + 1}.png`, { type: 'image/png' });
//     return file;
//   })

//   const response = await utapi.uploadFiles(filesToUpload);
//   console.log(response);


// }

// ____________________________________

// import { createCanvas } from 'canvas';

// // export async function convertPdfPageToImg(formData: FormData) {
// //   const files = formData.getAll("files").map((file) => {
// //     if (file instanceof File) {
// //       return file;
// //     }
// //     throw new Error("Invalid file type");
// //   });

// //   const firstFile = files[0];
// //   const arrayBuffer = await firstFile.arrayBuffer();
// //   const pdfDoc = await PDFDocument.load(arrayBuffer);

// //   const pages = pdfDoc.getPages();
// //   const imageBuffers = [];

// //   for (const page of pages) {
// //     const viewport = {
// //       width: page.getWidth(),
// //       height: page.getHeight(),
// //     };
// //     const canvas = createCanvas(viewport.width, viewport.height);
// //     const ctx = canvas.getContext('2d');

// //     // Here you would render the PDF page onto the canvas
// //     // This step requires custom rendering code

// //     const buffer = await sharp(canvas.toBuffer()).png().toBuffer();
// //     imageBuffers.push(buffer);
// //   }

// //   const filesToUpload = imageBuffers.map((buffer, index) => {
// //     const file = new File([buffer], `page_${index + 1}.png`, { type: 'image/png' });
// //     return file;
// //   });

// //   const response = await utapi.uploadFiles(filesToUpload);
// //   console.log(response);
// // }


// export async function convertPdfPageToImg(formData: FormData) {
//   const files = formData.getAll("files").map((file) => {
//     if (file instanceof File) {
//       return file;
//     }
//     throw new Error("Invalid file type");
//   });

//   const firstFile = files[0];
//   const arrayBuffer = await firstFile.arrayBuffer();
//   const pdfDoc = await PDFDocument.load(arrayBuffer);
//   const pages = pdfDoc.getPages();
//   const imageBuffers = [];

//   for (const page of pages) {
//     const viewport = {
//       width: page.getWidth(),
//       height: page.getHeight(),
//     };
//     const canvas = createCanvas(viewport.width, viewport.height);
//     const ctx = canvas.getContext('2d');

//     // Render the PDF page onto the canvas
//     ctx.fillStyle = 'white';
//     ctx.fillRect(0, 0, viewport.width, viewport.height);
//     const textContent = await page.getTextContent();
//     textContent.items.forEach(item => {
//       const { str, transform } = item;
//       const [fontSize, , , , x, y] = transform;
//       ctx.font = `${fontSize}px sans-serif`;
//       ctx.fillText(str, x, y);
//     });

//     const buffer = await sharp(canvas.toBuffer()).png().toBuffer();
//     imageBuffers.push(buffer);
//   }

//   const filesToUpload = imageBuffers.map((buffer, index) => {
//     const file = new File([buffer], `page_${index + 1}.png`, { type: 'image/png' });
//     return file;
//   });

//   const response = await utapi.uploadFiles(filesToUpload);
//   console.log(response);
// }

// import { createCanvas } from 'canvas';
// import * as pdfjsLib from 'pdfjs-dist';

// // pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js';
// pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js"

// export async function convertPdfPageToImg(formData: FormData) {
//   const files = formData.getAll("files").map((file) => {
//     if (file instanceof File) {
//       return file;
//     }
//     throw new Error("Invalid file type");
//   });

//   const firstFile = files[0];

//   // Convert the PDF to images
//   const fileBuffer = await firstFile.arrayBuffer();
//   const loadingTask = pdfjsLib.getDocument({ data: fileBuffer });
//   const pdf = await loadingTask.promise;
//   const imageBuffers = [];

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const viewport = page.getViewport({ scale: 1.5 });
//     const canvas = createCanvas(viewport.width, viewport.height);
//     const ctx = canvas.getContext('2d') as any;

//     await page.render({ canvasContext: ctx, viewport }).promise;
//     const buffer = await sharp(canvas.toBuffer()).png().toBuffer();
//     imageBuffers.push(buffer);
//   }

//   // Prepare the files for uploading
//   const filesToUpload = imageBuffers.map((buffer, index) => {
//     const file = new File([buffer], `page_${index + 1}.png`, { type: 'image/png' });
//     return file;
//   });

//   // Upload the files using UploadThing (UTAPI)
//   const response = await utapi.uploadFiles(filesToUpload);
//   console.log("Upload Successful:", response);

//   // return response;
// }
