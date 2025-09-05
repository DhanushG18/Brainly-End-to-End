import '../App.css'
import Button from '../components/Button'
import PlusIcon from '../icons/plusIcon'
import ShareIcon from '../icons/shareIcon' 
import Card from '../components/Card'
import { useState } from 'react'
import CreateContentModal from '../components/CreateContentModal'
import { SideBar } from '../components/SideBar'

export function Dashboard() {
  const [openModal,setOpenModal] = useState(false)
  return <div>
    <SideBar/>
    <div className= " p-4 ml-72 min-h-screen bg-gray-200 border">
    <CreateContentModal open = {openModal} onClose={() => {
      setOpenModal(false)
    }}/>
   <div className=" flex justify-end gap-4 ">
    <Button onClick ={() =>{
      setOpenModal(true)}}
      variant="primary" text="Add content" startIcon={<PlusIcon />} />
    <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />} />
    </div>
    <div className="flex gap-4">
    <Card type="x" link = "https://twitter.com/dhanushg_/status/1963674705476694240" title="wishes tweet"/>
    <Card type ="youtube" link="https://www.youtube.com/embed/RRVO5PQwEMc?si=MbWc47m5pmLN1mIG" title= " first video"/>
    </div>
  </div>
  </div>

}
  

export default Dashboard
