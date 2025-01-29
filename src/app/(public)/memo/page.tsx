import CMapping from "@/app/ui/chapter/CMapping";
import CombinedComponent from "@/app/ui/chapter/CombinedComponent";

export default function Page(){
    console.log("Chapter getting called")
    // return <div className="bg-custom-gradient min-h-screen w-full">
    return <div >
        {/* PDF */}
        
        {/* <CMapping /> */}
        <CombinedComponent />
    </div>
}