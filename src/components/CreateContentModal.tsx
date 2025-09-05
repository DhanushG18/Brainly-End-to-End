import Button from './Button'
import CrossIcon from "../icons/crossIcon"
interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}     
export default function({open, onClose}: CreateContentModalProps){

    return<div>
        {open && <div className =" bg-gray-600 top-0 left-0 fixed w-screen h-screen opacity-60 flex justify-center ">
            <div className=" flex flex-col justify-center">
            <span className =" bg-white opacity-100 p-4 rounded">
                <div className=" flex justify-end cursor-pointer" onClick={onClose}>
                    <CrossIcon/>
                </div>
                <div>
                    <Input placeholder= {"Text"} onChange={() => {}}/>
                    <Input placeholder= {"Link"} onChange={() => {}}/>
                </div>
                <div className=" flex justify-center">
                    <Button variant = "primary" text ="Submit" />
                </div>
            </span>
            </div>
        </div>}
    </div>
}

function Input({onChange, placeholder}: {onChange: () => void; placeholder:string;}){
    return <div>
            <input type = {"text"} placeholder={placeholder} className = " rounded border px-2 py-2 m-2" onChange={onChange}></input>
    </div>
}    