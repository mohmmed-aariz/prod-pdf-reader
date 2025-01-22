export default function ContentDisplay(){
    return <>
        <div className="flex flex-col justify-center h-full">

        {/* <div className="flex flex-col justify-center h-screen"> */}
            <div
                className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                <div className="w-full md:w-1/3 bg-white grid place-items-center">
                    <img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="tailwind logo" className="rounded-xl" />
            </div>
                    <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                        {/* <div className="flex justify-between item-center">
                            <p className="text-gray-500 font-medium hidden md:block">Vacations</p>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <p className="text-gray-600 font-bold text-sm ml-1">
                                    4.96
                                    <span className="text-gray-500 font-normal">(76 reviews)</span>
                                </p>
                            </div>
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                                Superhost</div>
                        </div> */}
                        <h3 className="font-black text-gray-800 md:text-3xl text-xl">The Majestic and Wonderful Bahamas</h3>
                        <p className="md:text-lg text-gray-500 text-base">The best kept secret of The Bahamas is the country’s sheer
                            size and diversity. With 16 major islands, The Bahamas is an unmatched destination</p>
                        {/* <p className="text-xl font-black text-gray-800">
                            $110
                            <span className="font-normal text-gray-600 text-base">/night</span>
                        </p> */}
                    </div>
                </div>
            </div>
    </>
}

// import Image from 'next/image';

// export default function ContentDisplay() {
//     return (
//         <div className='flex items-center my-4 border border-black w-full h-28'>
//             <div className='w-full h-full border border-blue-500 '>
//                 <Image 
//                     src={"/architect.jpg"}
//                     // src={"/landingPage.jpg"}
//                     alt={'abc'}
//                     className='rounded-md border border-red-800'
//                     width={150}
//                     height={150}
                    
//                 />
//             </div>
//             <div className='mx-4 flex flex-col justify-between border border-black h-full w-full '>
//                 <p className='truncate text-sm font-semibold md:text-base py-2'>Chapter </p>
//                 <p className='text-sm text-gray-500'>Descreption</p>
//             </div>
//         </div>
//     );
// }


// import Image from 'next/image';

// export default function ContentDisplay() {
//     return (
//         <div className="flex border border-black w-full h-36">
//             <div className="relative flex items-center justify-center w-1/3 h-full">
//                 <div className="relative w-full h-full border border-blue-700">
//                     <Image
//                         src="/architect.jpg"
//                         alt="something"
//                         layout="fill"
//                         objectFit="contain"
//                         className="absolute top-0 left-0 w-full h-full"
//                     />
//                 </div>
//             </div>
//             <div className="flex items-center justify-center w-2/3">
//                 <span>Hello</span>
//             </div>
//         </div>
//     );
// }


// // // import Image from 'next/image';

// // // export default function ContentDisplay() {
// // //     return (
// // //         <div className='flex border border-black w-full h-36'>
// // //             {/* <div className="relative w-full pb-[141.44%]"> */}
// // //             <div className="relative w-1/3 pb-[141.44%] ">
// // //                 <Image
// // //                     src={'/landingPage.jpg'}
// // //                     alt={"something"}
// // //                     layout="fill"
// // //                     objectFit="contain"
// // //                     className="absolute top-0 left-0 w-full h-full"
// // //                 />
// // //             </div>
// // //             <div>hello</div>
// // //         </div>
// // //     );
// // // }


// // // import Image from 'next/image';

// // // export default function ContentDisplay() {
// // //     return (
// // //         <div className="flex flex-row items-center space-x-4 p-2  w-full border border-black">
// // //             {/* <div className="border-2 border-red-500 relative"> */}
// // //                 <div className="relative w-36 h-96">
// // //                     <Image
// // //                         alt="/landingPage.jpg"
// // //                         src="/landingPage.jpg"
// // //                         layout="fill"
// // //                         priority
// // //                         className="object-contain"
// // //                     />
// // //                 </div>
// // //             {/* </div> */}
// // //             <div className="text-lg font-semibold">Image Name</div>
// // //         </div>
// // //     );
// // // }



// // // import landingPage from "@/../../public/landingPage.jpg"
// // // import Image from "next/image"

// // // export default function ContentDisplay() {
// // //     return (
// // //         <div className="flex flex-row items-center space-x-4 p-2 h-full w-full border border-black">
// // //             <div className=" border-2 border-red-500   relative">
// // //                 <Image
// // //                     alt="img" 
// // //                     src="/landingPage.jpg"
// // //                     fill
// // //                     priority
// // //                     className="w-full h-full object-contain	"

// // //                     />

// // //             </div>
// // //             <div className="text-lg font-semibold">Image Name</div>
// // //         </div>
// // //     );
// // // }


// // import Image from 'next/image';

// // export default function ContentDisplay() {
// //     return (
// //         <div className="flex w-full h-36 border border-black my-4">
// //             <div className="relative flex-shrink-0 w-1/3 h-full">
// //                 <Image
// //                     src="/landingPage.jpg"
// //                     alt="something"
// //                     layout="fill"
// //                     objectFit="contain"
// //                     className="absolute top-0 left-0 w-full h-full"
// //                 />
// //             </div>
// //             <div className="flex items-center justify-center w-2/3">
// //                 Hello
// //             </div>
// //         </div>
// //     );
// // }

// // // import Image from 'next/image';

// // // export default function ContentDisplay() {
// // //     return (
// // //         <div className='flex w-full h-36'>
// // //             <div className="relative w-full pb-[141.44%]">
// // //                 <Image
// // //                     src={'/landingPage.jpg'}
// // //                     alt={"something"}
// // //                     layout="fill"
// // //                     objectFit="contain"
// // //                     className="absolute top-0 left-0 w-full h-full"
// // //                 />
// // //             </div>
// // //             <div>hello</div>
// // //         </div>
// // //     );
// // // }


// // // import Image from 'next/image';

// // // export default function ContentDisplay() {
// // //     return (
// // //         <div className="flex flex-row items-center space-x-4 p-2  w-full border border-black">
// // //             {/* <div className="border-2 border-red-500 relative"> */}
// // //                 <div className="relative w-36 h-96">
// // //                     <Image
// // //                         alt="/landingPage.jpg"
// // //                         src="/landingPage.jpg"
// // //                         layout="fill"
// // //                         priority
// // //                         className="object-contain"
// // //                     />
// // //                 </div>
// // //             {/* </div> */}
// // //             <div className="text-lg font-semibold">Image Name</div>
// // //         </div>
// // //     );
// // // }



// // // import landingPage from "@/../../public/landingPage.jpg"
// // // import Image from "next/image"

// // // export default function ContentDisplay() {
// // //     return (
// // //         <div className="flex flex-row items-center space-x-4 p-2 h-full w-full border border-black">
// // //             <div className=" border-2 border-red-500   relative">
// // //                 <Image
// // //                     alt="img" 
// // //                     src="/landingPage.jpg"
// // //                     fill
// // //                     priority
// // //                     className="w-full h-full object-contain	"

// // //                     />

// // //             </div>
// // //             <div className="text-lg font-semibold">Image Name</div>
// // //         </div>
// // //     );
// // // }
