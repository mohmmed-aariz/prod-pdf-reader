import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { getSession, signIn } from 'next-auth/react';
import React, { useState } from 'react';

const PdfDownloadButtonWithPercentage = ({ url, fileName }: { url: string, fileName: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const downloadFile = async () => {
    const session = await getSession();

    if (!session) {
      alert("Please sign in first.");
      signIn("google");
    } else {
      setIsLoading(true);
      const fileUrl = url;
      const fileTitle = `${fileName}.pdf`;

      try {
        const response = await fetch(fileUrl);

        if (!response.body) {
          throw new Error('ReadableStream not yet supported in this browser.');
        }

        const reader = response.body.getReader();
        const contentLengthHeader = response.headers.get('Content-Length');
        const contentLength = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;
        
        let receivedLength = 0;
        const chunks = [];
        while(true) {
          const {done, value} = await reader.read();
          if (done) break;
          
          chunks.push(value);
          receivedLength += value.length;
          
          setProgress(Math.round((receivedLength / contentLength) * 100));
        }
        
        const blob = new Blob(chunks);
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileTitle);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Failed to download file', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      {!isLoading ? (
        <button
          type="button"
          className="flex items-center justify-center p-1 hover:text-gray-400 border border-gray-600 rounded-md"
          onClick={downloadFile}
        >
          <ArrowDownTrayIcon className="h-6 mx-2 text-gray-300 hover:text-gray-400" />
        </button>
      ) : (
        <div className="flex items-center justify-center">
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-5 h-5 me-3 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          <div className="text-gray-300">
            {progress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfDownloadButtonWithPercentage;



// import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
// import { getSession, signIn } from 'next-auth/react';
// import React, { useState } from 'react';

// const PdfDownloadButton = ({ url, fileName }: { url: string, fileName: string }) => {
//     const [isLoading, setIsLoading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const downloadFile = async () => {
//     const session = await getSession();

//     if (!session) {
//       alert("Please sign in first.");
//       signIn("google");
//     } else {
//       setIsLoading(true);
//       const fileUrl = url;
//       const fileTitle = `${fileName}.pdf`;

//       try {
//         const response = await fetch(fileUrl);
//         (fileUrl);

//         if (!response.body) {
//           throw new Error('ReadableStream not yet supported in this browser.');
//         }

//         const reader = response.body.getReader();
//         const contentLength = +response.headers.get('Content-Length') || 0;
        
//         let receivedLength = 0;
//         const chunks = [];
//         while(true) {
//           const {done, value} = await reader.read();
//           if (done) break;
          
//           chunks.push(value);
//           receivedLength += value.length;
          
//           setProgress(Math.round((receivedLength / contentLength) * 100));
//         }
        
//         const blob = new Blob(chunks);
//         const url = window.URL.createObjectURL(blob);

//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', fileTitle);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
//       } catch (error) {
//         console.error('Failed to download file', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center ">
//       {!isLoading ? (
//         <button
//           type="button"
//           className="flex items-center justify-center p-1 hover:text-gray-400 border border-gray-600 rounded-md"
//           onClick={downloadFile}
//         >
//           <ArrowDownTrayIcon className="h-6 mx-2 text-gray-300 hover:text-gray-400" />
//         </button>
//       ) : (
//         <div className="flex items-center justify-center">
//           <svg
//             aria-hidden="true"
//             role="status"
//             className="inline w-5 h-5 me-3 text-gray-200 animate-spin dark:text-gray-600"
//             viewBox="0 0 100 101"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//               fill="currentColor"
//             />
//             <path
//               d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//               fill="#1C64F2"
//             />
//           </svg>
//           <div className="text-gray-300">
//             {progress}%
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PdfDownloadButtonWithPercentage;
