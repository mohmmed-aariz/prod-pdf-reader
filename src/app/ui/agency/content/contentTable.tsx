
import Image from "next/image";
import ContentStatus from "./contentStatus";
import { formatDateToLocal } from "@/lib/utils";
import { fetchFilteredContent } from "@/lib/data";
import { DeleteContent, UpdateContent } from "./buttons";

export default async function ContentTable({
    query,
    currentPage
}: {
    query: string,
    currentPage: number
}) {
    const contentData = await fetchFilteredContent(query, currentPage);
    const defaultImageUrl = '/architect.jpg'
    
    return (
        <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {contentData?.map((content) => (
              <div
                key={content.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={content.coverImageUrl || defaultImageUrl}
                        layout="responsive" 
                        className="mr-2 rounded-full"
                        width={56}
                        height={56}
                        alt={`${content.title}'s profile picture`}
                      /> */}
                      <p>{content.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{content.author?.user.name || ''}</p>
                  </div>
                  <ContentStatus status={content.hide} />
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    
                    <p>{formatDateToLocal((content.createdAt).toDateString())}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <Updatecontent id={content.id} />
                    <Deletecontent id={content.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email / UploadedBy
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  TotalPages
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Upload Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {contentData?.map((content) => (
                <tr
                  key={content.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={content.coverImageUrl || defaultImageUrl}
                        className="rounded-full"
                        layout="responsive" 
                        width={28}
                        height={28}
                        alt={`${content.title}'s profile picture`}
                      /> */}
                      <p>{content.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {content.author?.user.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* {formatCurrency(content.amount)} */}
                    {content.totalPages}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal((content.createdAt).toDateString())}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ContentStatus status={content.hide} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateContent id={content.id} />
                      <DeleteContent id={content.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
}