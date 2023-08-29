
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const New = ({ onClose, isOpen, children }) => {
  return createPortal (
    <>
      {isOpen && (
        <div className=" grid place-items-center absolute h-screen top-0 z-40 w-screen backdrop-blur">
          <div  className=" relative z-50 m-auto min-h-[200px] min-w-[80%] bg-white p-4">
            <div className=" flex justify-end">
              <AiOutlineClose onClick={onClose} 
              className=" cursor-pointer text-2xl" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  ,document.getElementById("modal-root"));
};

export default New;
