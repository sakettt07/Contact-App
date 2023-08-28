import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import Contactcard from "./components/Contactcard";
import AddUpdate from "./components/AddUpdate";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const [open,setOpen]=useState(false);

  const onOpen=()=>{
    setOpen(true);

  }
  const onClose=()=>{
    setOpen(false);

  }

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactColl = collection(db, "contacts");
        const contactSnap = await getDocs(contactColl);
        const contactList = contactSnap.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactList);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getContacts();
  }, []);

  return (
    <>
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className="relative flex flex-grow items-center">
          <FiSearch className=" ml-1 absolute text-2xl text-white" />
          <input
            type="text"
            className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
          />
        </div>
        <div>
          <AiFillPlusCircle onClick={onOpen} className=" ml-1 absolute  text-white text-4xl cursor-pointer" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3 ">
        {contacts.map((contact) => (
          <Contactcard  key={contact.id} contact={contact}/>
        ))}
      </div>
    </div>
    <AddUpdate onClose={onClose} isOpen={open} />
    </>
  );
};

export default App;
