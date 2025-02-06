import { fetchUserContent } from "@/lib/data"
import BookCard from "./bookCard";

export default async function DisplayContent(){
    const contentToDisplay = await fetchUserContent('', 1);
    // console.log(contentToDisplay);
    return <div className="w-full h-full ">
                {/* <div className="flex flex-row justify-center">
                    Hello world
                </div> */}
                {contentToDisplay.length > 0 ? (
                    <div>
                        {contentToDisplay.map((document, index) => (
                            <div key={index} className=""> {/* Add margin-y to separate the documents */}
                                <BookCard id={document.id} title={document.title} description={document.description || ""} coverImageUrl={document.coverImageUrl || ""} createdAt={document.createdAt} pdfAppUrl={document.pdfAppUrl} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
}

// [
//     {
//       id: '553fca97-1cea-4661-b190-d205fb15a7ec',
//       title: 'December',
//       description: '',
//       coverImageUrl: 'https://utfs.io/f/hZVG1XIiCNlAtC1wWtecHfM5l3jbuIKxq4onzTh8Ry67ZvLw',
//       createdAt: 2025-01-26T21:10:27.496Z
//     },
//     {
//       id: '6e294e2c-2fae-4875-824a-07dfb2cef36c',
//       title: 'December Edition',
//       description: '',
//       coverImageUrl: 'https://utfs.io/f/hZVG1XIiCNlATopO8iOZP8rndD60aYu9mCQ5FSzsqXwoVAfR',
//       createdAt: 2025-01-26T20:35:51.597Z
//     }
//   ]