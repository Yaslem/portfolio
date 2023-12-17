"use client"
import Toaster from "@/app/dash/components/Toaster";
import {createProject} from "@/app/controllers/Project";
import {useRef, useState} from "react";
import {useRouter} from "next/navigation";

const AddProject = ({categories}) => {
    const router = useRouter()
    const nameRef = useRef()
    const linkRef = useRef()
    const imageRef = useRef()
    const categoryRef = useRef()
    const descriptionRef = useRef()
    const [isLoading, setIsLoading] = useState(false)

    const [isShow, setShow] = useState(false)
    const [message, setMessage] = useState("")

    if(isShow === true) {
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }

    return (
        <section>
            { isShow && <Toaster message={message} /> }
            <form action={async (FormData) => {
                setIsLoading(true)
                if (FormData.get("name").length === 0) {
                    nameRef.current.classList.add("border-red-500");
                    nameRef.current.classList.replace("border", "border-2");
                    nameRef.current.classList.replace("focus:ring-2", "focus:ring-0");
                    nameRef.current.focus();
                    setIsLoading(false)
                    return false;
                }else if(FormData.get("image").size === 0) {
                    imageRef.current.classList.add("border-red-500");
                    imageRef.current.classList.replace("border", "border-2");
                    imageRef.current.classList.replace("focus:ring-2", "focus:ring-0");
                    imageRef.current.focus();
                    setIsLoading(false)
                    return false;
                }else if(FormData.get("categoryId").length === 0) {
                    categoryRef.current.classList.add("border-red-500");
                    categoryRef.current.classList.replace("border", "border-2");
                    categoryRef.current.classList.replace("focus:ring-2", "focus:ring-0");
                    categoryRef.current.focus();
                    setIsLoading(false)
                    return false;
                }else if(FormData.get("description").length === 0) {
                    descriptionRef.current.classList.add("border-red-500");
                    descriptionRef.current.classList.replace("border", "border-2");
                    descriptionRef.current.classList.replace("focus:ring-2", "focus:ring-0");
                    descriptionRef.current.focus();
                    setIsLoading(false)
                    return false;
                }else {
                    const { status, message } = await createProject(FormData)
                    if(status === "success"){
                        setMessage(message)
                        setShow(true)
                        router.back()
                    }
                }
            }} className={"flex flex-col gap-4"}>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor={"name"} className={"text-sm cursor-pointer w-fit"}>الاسم</label>
                    <input
                        ref={nameRef}
                        className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                        type={"text"}
                        name={"name"}
                        id={"name"}
                        autoComplete={"name"}
                        placeholder={"اكتب هنا الاسم"}
                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor={"link"} className={"text-sm cursor-pointer w-fit"}>الرابط</label>
                    <input
                        ref={linkRef}
                        className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                        type={"text"}
                        name={"link"}
                        id={"link"}
                        autoComplete={"link"}
                        placeholder={"اكتب هنا رابط المشروع"}
                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor={"github"} className={"text-sm cursor-pointer w-fit"}>رابط المشروع على github</label>
                    <input
                        ref={linkRef}
                        className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                        type={"text"}
                        name={"github"}
                        id={"github"}
                        autoComplete={"github"}
                        placeholder={"اكتب هنا رابط المشروع على github"}
                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor={"image"} className={"text-sm cursor-pointer w-fit"}>صورة المشروع</label>
                    <input
                        ref={imageRef}
                        className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                        type={"file"}
                        name={"image"}
                        id={"image"}
                        autoComplete={"image"}
                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor={"categoryId"} className={"text-sm cursor-pointer w-fit"}>تصنيف المشروع</label>
                    <select
                        ref={categoryRef}
                        className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                        name={"categoryId"}
                        id={"categoryId"}
                        autoComplete={"categoryId"}
                    >
                        {
                            categories?.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)
                        }
                    </select>
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor={"description"} className={"text-sm cursor-pointer w-fit"}>الوصف</label>
                    <textarea
                        ref={descriptionRef}
                        className={"text-gray-700 rounded-xl border focus:outline-0 focus:ring-2 focus:ring-blue-500 text-xs p-2 h-40"}
                        name={"description"}
                        id={"description"}
                        autoComplete={"description"}
                        placeholder={"اكتب هنا وصف المشروع"}
                    ></textarea>
                </div>
                <button disabled={isLoading} className={"w-20 text-center border-2 border-gray-200 hover:bg-neutral-800 p-2 rounded-xl bg-stone-950 text-white font-medium"}>حفظ</button>
            </form>
        </section>
    )
}

export default AddProject