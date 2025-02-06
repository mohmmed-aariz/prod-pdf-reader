import { fetchFilteredSubscribers } from "@/lib/data";
import { formatDateToLocal } from "@/lib/utils";
import { DeleteSubscriberButton } from "./buttons";

export default async function SubscribersTable({
    query,
    currentPage,
}:{
    query: string;
    currentPage: number;
}){
    const subscribers = await fetchFilteredSubscribers(query, currentPage);
    console.log(subscribers);

    return (
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              {/* <div className="md:hidden">
                {invoices?.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <Image
                            src={invoice.image_url}
                            className="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={`${invoice.name}'s profile picture`}
                          />
                          <p>{invoice.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{invoice.email}</p>
                      </div>
                      <InvoiceStatus status={invoice.status} />
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div>
                        <p className="text-xl font-medium">
                          {formatCurrency(invoice.amount)}
                        </p>
                        <p>{formatDateToLocal(invoice.date)}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <UpdateInvoice id={invoice.id} />
                        <DeleteInvoice id={invoice.id} />
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total View Count
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Joining Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Role
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {subscribers?.map((subscriber) => (
                    <tr
                      key={subscriber.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          {/* <Image
                            src={subscriber.image}
                            className="rounded-full"
                            width={28}
                            height={28}
                            alt={`${subscriber.name}'s profile picture`}
                          /> */}
                          <p>{subscriber.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {subscriber.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {subscriber._count.viewHistory}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {formatDateToLocal(subscriber.createdAt.toDateString())}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {subscriber.role}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          {/* <Updatesubscriber id={subscriber.id} /> */}
                          <DeleteSubscriberButton id={subscriber.id} role={subscriber.role} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
}

// let a = [
//     {
//         "id": "cm6qrxb770000l803xj9g7391",
//         "name": "agency",
//         "email": null,
//         "image": null,
//         "role": "AGENCY_USER",
//         "createdAt": "2025-02-04T17:48:48.499Z",
//         "viewHistory": [
//             {
//                 "documentId": "8a2f22ee-5f95-49e0-b97a-b3d647f92388",
//                 "viewedAt": "2025-02-05T19:08:00.124Z",
//                 "pdfDocument": {
//                     "title": "MOOC 3"
//                 }
//             },
//             {
//                 "documentId": "8a2f22ee-5f95-49e0-b97a-b3d647f92388",
//                 "viewedAt": "2025-02-05T19:11:39.808Z",
//                 "pdfDocument": {
//                     "title": "MOOC 3"
//                 }
//             },
//             {
//                 "documentId": "8a2f22ee-5f95-49e0-b97a-b3d647f92388",
//                 "viewedAt": "2025-02-05T19:11:39.825Z",
//                 "pdfDocument": {
//                     "title": "MOOC 3"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-05T19:33:12.347Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-05T19:33:57.729Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-05T19:39:17.317Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             }
//         ],
//         "_count": {
//             "viewHistory": 6
//         }
//     },


//     {
//         "id": "cm6ownrfl0000l103t7hr7aie",
//         "name": "MOHMMED AARIZ",
//         "email": "mohmmed.21it444@rtu.ac.in",
//         "image": "https://lh3.googleusercontent.com/a/ACg8ocLlmGMBVDRjx2ejGUfjjFZ2KpKMJTRwGWnAEIAWqp2sSDQiNw=s96-c",
//         "role": "USER",
//         "createdAt": "2025-02-03T10:25:48.705Z",
//         "viewHistory": [
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-03T10:25:53.199Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-03T10:27:32.117Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             }
//         ],
//         "_count": {
//             "viewHistory": 2
//         }
//     },
//     {
//         "id": "cm6m52c930001v5q4medtj7wt",
//         "name": "Aariz",
//         "email": null,
//         "image": null,
//         "role": "AGENCY_USER",
//         "createdAt": "2025-02-01T11:57:47.271Z",
//         "viewHistory": [
//             {
//                 "documentId": "9b0f66bb-a406-443d-a4ca-9b9ea26f269a",
//                 "viewedAt": "2025-02-01T12:01:07.527Z",
//                 "pdfDocument": {
//                     "title": "December 2024 Edition"
//                 }
//             },
//             {
//                 "documentId": "9b0f66bb-a406-443d-a4ca-9b9ea26f269a",
//                 "viewedAt": "2025-02-01T12:01:25.800Z",
//                 "pdfDocument": {
//                     "title": "December 2024 Edition"
//                 }
//             }
//         ],
//         "_count": {
//             "viewHistory": 2
//         }
//     },


//     {
//         "id": "cm6m4roew0000v5q4y3pft37b",
//         "name": "Mohmmed Aariz",
//         "email": "mohmmed.ariz786@gmail.com",
//         "image": "https://lh3.googleusercontent.com/a/ACg8ocIQfqeNgvUP-ykaEO1WdY_6gZn7PYi1rXEBr9b-HhsZK535JA=s96-c",
//         "role": "USER",
//         "createdAt": "2025-02-01T11:49:29.816Z",
//         "viewHistory": [
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T18:32:13.816Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-03T15:38:09.419Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-03T15:38:11.522Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-03T15:38:29.423Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-04T14:50:22.026Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-04T14:51:11.186Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             }
//         ],
//         "_count": {
//             "viewHistory": 6
//         }
//     },


//     {
//         "id": "cm6m0soft0000v5b0w5tmcws6",
//         "name": "Mohmmed Aariz",
//         "email": null,
//         "image": null,
//         "role": "AGENCY_USER",
//         "createdAt": "2025-02-01T09:58:18.041Z",
//         "viewHistory": [
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:32:09.062Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:35:18.179Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:35:48.706Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:36:04.794Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:36:57.001Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:37:00.886Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:37:06.593Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:37:12.498Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:37:15.379Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:37:24.085Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:37:40.118Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:37:46.515Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:37:54.630Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:37:58.647Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:40:27.422Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:40:33.317Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:40:40.020Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:40:49.362Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:40:54.032Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:41:42.133Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:47:59.548Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:48:19.082Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:52:32.451Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:52:57.127Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T15:53:25.274Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T16:05:45.051Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T16:06:06.965Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T16:08:30.492Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T16:10:10.339Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T16:10:20.256Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T16:10:22.822Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T16:12:20.057Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "fc400e5a-ccd1-4fb1-a00f-fd1fe3e09732",
//                 "viewedAt": "2025-02-01T16:12:24.840Z",
//                 "pdfDocument": {
//                     "title": "January 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "37088334-fa1c-4145-8841-90a723e800cc",
//                 "viewedAt": "2025-02-02T14:28:28.914Z",
//                 "pdfDocument": {
//                     "title": "December 1111"
//                 }
//             },
//             {
//                 "documentId": "37088334-fa1c-4145-8841-90a723e800cc",
//                 "viewedAt": "2025-02-02T14:28:31.145Z",
//                 "pdfDocument": {
//                     "title": "December 1111"
//                 }
//             },
//             {
//                 "documentId": "37088334-fa1c-4145-8841-90a723e800cc",
//                 "viewedAt": "2025-02-02T14:28:59.684Z",
//                 "pdfDocument": {
//                     "title": "December 1111"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T14:46:28.119Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T14:49:37.621Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T14:51:02.337Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T14:52:46.050Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T14:55:35.626Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T14:56:49.838Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T14:58:30.932Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T14:58:33.544Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T14:58:45.057Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T14:59:20.404Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:01:45.045Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:01:45.045Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:01:53.105Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:01:53.360Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:01:56.271Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:01:56.400Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:02:44.826Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:02:44.965Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:03:59.746Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:04:00.983Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:04:06.296Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:04:06.437Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:04:08.423Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:04:08.577Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:04:31.157Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             },
//             {
//                 "documentId": "2489cb17-7f9d-4167-85b3-f9cc8be07d91",
//                 "viewedAt": "2025-02-02T15:04:31.303Z",
//                 "pdfDocument": {
//                     "title": "February 2025 Edition"
//                 }
//             }
//         ],
//         "_count": {
//             "viewHistory": 62
//         }
//     }
// ]

// let b = [
//     {
//         "id": "cm6qrxb770000l803xj9g7391",
//         "name": "agency",
//         "email": null,
//         "image": null,
//         "role": "AGENCY_USER",
//         "createdAt": "2025-02-04T17:48:48.499Z",
//         "_count": {
//             "viewHistory": 6
//         }
//     },
//     {
//         "id": "cm6ownrfl0000l103t7hr7aie",
//         "name": "MOHMMED AARIZ",
//         "email": "mohmmed.21it444@rtu.ac.in",
//         "image": "https://lh3.googleusercontent.com/a/ACg8ocLlmGMBVDRjx2ejGUfjjFZ2KpKMJTRwGWnAEIAWqp2sSDQiNw=s96-c",
//         "role": "USER",
//         "createdAt": "2025-02-03T10:25:48.705Z",
//         "_count": {
//             "viewHistory": 2
//         }
//     },
//     {
//         "id": "cm6m52c930001v5q4medtj7wt",
//         "name": "Aariz",
//         "email": null,
//         "image": null,
//         "role": "AGENCY_USER",
//         "createdAt": "2025-02-01T11:57:47.271Z",
//         "_count": {
//             "viewHistory": 2
//         }
//     },
//     {
//         "id": "cm6m4roew0000v5q4y3pft37b",
//         "name": "Mohmmed Aariz",
//         "email": "mohmmed.ariz786@gmail.com",
//         "image": "https://lh3.googleusercontent.com/a/ACg8ocIQfqeNgvUP-ykaEO1WdY_6gZn7PYi1rXEBr9b-HhsZK535JA=s96-c",
//         "role": "USER",
//         "createdAt": "2025-02-01T11:49:29.816Z",
//         "_count": {
//             "viewHistory": 6
//         }
//     },
//     {
//         "id": "cm6m0soft0000v5b0w5tmcws6",
//         "name": "Mohmmed Aariz",
//         "email": null,
//         "image": null,
//         "role": "AGENCY_USER",
//         "createdAt": "2025-02-01T09:58:18.041Z",
//         "_count": {
//             "viewHistory": 62
//         }
//     }
// ]