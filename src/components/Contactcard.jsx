import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi';
import { RiEditCircleLine } from 'react-icons/ri';
import { IoMdTrash } from 'react-icons/io';

const Contactcard = ({contact}) => {
  return (
    <div key={contact.id} className=" flex items-center bg-yellow justify-between rounded-3xl mt-1 p-2">
            <div className="flex gap-2 ">
              <HiOutlineUserCircle className="text-4xl text-red-800 text" />
              <div className="">
                <h2 className=" font-bold ">{contact.name}</h2>
                <p className="text-sm ">{contact.email}</p>
              </div>
            </div>
            <div className="flex text-2xl">
              <RiEditCircleLine />
              <IoMdTrash className=" text-red-600" />
            </div>
          </div>
  )
}

export default Contactcard
