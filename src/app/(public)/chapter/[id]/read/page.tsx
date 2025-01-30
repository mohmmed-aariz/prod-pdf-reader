import CombinedDisplay from "@/app/ui/chapter/read/CombinedDisplay";
import { fetchUserContentUrl } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params; 
    // fetch pdfPagesUrl from id and here we get array of url, 
    // fetch pdf url for download

    const documentData = await fetchUserContentUrl(id);
    // console.log("Document data is : ", documentData);
    // console.log("Document title is : ", documentData?.title);


    if(!documentData){
        notFound();
    }

    return (
        <div >
            {/* Hello from /chapter/[id]/page */}
            <CombinedDisplay pdfAppUrl={documentData.pdfAppUrl} pdfPagesUrl={documentData.pdfPagesUrl} totalPages={documentData.totalPages} title={documentData.title}/>
        </div>
    )
}