import Delete from "../icons/delete";
import NoteBook from "../icons/noteBook";
import PlusIcon from "../icons/plusIcon";

interface CardProps{
    title: string;
    link: string;
    type: "youtube" | "x";
}

export default function Card({title,link,type}:CardProps){
    return <div>
        <div className="p-6 bg-white rounded-md shadow-lg border-gray-200 max-w-72 border">
       
        <div className =" flex justify-between items-center  ">
            <div className="">
                <NoteBook/>
            </div>
             {title}
            <div className= " flex justify-between items-center ">
            <div className = " pr-2" >
                <a href={link} target="_blank">
                <PlusIcon></PlusIcon></a>
            </div>
            <div >
                <Delete/>
            </div>
            </div>
        </div>
        <div className=" rounded-md  pt-4 flex">
            <div>
            {type === "youtube" && <iframe width="200" 
            height="150" 
            src={link.replace("watch","embed").replace("?v=","/")} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
            </iframe>}</div>

            <div>{type === "x" && <blockquote className="twitter-tweet"><a href={link.replace("x.com","twitter.com")}></a>
            </blockquote>}</div>
        
        </div>
        </div>
    </div>
}