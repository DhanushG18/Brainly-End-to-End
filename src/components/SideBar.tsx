import  YtIcon  from "../icons/ytIcon";
import SideBarItem from "./SideBarItem";
import TwitterIcon from "../icons/twitterIcon"
import Brain from "../icons/brain";

export function SideBar(){
    return<div className=" h-screen left-0 top-0 border-r w-72 bg-white fixed ">
        <div className=" text-2xl pt-4 ml-2 flex pb-4 items-center  ">
            <div className=" pr-3"><Brain /></div>
            Brainly
        </div>
        <SideBarItem icon={<TwitterIcon/>} text="Twitter"/>
        <SideBarItem icon={<YtIcon/>} text="YouTube"/>
    </div>

}