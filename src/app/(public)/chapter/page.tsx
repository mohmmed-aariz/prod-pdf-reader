import CMapping from "@/app/ui/chapter/CMapping";

export default function Page(){
    console.log("Chapter getting called")
    return <div className="bg-black min-h-screen w-full">
        {/* PDF */}
        <CMapping />
    </div>
}