"use client"
import {useRef, useState} from "react";
import {createAbout} from "../../controllers/About";
import Toaster from "./Toaster";

export default function About({about, status}) {
    const [name, setName] = useState(status === "success" ? about.name : "")
    const [title, setTitle] = useState(status === "success" ? about.title : "")
    const [des, setDes] = useState(status === "success" ? about.description : "")
    const id = status === "success" ? about.id : null
    const [image, setImage] = useState(status === "success" ? about.image : "")

    const
        nameRef = useRef(),
        titleRef = useRef(),
        desRef = useRef(),
        imageRef = useRef()

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
            <form className={"flex flex-col gap-4"} action={ async () => {
                const formData = new FormData()
                formData.append("name", name)
                formData.append("title", title)
                formData.append("des", des)
                formData.append("id", id)
                formData.append("image", image)

                if (name.length === 0){
                    nameRef.current.classList.add("border-red-500");
                    nameRef.current.classList.replace("border", "border-2");
                    nameRef.current.focus();
                    setIsLoading(false)
                    return false;
                }else {
                    nameRef.current.classList.remove("border-red-500");
                    nameRef.current.classList.replace("border-2", "border");
                }

                if (image.length === 0 || image.size === 0){
                    imageRef.current.classList.add("border-red-500");
                    imageRef.current.classList.replace("border", "border-2");
                    imageRef.current.focus();
                    setIsLoading(false)
                    return false;
                }else {
                    imageRef.current.classList.remove("border-red-500");
                    imageRef.current.classList.replace("border-2", "border");
                }

                if (title.length === 0){
                    titleRef.current.classList.add("border-red-500");
                    titleRef.current.classList.replace("border", "border-2");
                    titleRef.current.focus();
                    setIsLoading(false)
                    return false;
                }else {
                    titleRef.current.classList.remove("border-red-500");
                    titleRef.current.classList.replace("border-2", "border");
                }

                if (des.length === 0){
                    desRef.current.classList.add("border-red-500");
                    desRef.current.classList.replace("border", "border-2");
                    desRef.current.focus();
                    setIsLoading(false)
                    return false;
                }else {
                    desRef.current.classList.remove("border-red-500");
                    desRef.current.classList.replace("border-2", "border");
                }

                const { status, message } = await createAbout(formData)
                if(status === "success"){
                    setMessage(message)
                    setShow(true)
                    setIsLoading(false)
                }

            }}>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor={"name"} className={"text-sm cursor-pointer w-fit"}>الاسم</label>
                    <input
                        ref={nameRef}
                        className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"} type={"text"}
                        name={"name"}
                        id={"name"}
                        autoComplete={"name"}
                        placeholder={"اكتب هنا الاسم"}
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor={"image"} className={"text-sm cursor-pointer w-fit"}>الصورة</label>
                    <input
                        ref={imageRef}
                        className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                        type={"file"}
                        name={"image"}
                        id={"image"}
                        autoComplete={"image"}
                        accept={"image/*"}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor={"title"} className={"text-sm cursor-pointer w-fit"}>العنوان</label>
                    <input
                        ref={titleRef}
                        className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"} type={"text"}
                        name={"title"}
                        id={"title"}
                        autoComplete={"title"}
                        placeholder={"اكتب هنا العنوان"}
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor={"des"} className={"text-sm cursor-pointer w-fit"}>الوصف</label>
                    <textarea
                        ref={desRef}
                        className={"text-gray-700 rounded-xl border focus:outline-0 focus:ring-2 focus:ring-blue-500 text-xs p-2 h-40"}
                        name={"des"}
                        id={"des"}
                        autoComplete={"des"}
                        placeholder={"اكتب هنا المحتوى"}
                        defaultValue={des}
                        onChange={(e) => setDes(e.target.value)}
                    ></textarea>
                </div>
                <button disabled={isLoading} className={"w-20 text-center border-2 border-gray-200 hover:bg-neutral-800 p-2 rounded-xl bg-stone-950 text-white font-medium"}>حفظ</button>
            </form>
        </section>
    )
}