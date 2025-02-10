"use server";

import prisma from "./db";
import bcryptjs from "bcryptjs";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options";

export async function uploadFileAndPagesClientSide(
  currentState: { success: boolean; message: string },
  formData: FormData
) {
  const session = await getServerSession(NEXT_AUTH);
  const userId = session?.user.id || "";
  const authorRole = session?.user.role || "";

  // getting author id from userId
  const agencyInfo = await prisma.agency.findFirst({
    where: {
      userId: userId,
    },
  });
  const authorId = agencyInfo?.id || "";

  // to set the status of the file
  const status = formData.get("status");
  let hide = status === "hide" ? true : false;
  console.log("Status is: ", status);
  console.log("Hide: ", hide);

  // to get file name
  let fileName = "";
  const fileFormName = formData.get("fileName");
  if (fileFormName) {
    fileName = fileFormName.toString();
  }
  console.log("file name is: ", fileName);

  // to get file description
  let description = "";
  const fileDescription = formData.get("fileDescription");
  if (fileDescription) {
    description = fileDescription.toString();
  }
  console.log("File description is : ", description);

  // to get document details
  let docUrl = "";
  let docAppUrl = "";
  let docKey = "";
  let docSize = 0;

  const docResUrl = formData.get("docUrl");
  if (docResUrl) {
    docUrl = docResUrl.toString();
  }

  const docResAppUrl = formData.get("docAppUrl");
  if (docResAppUrl) {
    docAppUrl = docResAppUrl.toString();
  }

  const docResKey = formData.get("docKey");
  if (docResKey) {
    docKey = docResKey.toString();
  }

  const docResSize = formData.get("docSize");
  if (docResSize) {
    docSize = Number(docResSize);
  }

  // to get coverImage details
  let coverImageUrl = "";
  let coverImageKey = "";

  const coverImageResUrl = formData.get("coverImageUrl");
  if (coverImageResUrl) {
    coverImageUrl = coverImageResUrl.toString();
  }

  const coverImageResKey = formData.get("coverImageKey");
  if (coverImageResKey) {
    coverImageKey = coverImageResKey.toString();
  }

  let totalPages = 0;
  console.log(docKey);

  try {
    // adding pdfDetails to db
    const dbRes = await addPdfToDbClientSide(
      fileName,
      docUrl,
      docAppUrl,
      docKey,
      totalPages,
      docSize,
      authorId,
      coverImageUrl,
      coverImageKey,
      description,
      hide
    );

    if (dbRes) {
      // const [pdfPagesUrl, pdfPagesKey] = await uploadFirstFilePagesClientSide(
      //   docUrl,
      //   dbRes.id,
      //   fileName
      // );

      /**
       * Upload Successful!
          POST /agency/content/create 200 in 160397ms
          Upload Successful!
 POST /agency/content/create 200 in 53510ms
       */

      const [pdfPagesUrl, pdfPagesKey] =
        await uploadFirstFilePagesClientSideInParallel(
          docUrl,
          dbRes.id,
          fileName
        );
      /*
      Upload Successful!
 POST /agency/content/create 200 in 30242ms
 */

      const totalPages = pdfPagesUrl.length;

      // Filter out null values
      const filteredPdfPagesUrl = pdfPagesUrl.filter((url) => url !== null);
      const filteredPdfPagesKey = pdfPagesKey.filter((key) => key !== null);

      await updatePdfDocumentWithPageUrlsClientSide(
        dbRes.id,
        filteredPdfPagesUrl,
        filteredPdfPagesKey,
        totalPages
      );
      console.log("Upload Successful!");

      return {
        success: true,
        message: "Upload Successful",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error while uploading!",
    };
  }

  return {
    success: false,
    message: "Error while uploading!",
  };
}

const addPdfToDbClientSide = async (
  title: string,
  pdfUrl: string,
  pdfAppUrl: string,
  pdfKey: string,
  totalPages: number,
  size: number,
  authorId?: string,
  coverImageUrl?: string,
  coverImageKey?: string,
  description?: string,
  hide?: boolean
) => {
  console.log("pdfKey is :", pdfKey);
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
    hide,
  });

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
        hide,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    // console.log("DB error: ", error)
    return { id: "1", error };
  }
};

import axios from "axios";
import { PDFDocument } from "pdf-lib";
import { utapi } from "@/server/uploadthing";

