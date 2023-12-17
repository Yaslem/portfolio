"use client"
import Lottie from "lottie-react";
import contact from "../animations/contact.json";
import emailjs from '@emailjs/browser';
import {useRef, useState} from "react";
import {createMessage} from "@/app/controllers/Message";
import Toaster from "@/app/dash/components/Toaster";
export default function Contact() {
    const form = useRef();
    const nameRef = useRef()
    const emailRef = useRef()
    const messageRef = useRef()

    const [loading, setLoading] = useState(false);

    const [isShow, setShow] = useState(false)
    const [message, setMessage] = useState("")

    if(isShow === true) {
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (nameRef.current.value.length === 0){
            nameRef.current.focus();
            setLoading(false)
            return false;
        }else if(emailRef.current.value.length === 0){
            emailRef.current.focus();
            setLoading(false)
            return false;
        }else if(messageRef.current.value.length === 0){
            messageRef.current.focus();
            setLoading(false)
            return false;
        } else {
            const { status, message } = await createMessage(nameRef.current.value, emailRef.current.value, messageRef.current.value)
            if(status === "success"){
                emailjs.sendForm('service_3kgqv64', 'template_nnrw0ec', form.current, 'iZSIXHA1d5gv2Iy0l')
                    .then((result) => {
                        if(result.text === "OK"){
                            setMessage(message)
                            setShow(true)
                            form.current.reset()

                        }
                        setLoading(false)
                    }, (error) => {
                        setLoading(false)
                    });

            }
        }
    };
  return (
    <section className='contact-us'>
        { isShow && <Toaster message={message} /> }
      <h1 className='text-title font-bold text-3xl mb-4'>
        <span className="icon-envelope text-sub-title ml-4 text-3xl" />
        تواصل معي
      </h1>
      <p className='text-sub-title mb-4 text-sm leading-6'>تواصل معي لمزيد من المعلومات.</p>
      <div className="flex justify-between">
        <form onSubmit={sendEmail} ref={form} className="flex gap-4 flex-col w-1/2 max-[768px]:w-full">
          <div className='flex flex-col items-start gap-3'>
            <label className="flex text-sub-title gap-3 text-sm after:content-['*'] after:mb-1 after:block after:text-[#da3d3d]" htmlFor='name'>اسمك</label>
            <input
                ref={nameRef}
                className="outline-none bg-[#ffffff29] border-[#80808073] text-[#232324] dark:text-white dark:bg-[#3f3f4626] contact-border px-2 py-3 mr-4 rounded-xl transition text-base w-[calc(100%-(1rem+16px))] focus:border-[#4e5050] hover:border-[#4e5050] dark:focus:border-blue dark:hover:border-blue max-[600px]:w-full max-[600px]:px-0 max-[600px]:py-2 max-[600px]:mr-0"
                type='text'
                name='user_name'
                id='name'
            />
          </div>
            <div className='flex flex-col items-start gap-3'>
                <label className="flex text-sub-title gap-3 text-sm after:content-['*'] after:mb-1 after:block after:text-[#da3d3d]" htmlFor='email'>البريد الإلكتروني</label>
                <input
                    ref={emailRef}
                    className="outline-none bg-[#ffffff29] border-[#80808073] text-[#232324] dark:text-white dark:bg-[#3f3f4626] contact-border px-2 py-3 mr-4 rounded-xl transition text-base w-[calc(100%-(1rem+16px))] focus:border-[#4e5050] hover:border-[#4e5050] dark:focus:border-blue dark:hover:border-blue max-[600px]:w-full max-[600px]:px-0 max-[600px]:py-2 max-[600px]:mr-0"
                    type='email'
                    name='user_email'
                    id='email'
                />
            </div>
          <div className='flex flex-col items-start gap-3'>
            <label className="flex text-sub-title gap-3 text-sm after:content-['*'] after:mb-1 after:block after:text-[#da3d3d]" htmlFor='message'>الرسالة</label>
            <textarea
                ref={messageRef}
                className="outline-none bg-[#ffffff29] border-[#80808073] text-[#232324] dark:text-white dark:bg-[#3f3f4626] contact-border px-2 py-3 mr-4 rounded-xl transition text-base w-[calc(100%-(1rem+16px))] h-36 resize-y focus:border-[#4e5050] hover:border-[#4e5050] dark:focus:border-blue dark:hover:border-blue max-[600px]:w-full max-[600px]:px-0 max-[600px]:py-2 max-[600px]:mr-0"
                name='message'
                id="message">

            </textarea>
          </div>
          <button disabled={loading} className='bg-[#24252e] text-white px-8 py-3 text-center text-base capitalize rounded-md transition mt-7 submit-border hover:scale-90 max-[600px]:self-center max-[600px]:w-1/3'>
              {
                  loading
                      ? "يتم الإرسال..."
                      : "إرسال"
              }
          </button>
        </form>
        <div className="w-1/3 max-[768px]:hidden">
          <Lottie animationData={contact} />
        </div>
      </div>
    </section>
  )
}
