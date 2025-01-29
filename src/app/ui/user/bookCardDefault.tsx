import Image from "next/image";
import BookImageCard from "./bookImageCard";

export default function BookCardDefault(){
    return (
        <div className="transition delay-300 duration-500 ease-out relative flex flex-row  justify-start rounded-xl bg-gray-50   shadow-sm overflow-hidden my-2 hover:bg-black">
        {/* <Image 
            // className="mr-2 rounded-md w-[100px] xl:w-[150px] h-[auto] transition-all duration-700"            // src='/image.png'
            className="mr-2 rounded-md w-[100px]  h-[auto]"
            src='/landingPage.jpg'
            alt={"img"} 
            width={150} 
            height={100} 
            // style={{height: '125px', width: 'auto'}}
            // style={{width: '150px', height: 'auto'}}
            priority={true} />  */}
        
        <BookImageCard />
        <div className="ml-4 border-b border-gray-300 flex  flex-col justify-center  ">
            <h2 className="text-xl font-semibold">Product Name .</h2>
            {/* <p className="mt-2 text-gray-600 text-sm w-11/12 ">This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.</p> */}
            <p className="mt-2 text-gray-600 text-sm w-5/6 line-clamp-2 ">This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.This is the description of the product. It provides an overview of the key features and benefits of the product.</p>

        </div>
        </div>
    )
}
