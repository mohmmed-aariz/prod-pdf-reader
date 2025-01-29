import LandingPageLeft from "@/app/ui/user/landingPageLeft";
import LandingPageRight from "@/app/ui/user/landingPageRight";

export default async function Page() {
    return (
      <div className="flex justify-center bg-blue-200 w-full min-h-full">
      {/* // <div className="h-screen flex justify-center bg-blue-200 fixed w-full"> */}
        <div className="flex flex-col sm:flex-row w-full h-full xl:w-4/5 transition-all duration-500 ">
        {/* <div className="flex flex-col sm:flex-row w-full h-full xl:w-3/5 transition-all duration-500"> */}

          <div className="h-full w-full sm:w-1/3 border border-black">
            <LandingPageLeft />
          </div>
          
          <div className="h-full w-full sm:w-2/3 bg-slate-200 border border-black">
            <LandingPageRight />
          </div>
        </div>
      </div>

    );
  }
  

// export default function Page(){
//     return (
//         <div className="h-screen flex justify-center bg-blue-400">
//             {/* <h1>User Page</h1> */}
//             <div className="sm:flex w-full h-full sm:w-4/5">
//                 <div className="h-1/3 sm:h-full w-full sm:w-1/3 bg-slate-400	 ">Left</div>
//                 <div className="h-2/3 sm:h-full w-full sm:w-2/3 bg-slate-100">Right</div>
//             </div>
//         </div>
//     )
// }