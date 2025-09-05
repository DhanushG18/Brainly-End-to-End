import type { ReactElement } from "react";

interface SideProps{
    text: string;
    icon: ReactElement;

}
export default function SideBarItem({text,icon}: SideProps){
    return <div className="flex cursor-pointer hover:bg-gray-200 max-w-48 transition-all duration-400" >
       
        <div className= " pr-2 ml-2">
            {icon}

        </div>
        
        <div>
            {text}
        </div> 

    </div>

}