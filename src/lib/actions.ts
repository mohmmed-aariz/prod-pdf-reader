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

  let count = 0;
  for (let i = 0; i < 10000000000; i++) {
    count++;
  }

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




import { PDFDocument } from 'pdf-lib';
import { utapi } from "@/server/uploadthing";

    
const addPdfToDb = async (title: string, pdfUrl: string, pdfAppUrl: string, pdfKey: string, totalPages: number, size: number, authorId?: string, description?: string, coverImageUrl?: string ) => {
  console.log("inside addPdfToDb");
  // console.log({
  //   title,
  //   description,
  //   coverImageUrl,
  //   pdfUrl,
  //   pdfAppUrl,
  //   pdfKey,
  //   totalPages,
  //   size
  // })
  const res = await prisma.pdfDocument.create({
    data: {
      title,
      description,
      coverImageUrl,
      pdfUrl,
      pdfAppUrl,
      pdfKey,
      totalPages,
      size,
      authorId: '496ec52f-2510-491b-95f7-4af17f8d0d7d'
    }
  })

  return res;
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

export async function uploadFirstFilePagesLite(firstFile: File, userId: string, docId: string ) {
  console.log("inside uploadFiles server session lite");

  const fileBuffer = await firstFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBuffer);

  const totalPages = pdfDoc.getPageCount();
  const fileName = pdfDoc;
  // console.log(fileName);
  console.log(`Total Pages: ${totalPages}`);

  const pageUrlArr = [];

  for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const newFile = new File([blob], `${docId}_page_${i + 1}.pdf`, { type: 'application/pdf' });

      console.log(`Uploading page ${i + 1}`);
      const pdfPageTitle = `${docId}_${i+1}`;
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
          }
      } catch (err) {
          throw new Error("Error while uploading the document to DB");
      }
  }

  console.log("Page url array: ", pageUrlArr);
  return pageUrlArr;
  
}


export async function uploadFileAndPages(  
  currentState: { success: boolean; message: string },
  formData: FormData
) {
  const session = await getServerSession(NEXT_AUTH);
  const authorId = session?.user.id || "";
  const authorRole = session?.user.role;

  console.log("inside uploadFiles server session")

  console.log("File name: ", formData.get('fileName'));

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

  const response = await utapi.uploadFiles(firstFile); 
  const dataToUpload = response.data;
  console.log("Response", response);
  

  try {
      if(dataToUpload){
        console.log("inside dataToUpload");
          // uploading file to db
          // const dbRes = await addPdfToDb(dataToUpload?.name , dataToUpload?.key , dataToUpload?.url , dataToUpload?.appUrl , authorId , dataToUpload?.size, totalPages )
          const dbRes = await addPdfToDb(dataToUpload.name, dataToUpload.url, dataToUpload.appUrl, dataToUpload.key, totalPages, dataToUpload.size, authorId);
          console.log("dbRes: ", dbRes);
          // const dbRes = {"id": 2};

          if(dbRes){
              // uploading pages to db
              const pdfPagesUrl = await uploadFirstFilePagesLite(firstFile , authorId, dbRes.id );
              // how to add pdfPagesUrl to PdfDocument table
              await updatePdfDocumentWithPageUrls(dbRes.id, pdfPagesUrl);
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


async function updatePdfDocumentWithPageUrls(pdfDocumentId: string, pdfPagesUrl: string[]){
  await prisma.pdfDocument.update({
      where: {
          id: pdfDocumentId
      },
      data: {
          pdfPagesUrl: pdfPagesUrl
          // pdfPagesUrl: JSON.stringify(pdfPagesUrl),
      }
  })
}





// export async function onButtonPress() {
//   console.log("on button press called")
//   const res = await prisma.pdfDocument.create({
//       data: {
//           title: "title",
//           description: "description",
//           coverImageUrl: "coverImageUrl",
//           pdfUrl: "pdfUrl",
//           pdfAppUrl: "pdfAppUrl",
//           pdfKey: "pdfKey",
//           totalPages: 11,
//           // hide: true,
//           size: 11,
//       }
//   })
//   console.log(res);
// }