export async function uploadFirstFilePagesClientSide(
  pdfUrl: string,
  docId: string,
  fileName: string
) {
  // replace docId with fileName
  console.log("inside uploadFiles server session lite");

  // Fetch the PDF file using axios
  const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
  const fileBuffer = response.data;

  const pdfDoc = await PDFDocument.load(fileBuffer);

  const totalPages = pdfDoc.getPageCount();
  const sanitizedFileName = fileName.replace(/\s/g, "_");
  console.log(`Total Pages: ${totalPages}`);

  const pageUrlArr = [];
  const pageKeyArr = [];

  for (let i = 0; i < totalPages; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);

    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const newFile = new File([blob], `${sanitizedFileName}_page_${i + 1}.pdf`, {
      type: "application/pdf",
    });

    console.log(`Uploading page ${i + 1}`);
    const pdfPageTitle = `${sanitizedFileName}_${i + 1}`;

    const response = await utapi.uploadFiles(newFile);
    const dataToUpload = response.data;

    try {
      if (dataToUpload) {
        const dbRes = await addPdfPagesToDbClientSide(
          pdfPageTitle,
          i + 1,
          dataToUpload.url,
          dataToUpload.appUrl,
          dataToUpload.key,
          docId
        );
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

const addPdfPagesToDbClientSide = async (
  title: string,
  pageNumber: number,
  pdfUrl: string,
  pdfAppUrl: string,
  pdfKey: string,
  pdfDocumentId: string
) => {
  const newFile = await prisma.pdfPage.create({
    data: {
      title: title,
      pageNumber: pageNumber,
      pdfUrl: pdfUrl,
      pdfAppUrl: pdfAppUrl,
      pdfKey: pdfKey,
      pdfDocumentId: pdfDocumentId,
    },
  });

  console.log(`${pageNumber}: `, newFile);
  return newFile;
};

export async function uploadFirstFilePagesClientSideInParallel(
  pdfUrl: string,
  docId: string,
  fileName: string
) {
  // replace docId with fileName
  console.log("inside uploadFiles server session lite");

  // Fetch the PDF file using axios
  const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
  const fileBuffer = response.data;

  const pdfDoc = await PDFDocument.load(fileBuffer);

  const totalPages = pdfDoc.getPageCount();
  const sanitizedFileName = fileName.replace(/\s/g, "_");
  console.log(`Total Pages: ${totalPages}`);

  const pagePromises = [];

  for (let i = 0; i < totalPages; i++) {
    pagePromises.push(
      (async (pageIndex) => {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
        newPdf.addPage(copiedPage);

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const newFile = new File(
          [blob],
          `${sanitizedFileName}_page_${pageIndex + 1}.pdf`,
          { type: "application/pdf" }
        );

        console.log(`Uploading page ${pageIndex + 1}`);
        const pdfPageTitle = `${sanitizedFileName}_${pageIndex + 1}`;

        const response = await utapi.uploadFiles(newFile);
        const dataToUpload = response.data;

        try {
          if (dataToUpload) {
            const dbRes = await addPdfPagesToDbClientSide(
              pdfPageTitle,
              pageIndex + 1,
              dataToUpload.url,
              dataToUpload.appUrl,
              dataToUpload.key,
              docId
            );
            return {
              pageIndex,
              pdfAppUrl: dbRes.pdfAppUrl,
              pdfKey: dbRes.pdfKey,
            };
          }
        } catch (err) {
          throw new Error("Error while uploading the document to DB");
        }
        return undefined;
      })(i)
    );
  }

  const pageResults = await Promise.all(pagePromises);

  const pageUrlArr = pageResults.map((result) =>
    result ? result.pdfAppUrl : null
  );
  const pageKeyArr = pageResults.map((result) =>
    result ? result.pdfKey : null
  );

  console.log("Page url array: ", pageUrlArr);
  console.log("Page key array: ", pageKeyArr);

  return [pageUrlArr, pageKeyArr];
}

async function updatePdfDocumentWithPageUrlsClientSide(
  pdfDocumentId: string,
  pdfPagesUrl: string[],
  pdfKeysUrl: string[],
  totalPages: number
) {
  await prisma.pdfDocument.update({
    where: {
      id: pdfDocumentId,
    },
    data: {
      pdfPagesUrl: pdfPagesUrl,
      pdfPagesKey: pdfKeysUrl,
      totalPages: totalPages,
      // pdfPagesUrl: JSON.stringify(pdfPagesUrl),
    },
  });
}


export const removePdf = async (imageKey: string) => {
  try {
      console.log(`server action ${imageKey}`);
      const res = await utapi.deleteFiles(imageKey)
      console.log(res);
      if (res.success ) {
          // alert("One File is removed form server")
          console.log("one file removed")
      }
      return {success: true};
  }
  catch (error) {
      console.log(error);
  }
}

export const removeImage = async (imageKey: string) => {
  try {
      console.log(`server action ${imageKey}`);
      const res = await utapi.deleteFiles(imageKey)
      console.log(res);
      if (res.success ) {
          // alert("One File is removed form server")
          console.log("one file removed")
      }
      return {success: true};
  }
  catch (error) {
      console.log(error);
  }
}