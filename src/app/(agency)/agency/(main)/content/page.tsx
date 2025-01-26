import { CreateContent } from "@/app/ui/agency/content/buttons";
import ContentTable from "@/app/ui/agency/content/contentTable";
import Pagination from "@/app/ui/agency/pagination";
import Search from "@/app/ui/agency/search";
import { deleteDocument } from "@/lib/actions";
import { fetchDocumentPages } from "@/lib/data";
import Link from "next/link";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}){
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchDocumentPages(query);


  return (
    <div>
      Content Page
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateContent />
      </div>
         {/* <div className="mt-6 flex justify-start gap-4">
          <Link
            href="/agency/content/create"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Create
          </Link>
        </div> */}
      {/* <ContentTable query="" currentPage={1} /> */}
      <ContentTable query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>

    </div>
  )
}

// "use client"

// import Link from "next/link";

// export default async function Page(){

//   async function dbCall(){
//     const res = await fetchFilteredContent('', 1)
//     console.log(res);
//   }
  
//     return (
//         <>
//         Content page
//         <div className="mt-6 flex justify-start gap-4">
//         <Link
//           href="/agency/content/create"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Create
//         </Link>

//         <div
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//           onClick={dbCall}
//         >
//           DB Call
//         </div>

//           {/* <DownloadButton fileName="December edition" fileUrl="https://utfs.io/f/hZVG1XIiCNlAP4SN3IKwXdrT2bZ0y7Rmp4k6Ht3uhOS5UGiQ" /> */}
//           {/* <a href="https://utfs.io/f/hZVG1XIiCNlAP4SN3IKwXdrT2bZ0y7Rmp4k6Ht3uhOS5UGiQ" download={'December edition'} >Download</a> */}

//       </div>
//       <ContentTable query="" currentPage={1}/>
//         </>
//     )
// }




// // // components/DownloadButton.js
// // import React from 'react';

// // const DownloadButton = ({ fileUrl, fileName }: {fileUrl: string, fileName: string}) => {
  
// //   const handleDownload = () => {
// //     console.log("file download got clicked");
// //     fetch(fileUrl)
// //       .then(response => response.blob())
// //       .then(blob => {
// //         const url = window.URL.createObjectURL(new Blob([blob]));
// //         const link = document.createElement('a');
// //         link.href = url;
// //         link.setAttribute('download', fileName);
// //         document.body.appendChild(link);
// //         link.click();
// //         if(link.parentNode) {
// //           link.parentNode.removeChild(link);
// //         } else {
// //           console.error('Link parent node is null')
// //         }
// //       })
// //       .catch(error => console.error('Error downloading the file:', error));
// //   };

// //   return <button           
// //             className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
// //             onClick={handleDownload}>
// //               Download File
// //             </button>;
// // };

// // components/DownloadButton.js


// import React from 'react';
// import axios from 'axios';
// import { fetchFilteredContent } from "@/lib/actions";
// import ContentTable from "@/app/ui/agency/content/contentTable";

// const DownloadButton = ({ fileUrl, fileName }: {fileUrl: string, fileName: string}) => {
//   console.log("download button clicked!")
//   const handleDownload = () => {
//     axios({
//       url: fileUrl,
//       method: 'GET',
//       responseType: 'blob'
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           const url = window.URL.createObjectURL(new Blob([response.data]));
//           const link = document.createElement('a');
//           link.href = url;
//           link.setAttribute('download', fileName);
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//           window.URL.revokeObjectURL(url);
//         } else {
//           console.error('Error: Received non-200 status code');
//         }
//       })
//       .catch((error) => {
//         console.error('Error downloading the image:', error);
//       });
//   };

//   return <button  className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"  onClick={handleDownload}>Download Button</button>;
// };

