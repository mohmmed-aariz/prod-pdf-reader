// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export function CardSkeleton() {
return (
    <div
    className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
    <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
    </div>
    <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
    </div>
    </div>
);
}

export function LeftLandingPageSkeleton(){
    return (
        <div className="flex justify-center">
            <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 w-11/12  shadow-sm`} >
                <div className="mr-2 h-[40%] min-h-[400px] w-full rounded-xl bg-gray-200" />
                <div className="mt-2 h-8  max-w-full rounded-md bg-gray-200" />

                
            </div>
        </div>
    );
}

export function TitleSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 w-11/12  shadow-sm`} >
            <div className="ml-4 flex flex-col gap-3 justify-center min-w-0 w-full h-full">
                <div className="mb-2 h-6  max-w-[20%] rounded-md bg-gray-200" />
                <div className="  h-3  w-[75%] rounded-md bg-gray-200" />
                <div className="h-3 w-[75%] rounded-md bg-gray-200" />
                <div className="h-3 w-[60%] rounded-md bg-gray-200" />

            </div>
        </div>
    );
    }



export function BookCardSkeleton() {
    return (
      <div className={`${shimmer} relative my-2 flex flex-row items-center justify-between border-2 border-gray-100 rounded-xl `}>
        <div className="w-full h-full flex items-center">

          <div className="mr-2 min-h-[141.5px] min-w-[100px] rounded-xl bg-gray-200" />

          <div className="ml-4 flex flex-col gap-3 justify-center min-w-0 w-full h-full">
            <div className="mb-2 h-6  max-w-[20%] rounded-md bg-gray-200" />
            <div className="  h-3  w-[75%] rounded-md bg-gray-200" />
            <div className="h-3 w-[60%] rounded-md bg-gray-200" />
          </div>

        </div>
        {/* <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" /> */}
      </div>
    );
  }

export function DisplayContentSkeleton(){
    return (
        <div className="overflow-hidden">
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
        </div>
    )
}