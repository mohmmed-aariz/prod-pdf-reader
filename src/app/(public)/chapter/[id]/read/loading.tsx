import { ArrowDownTrayIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";

export default function Loading() {
    return <div>
      <AppbarLoading />
          
      Loading...
      </div>;
  }

  export function AppbarLoading() {
    return (
      <div>
        <div className="flex justify-between items-center  px-4  h-14 backdrop-brightness-50 text-white">
          {/* <Link
            href={"/user"}
            className="text-lg flex items-center justify-center border border-red-300"
          >
            Logo
          </Link> */}
    
          <div className="flex w-full items-center justify-center  text-gray-300">
            <div className="flex gap-2  justify-center items-center">
              <MagnifyingGlassMinusIcon
                  className="h-6 pr-4 mx-2 text-gray-300 hover:text-gray-400 border-r-2 border-gray-600"
                  // onClick={() => {
                  // num < 7 && setNum(num + 1);
                  // }}
              />
    
              <div className="border border-gray-700 px-4 py-2 rounded-sm">
                {/* {100 - 10 * num} */}
                00
              </div>
    
              <MagnifyingGlassPlusIcon
                className="h-6 mx-2 text-gray-300 hover:text-gray-400 pl-4 border-l-2 border-gray-600"
                // onClick={() => {
                //   num > 1 && setNum(num - 1);
                // }}
              />
              
                {/* <div className="invisible sm:visible" > */}
    
                <button
            type="button"
            className="flex items-center justify-center p-1 hover:text-gray-400 border border-gray-600 rounded-md"
            // onClick={()=>{downloadFile()}}
          >
            <ArrowDownTrayIcon className="h-6 mx-2 text-gray-300 hover:text-gray-400" />
          </button>              {/* </div> */}
                </div>
          </div>
    
          {/* <div className="flex flex-col items-center justify-center pt-2 border border-red-300">
            <button>Sign in</button>
          </div> */}
        </div>
        {/* <div className=" flex justify-center animate-pulse">
          <div className="w-[80%] h-screen border border-black"></div>
        </div> */}
      </div>
    );
  }
  