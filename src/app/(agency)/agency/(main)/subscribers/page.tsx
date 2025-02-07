import Pagination from "@/app/ui/agency/pagination";
import Search from "@/app/ui/agency/search";
import { SubscribersTableSkeleton } from "@/app/ui/agency/subscribers/skeletons";
import SubscribersTable from "@/app/ui/agency/subscribers/table";
import { lusitana } from "@/app/ui/fonts";
import {  fetchSubscriberPages } from "@/lib/data";
import { Suspense } from "react";


  

export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }){
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchSubscriberPages(query);


    return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Subscribers Page</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        {/* <CreateInvoice /> */}
        </div>
        <Suspense key={query + currentPage} fallback={<SubscribersTableSkeleton />}>
        <SubscribersTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
        </div>
    </div>
    );
}