import Breadcrumbs from "@/app/ui/agency/breadcrumbs";
import ClientUploadForm from "@/app/ui/agency/content/createClientUploadForm";
import Form from "@/app/ui/agency/content/createForm";
import Server from "@/app/ui/agency/content/upform";

export default async function Page(){
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                { label: "Content", href: '/agency/content'},
                { label: "Add Content", href: "/agency/content/create", active: true},
            ]} />
            {/* <Form /> */}
            <ClientUploadForm />
            {/* <Server /> */}
        </main>
    )
}