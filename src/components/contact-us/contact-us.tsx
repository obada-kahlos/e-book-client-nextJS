import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { GoLocation } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const ContactUs = () => {
  const contactData = [
    {
      icon: <IoLocationSharp />,
      title: "Address",
      disc: ["Syria, Damascus"],
    },
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      disc: ["+963 0997741497", "+963 0997741497"],
    },
    {
      icon: <MdEmail />,
      title: "Email",
      disc: ["Kahlousobada@gmail.com", "Kahlousobada@gmail.com"],
    },
  ];
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="lg:col-span-4 col-span-12">
          <div className="flex justify-center items-center flex-col gap-4">
            {contactData.map((item, key) => (
              <div
                key={key}
                className="flex justify-center items-center flex-col gap-1 mb-[20px]">
                <span className="text-[40px] text-bothColor">{item.icon}</span>
                <h4 className="dark:text-white text-[22px]">{item.title}</h4>
                {item.disc.map((item, key) => (
                  <p key={key} className="dark:text-base-content">
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-8 col-span-12 relative form-section">
          <h4 className="text-bothColor text-[20px] mb-2">Send us a message</h4>
          <p className="text-[18px] dark:text-base-content">
            If you have any work from me or any types of quries related to my
            tutorial, you can send me message from here. It is my pleasure to
            help you.
          </p>
          <Formik initialValues={{}} onSubmit={(values) => {}}>
            <Form>
              <Field
                type={"text"}
                placeholder={"Enter Your Name"}
                name={"name"}
                className="input block w-full my-[20px] input-bordered input-md"
              />
              <Field
                type={"text"}
                placeholder={"Enter Your Email"}
                name={"name"}
                className="input block w-full my-[20px] input-bordered input-md"
              />
              <Field
                as={"textarea"}
                type={"text"}
                placeholder="Bio"
                name={"name"}
                className="textarea block w-full my -[20px] textarea-bordered textarea-md"
              />
              <button className="btn btn-primary mt-[20px] md:w-4/12 w-full">
                Send
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <style>
        {`
            div.form-section::after{
                content : '';
                position :absolute;
                left : -70px;
                top : 0;
                width : 2px;
                height : 100%;
                background-color : rgba(255,255,255,0.6);
            }
        `}
      </style>
    </>
  );
};

export default ContactUs;
