"use client"
import {useRef, useState} from "react"
import { register } from "../controllers/auth"
import { useRouter } from "next/navigation";
import Toaster from "../dash/components/Toaster";

const Register = () => {
    const router = useRouter()

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const formRef = useRef()

    const [isLoading, setIsLoading] = useState(false)

    const [isShow, setShow] = useState(false)
    const [message, setMessage] = useState("")

    if(isShow === true) {
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }

    return (
        <section className={"flex items-center justify-center pt-10"}>
            { isShow && <Toaster message={message} /> }
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form ref={formRef} className="space-y-6" action={async (formData) => {

                    if(formData.get("name").length === 0){
                        nameRef.current.classList.add("border-red-500");
                        nameRef.current.classList.replace("border", "border-2");
                        nameRef.current.classList.replace("focus:ring-2", "focus:ring-0");
                        nameRef.current.focus();
                        setIsLoading(false)
                        return false
                    }else {
                        nameRef.current.classList.remove("border-red-500");
                        nameRef.current.classList.replace("border-2", "border");
                        nameRef.current.classList.replace("focus:ring-0", "focus:ring-2");
                    }

                    if(formData.get("email").length === 0){
                        emailRef.current.classList.add("border-red-500");
                        emailRef.current.classList.replace("border", "border-2");
                        emailRef.current.classList.replace("focus:ring-2", "focus:ring-0");
                        emailRef.current.focus();
                        setIsLoading(false)
                        return false
                    }else {
                        emailRef.current.classList.remove("border-red-500");
                        emailRef.current.classList.replace("border-2", "border");
                        emailRef.current.classList.replace("focus:ring-0", "focus:ring-2");
                    }

                    if(formData.get("password").length === 0){
                        passwordRef.current.classList.add("border-red-500");
                        passwordRef.current.classList.replace("border", "border-2");
                        passwordRef.current.classList.replace("focus:ring-2", "focus:ring-0");
                        passwordRef.current.focus();
                        setIsLoading(false)
                        return false
                    }else {
                        passwordRef.current.classList.remove("border-red-500");
                        passwordRef.current.classList.replace("border-2", "border");
                        passwordRef.current.classList.replace("focus:ring-0", "focus:ring-2");
                    }


                    const { status, message } = await register({name: formData.get("name"), email: formData.get("email"), password: formData.get("password")})
                    if(status === "success"){
                        setMessage(message)
                        setShow(true)
                        formRef.current.reset()
                        setIsLoading(false)
                        router.push('/signin')
                    }else {
                        setMessage(message)
                        setShow(true)
                        setIsLoading(false)
                    }

                }}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">تسجيل حساب</h5>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الاسم</label>
                        <input
                            ref={nameRef}
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Yeslem..."
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">بريدك الإلكتروني</label>
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@company.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">كلمة مرورك</label>
                        <input
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required />
                    </div>
                    <button disabled={isLoading} type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        تسجيل الدخول
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Register