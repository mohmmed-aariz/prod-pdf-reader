import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options"
import { Appbar } from "@/app/ui/agency/Appbar"
import CardWrapper from "@/app/ui/agency/dashboard/cards"
import LatestDashboardContent from "@/app/ui/agency/dashboard/latest-content"
import { CardsSkeleton, LatestContentSkeleton } from "@/app/ui/agency/dashboard/skeletons"
import { lusitana } from "@/app/ui/fonts"
import { getServerSession } from "next-auth"
import { stringify } from "querystring"
import { Suspense } from "react"


export default async function Page(){
    const session = await getServerSession(NEXT_AUTH);
    return (
        <div className="">
            <h1 className={`${lusitana.className} px-1 pt-2 mb-4 text-xl md:text-2xl pb-2 border-b-2 bg-gray-50 border-gray-200 text-gray-800 rounded-md`}>
                Hello, {session?.user.name}
            </h1>
            {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-4  "> */}
                {/* <Appbar /> */}
                {/* {JSON.stringify(session?.user)} */}
            {/* </div> */}
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>

            {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"> */}
            <div className="mt-6 grid grid-cols-1 gap-6 ">
        {/* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense> */}
            <Suspense fallback={<LatestContentSkeleton />}>
            <LatestDashboardContent />
        </Suspense>
      </div>

            {/* <Appbar /> */}
        </div>
    )
}