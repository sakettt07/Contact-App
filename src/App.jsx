import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contactcard from "./components/Contactcard";
import AddUpdate from "./components/AddUpdate";
import useDisclose from "./hooks/useDisclose";
import NotFound from "./components/NotFound";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactColl = collection(db, "contacts");

        onSnapshot(contactColl, (snapshot) => {});
        const contactList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactList);
        return contactList;
      } catch (error) {
        console.log("Error fetching contacts:", error);
      }
    };
    getContacts();
  }, []);

  const filterContact = (e) => {
    const value = e.target.value;
    const contactColl = collection(db, "contacts");

    onSnapshot(contactColl, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filtered = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filtered);
      return filtered;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className=" ml-1 absolute text-2xl text-white" />
            <input
              onChange={filterContact}
              type="text"
              className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>
          <div>
            <AiFillPlusCircle
              onClick={onOpen}
              className=" ml-1 absolute  text-white text-4xl cursor-pointer"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 ">
          {contacts.length <= 0 ? (
            <NotFound />
          ) : (
            contacts.map((contact) => (
              <Contactcard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <ToastContainer position="bottom-center" />
      <AddUpdate onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default App;
