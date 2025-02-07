import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options";
import CombinedDisplay from "@/app/ui/chapter/read/CombinedDisplay";
import { fetchUserContentUrl, incrementViewCount, recordView } from "@/lib/data";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; 
    // fetch pdfPagesUrl from id and here we get array of url, 
    // fetch pdf url for download

    const session = await getServerSession(NEXT_AUTH);
    if(session){
        await recordView(session.user.id, id);
    } else {
        await incrementViewCount(id);
    }
    // else if the user is not logged in, it's view will not be count.

    const documentData = await fetchUserContentUrl(id);
    // console.log("Document data is : ", documentData);
    // console.log("Document title is : ", documentData?.title);


    if(!documentData){
        notFound();
    }

    return (
        <div >
            {/* Hello from /chapter/[id]/page */}
            <CombinedDisplay pdfAppUrl={documentData.pdfAppUrl} pdfPagesUrl={documentData.pdfPagesUrl} totalPages={documentData.totalPages} title={documentData.title} fileId={id}/>
        </div>
    )
}