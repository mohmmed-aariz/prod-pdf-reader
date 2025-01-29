import Image from "next/image";

export default function ImageCardComp(){
    return   <div className="max-w-full bg-white  flex flex-row  h-full w-full my-2 overflow-hidden ">
    {/* <div className="max-w-full bg-white shadow-md rounded-lg flex flex-row  h-full w-full my-2 overflow-hidden "> */}
        <div className="relative h-32 w-32 flex-shrink-0 border border-black rounded-lg overflow-hidden ">
            <Image className="" 
            // src="/architect.jpg" 
            src="/landingPage.jpg"
            // src='/image.png'
            alt="Product Image" 
            // height={48} width={48} 
            fill
            // objectFit="cover"
            objectFit="contain"
            />
        </div>
        <div className="ml-4 border-b border-gray-300 flex  flex-col justify-center  ">
            <h2 className="text-xl font-semibold">Product Name</h2>
            {/* <p className="mt-2 text-gray-600 text-sm w-11/12 ">This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.</p> */}
            <p className="mt-2 text-gray-600 text-sm w-11/12 line-clamp-2 ">This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.</p>

        </div>
    </div>
    
}

// export default function ImageCardComp(){
//     return    <div className="flex flex-col justify-center h-full">
//         <div
//             className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
//             <div className="w-full md:w-1/3 bg-white grid place-items-center">
//                 <img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="tailwind logo" className="rounded-xl" />
//         </div>
//                 <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                    
//                     <h3 className="font-black text-gray-800 md:text-3xl text-xl">The Majestic and Wonderful Bahamas</h3>
//                     <p className="md:text-lg text-gray-500 text-base">The best kept secret of The Bahamas is the country’s sheer
//                         size and diversity. With 16 major islands, The Bahamas is an unmatched destination</p>
                    
//                 </div>
//             </div>
//         </div>
// }