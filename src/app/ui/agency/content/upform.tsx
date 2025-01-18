// "use client"
// import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options";
// import { onButtonPress, uploadFileAndPages } from "@/lib/actions";
// import prisma from "@/lib/db";
// // import { uploadFileAndPages } from "@/lib/actions";
// // import { addPdfToDb } from "@/app/lib/actions";

// import { utapi } from "@/server/uploadthing";
// import { getServerSession } from "next-auth";

// export default function Server(){
//     // const session = await getServerSession(NEXT_AUTH);

//     // console.log("session from agency/server")
//     // const userId = session?.user.id;
//     // console.log(userId);

    

    

//     return (
//         <>
//         {/* {JSON.stringify(session)} */}
//         <h1>Server component Page</h1>

//         <br></br>
//         <br></br>

//         {/* <button onClick={onButtonPress}
//         >Button</button> */}

//         {/* <form action={uploadFiles}> */}
//         {/* <form action={uploadFirstFilePages}> */}
//         <form action={uploadFileAndPages}>
//             <input name="files" type="file" multiple />
//             <button type="submit">Upload</button>
//         </form>
//         </>
//     )
// }



// // add status online / offline flag in db