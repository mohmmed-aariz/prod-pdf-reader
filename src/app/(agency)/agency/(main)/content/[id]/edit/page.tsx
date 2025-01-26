import Breadcrumbs from "@/app/ui/agency/breadcrumbs";
import EditDocumentForm from "@/app/ui/agency/content/edit-form";
import { fetchDocumentById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    // const id = params.id;
    const { id } = await params;

    // const [document] = await Promise.all()
    const documentData = await fetchDocumentById(id);

    if(!documentData){
        notFound();
    }

    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: 'Content', href: '/agency/content'},
                {label: 'Edit Content', href: `/agency/content/${id}/edit`, active: true}
            ]} />

            <EditDocumentForm document={documentData} />
        </main>
    )
}