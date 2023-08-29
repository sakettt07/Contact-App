import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import New from "./New";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactValidation=Yup.object().shape({
    name:Yup.string().required("Name is Required"),
    email:Yup.string().email("Invalid Email").required("email is Required"),
})

const AddUpdate = ({ isOpen, onClose ,isUpdate,contact }) => {
    const addContact= async (contact)=>{
        try {
            const contactref=collection(db,"contacts");
            await addDoc(contactref,contact);
            onClose();
            toast.success("Contact Added Successfully")

        } catch (error) {
            console.log(error)
        }
    }
    const updateContact= async (contact,id)=>{
        try {
            const contactref=doc(db,"contacts",id);
            await updateDoc(contactref,contact);
            onClose();
            toast.success("Contact Updated Successfully")

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <New isOpen={isOpen} onClose={onClose}>
        <Formik validationSchema={contactValidation} initialValues={isUpdate ? {
            name:contact.name,
            email:contact.email,
        } :{
            name:"",
            email:"",
        }}
        onSubmit={(values)=>{
            isUpdate ?
            updateContact(values,contact.id) :
            addContact(values)
        }}>
          <Form className="flex flex-col gap-3">
            <div className=" flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              <div className=" text-red-500 text-xs">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" className="h-10 border" />
              <div className=" text-red-500 text-xs">
                <ErrorMessage name="email"/>
              </div>
            </div>

            <button className=" self-center bg-green-600 px-3 py-1.5 border">
              {isUpdate ? "update" : "add"} Contact
            </button>
          </Form>
        </Formik>
      </New>
    </div>
  );
};

export default AddUpdate;
