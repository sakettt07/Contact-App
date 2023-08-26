import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection ,getDocs } from "firebase/firestore";
import {db} from "./config/firebase";
import { HiOutlineUserCircle } from "react-icons/hi";

const App = () => {
  const [contacts, setContacts] = useState([]);

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
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar />
      <div className="flex">
        <div className="relative flex flex-grow items-center">
          <FiSearch className=" ml-1 absolute text-2xl text-white" />
          <input
            type="text"
            className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
          />
        </div>
        <div>
          <AiFillPlusCircle className=" ml-1 absolute  text-white text-4xl cursor-pointer" />
        </div>
      </div>
      <div>
        {contacts.map((contact) => (
          <div key={contact.id}>
            <HiOutlineUserCircle />
            <div className="text-white">
              <h2 className="">{contact.name}</h2>
              <p className="">{contact.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
