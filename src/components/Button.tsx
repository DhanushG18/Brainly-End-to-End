import type { ReactElement } from "react";

interface ButtonProps {
    variant : "primary" | "secondary";
    text : string;
    startIcon?: ReactElement;
    onClick?: () => void; 
}


const variantClasses={
    "primary" : "bg-blue-600 text-white",
    "secondary" : "bg-blue-200 text-white",
};

const defStyles = "px-4 py-2 rounded-md flex items-center cursor-pointer";


export default function Button({variant,text,startIcon,onClick}: ButtonProps){
    return <button onClick ={onClick}className = {variantClasses[variant] + " " + defStyles}>
        <div className=" pr-2">
            {startIcon}
        </div>
        {text}

    </button>


} 