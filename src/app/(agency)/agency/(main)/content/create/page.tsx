import Breadcrumbs from "@/app/ui/agency/breadcrumbs";

export default async function Page(){
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                { label: "Content", href: '/agency/content'},
                { label: "Add Content", href: "/agency/content/create", active: true},
            ]} />

        </main>
    )
}