import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options";
import { LatestContentSkeleton } from "@/app/ui/agency/dashboard/skeletons";
import { SubscribersTableSkeleton } from "@/app/ui/agency/subscribers/skeletons";
import { CardSkeleton, DisplayContentSkeleton, LeftLandingPageSkeleton, TitleSkeleton } from "@/app/ui/skeletons";
import { getServerSession } from "next-auth";
// import { getToken } from "next-auth/jwt";

export default async function Page(){
    const session = getServerSession(NEXT_AUTH);
    console.log(session);
    return (
        <div className="flex flex-col">
            <pre>{JSON.stringify(session)}</pre>
            {/* <CardSkeleton /> */}
            {/* <TitleSkeleton />
            <DisplayContentSkeleton />
            <DisplayContentSkeleton />
            <DisplayContentSkeleton /> */}
            {/* <LeftLandingPageSkeleton /> */}

            {/* <DisplayContentSkeleton /> */}

            {/* <LatestContentSkeleton /> */}

            <SubscribersTableSkeleton />
            
        </div>
    )
}