"use client"
import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options";
import { onButtonPress } from "@/lib/actions";
// import { pdfToImg } from "@/lib/actions";
// import { convertPdfPageToImg, onButtonPress, pdfToImg } from "@/lib/actions";
// import { onButtonPress, uploadFileAndPages } from "@/lib/actions";
import prisma from "@/lib/db";
// import { uploadFileAndPages } from "@/lib/actions";
// import { addPdfToDb } from "@/app/lib/actions";

import { utapi } from "@/server/uploadthing";
import { getServerSession } from "next-auth";

export default function Server(){
    // const session = await getServerSession(NEXT_AUTH);

    // console.log("session from agency/server")
    // const userId = session?.user.id;
    // console.log(userId);

    

    

    return (
        <>
        {/* {JSON.stringify(session)} */}
        <h1>Server component Page</h1>

        <br></br>
        <br></br>

        {/* <button onClick={onButtonPress}
        >Button</button> */}

        {/* <form action={uploadFiles}> */}
        {/* <form action={uploadFirstFilePages}> */}
        {/* <form action={convertPdfPageToImg}> */}
        <form action={onButtonPress}>
            {/* <input name="files" type="file"  /> */}
            {/* <input name="coverImg" type="file" accept="image/*"/> */}
            <input name='files' type='file' accept="image/*" />
            <button type="submit">Upload</button>
        </form>
        </>
    )
}



// add status online / offline flag in db