"use client"

import { useState } from "react";
import { inter, lusitana, playfair, roboto } from "../fonts";




export default function Title(){
    const [isClamped, setIsClamped] = useState(true);
    
    return (
        <div className={`flex flex-col border-b border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-300 w-11/12 ${lusitana.className} antialiased text-gray-900`}>
            <h1 className="font-semibold text-2xl uppercase">HIGH PROFILE</h1>
            <div className="flex">
                <div 
                    className={`text-gray-600 text-xs  ${isClamped?"line-clamp-3": ""}	hover:text-gray-500 mt-2 mb-3`} 
                    onClick={()=>{
                        setIsClamped(!isClamped);
                    }}>
                The <strong>High Profile School E-Magazine </strong> is a vibrant and engaging publication that captures the essence of student life, achievements, and creativity. This edition showcases a variety of content, including updates on recent school events, academic and extracurricular accomplishments, and insightful articles that aim to educate and inspire. Featuring creative contributions from students, such as poems, essays, and artwork, the magazine provides a platform for young minds to express themselves. Additionally, it includes interviews, opinion pieces, and fun activities like puzzles and riddles, making it both informative and entertaining. By highlighting the talents and successes of students, the magazine fosters a sense of pride and motivation, encouraging active participation in school activities. It serves as a valuable resource for students, helping them stay connected with their school community while also enhancing their knowledge and creativity.    
                </div>
            </div>
        </div>
    )
}