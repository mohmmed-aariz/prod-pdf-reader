// import ContentDisplay from "./contentDisplay";
// import ImageCardComp from "./imageCardComp";
import BookCard from "./bookCard";
import BookCardDefault from "./bookCardDefault";
import DisplayContent from "./DisplayContent";
import Title from "./landingPageTitle";

export default function LandingPageRight(){


    return <div className="flex flex-col h-full w-full px-4 ">

        {/* <div className="flex flex-col border-b border-gray-300 w-11/12">
            <h1 className="font-bold text-xl">Solo Leveling</h1>
            <div className="flex">
                <div 
                    className={`text-slate-500 text-xs  ${isClamped?"line-clamp-2": ""}	hover:text-slate-400 mt-2 mb-3`} 
                    onClick={()=>{
                        setIsClamped(!isClamped);
                    }}>
                    [Epilogue now available] 
                    In a world where awakened beings called “Hunters” must battle deadly monsters to protect humanity, Sung Jinwoo, nicknamed “the weakest hunter of all mankind,” finds himself in a constant struggle for survival. One day, after a brutal encounter in an overpowered dungeon wipes out his party and threatens to end his life, a mysterious System chooses him as its sole player: Jinwoo has been granted the rare opportunity to level up his abilities, possibly beyond any known limits. Follow Jinwoo’s journey as he takes on ever-stronger enemies, both human and monster, to discover the secrets deep within the dungeons and the ultimate extent of his powers.
                    Based on the action-fantasy novel that has become a global phenomenon, the highly anticipated comic adaptation arrives with a brand-new official English translation produced by Tappytoon.
                </div>
            </div>
        </div> */}

        <Title />

        {/* <MarginBottom /> */}
        <div className="mt-2 font-bold text-gray-700">Content</div>
        <div className="my-2 w-full h-full">
            <DisplayContent />
            <DisplayContent />

            <DisplayContent />

            {/* Chapters */}
            {/* 
                Editions: fetch the latest editions from backend and display them using suspense
                mg_components:: divided based on year
            */}
            
            {/* <BookCard />
            <BookCard />
            <BookCard />
            <BookCard /> */}
            <BookCardDefault />
            <BookCardDefault />
            {/* <BookCardDefault /> */}

            {/* <ImageCardComp />
            <ImageCardComp />
            <ImageCardComp />
            <ImageCardComp />
            <ImageCardComp /> */}
            {/* <ContentDisplay />
            <ContentDisplay /> */}
            

        </div>
    </div>
}

