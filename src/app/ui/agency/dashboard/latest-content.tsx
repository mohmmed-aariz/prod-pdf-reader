import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestDashboardContent } from '@/lib/data';
import BookImageCard from '../../user/bookImageCard';

// export default async function latestDocContent({
//   latestDocContent,
// }: {
//   latestDocContent: Latestdocument[];
// }) {
export default async function LatestDashboardContent() {
  const latestDocContent = await fetchLatestDashboardContent();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Magazines
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {latestDocContent.map((document, i) => {
            return (
              <div
                key={document.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className='flex flex-row justify-start items-center gap-4'>

                {/* <div className="relative h-40 w-28 flex items-center border-2 border-black"> */}
                <div className="relative h-40 w-28 flex items-center ">
                  {document.coverImageUrl ? (
                    <Image
                      src={document.coverImageUrl || ""}
                      alt={`${document.title}'s profile picture`}
                      className="mr-4 rounded-md object-contain"
                      // height={64}
                      // width={64}
                      fill
                      sizes='(max-width: 768px) 100vw, 700px'
                      priority
                      // style={{ width: 'auto', height: 'auto' }}
                      // width={64}
                      // height={64}
                    />
                  ): (
                      <BookImageCard createdAt={document.createdAt}/>
                    
                  )}
                  
                </div>
                  <div className="flex flex-col gap-4">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {document.title}
                    </p>
                    <div className='flex flex-col gap-1'>
                        <p className="hidden text-sm text-gray-500 sm:block">
                        Pages:{" "}{document.totalPages}
                        </p>
                        <p className="hidden text-sm text-gray-500 sm:block">
                        Date:{" "}{document.createdAt.toLocaleDateString()}
                        </p>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col justify-end items-end'>
                    <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                        <span className='text-gray-600'>Total Visits: {"  "}</span>
                        {document.viewCount?.viewCount || 0}
                    </p>
                    <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                        <span className='text-gray-600'>Signed Up Visits: {"  "}</span>

                        {document._count.viewHistory || 0}
                    </p>

                </div>

              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
