import { HiOutlineUserCircle } from 'react-icons/hi';
import { RiEditCircleLine } from 'react-icons/ri';
import { IoMdTrash } from 'react-icons/io';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import AddUpdate from './AddUpdate';
import useDisclose from '../hooks/useDisclose';
import { toast } from 'react-toastify';

const Contactcard = ({contact}) => {
    const {isOpen,onClose,onOpen}=useDisclose();

    const deleteContact= async(id)=>{
        try {
            await deleteDoc(doc(db,"contact",id));
            toast.success("Contact Deleted Successfully")
        } catch (error) {
            console.log(error);
            
        }

    }
  return (
    <>
    <div key={contact.id} className=" flex items-center bg-yellow justify-between rounded-3xl mt-1 p-2">
            <div className="flex gap-2 ">
              <HiOutlineUserCircle className="text-4xl text-red-800 text" />
              <div className="">
                <h2 className=" font-bold ">{contact.name}</h2>
                <p className="text-sm ">{contact.email}</p>
              </div>
            </div>
            <div className="flex text-2xl">
              <RiEditCircleLine onClick={onOpen} className=' cursor-pointer' />
              <IoMdTrash onClick={()=>deleteContact(contact.id)} className=" text-red-600 cursor-pointer" />
            </div>
          </div>
          <AddUpdate contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
          </>
  )
}

export default Contactcard
