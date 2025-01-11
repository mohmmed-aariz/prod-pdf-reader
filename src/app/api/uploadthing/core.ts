import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { NEXT_AUTH } from "../auth/[...nextauth]/options";


const f = createUploadthing();

const auth = async (req: Request) => {
  const session = await getServerSession(NEXT_AUTH);
  
  if (!session) throw new Error("Unauthenticated");

  console.log("Session from core.ts");
  console.log(session);
  return session.user
} 

export const ourFileRouter = {
    imageUploader: f({
        image: { maxFileSize: "4MB", maxFileCount: 1, },
    })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const user = await auth(req);

            // If you throw, the user will not be able to upload
            if (!user) throw new UploadThingError("Unauthorized");

            // console.log("cors.ts:_____________", typeof(parseInt(user.id)));
            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
        // This code RUNS ON YOUR SERVER after upload
        // console.log("Upload complete for userId:", metadata.userId);

        // console.log("file url", file.url);
        // console.log("User Metadata: ", metadata)

        // now save the file details in the database 

        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { 
            uploadedBy: metadata.userId, 
            // fileUrl: file.url,
            // fileKey: file.key,
            // fileSize: file.size,
            // fileAppUrl: file.appUrl,
            // fileName: file.name,
            // fileType: file.type
        };
        }),

    pdfUploader: f({
        pdf: { maxFileSize: "128MB", maxFileCount: 1,},
    })
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const user = await auth(req);

            // If you throw, the user will not be able to upload
            if (!user) throw new UploadThingError("Unauthorized");

            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
        // This code RUNS ON YOUR SERVER after upload
        // console.log("Upload complete for userId:", metadata.userId);

        // console.log("file url", file.url);
        // console.log("User Metadata: ", metadata)

        // now save the file details in the database 

        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { 
            uploadedBy: metadata.userId, 
            // fileUrl: file.url,
            // fileKey: file.key,
            // fileSize: file.size,
            // fileAppUrl: file.appUrl,
            // fileName: file.name,
            // fileType: file.type
        };
        }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
