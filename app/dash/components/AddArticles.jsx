"use client"
import Toaster from "@/app/dash/components/Toaster";
import {useRouter} from "next/navigation";
import { Editor } from '@tinymce/tinymce-react';
import {useRef, useState} from "react";
import {createArticle, updateArticle} from "@/app/controllers/Article";
const addArticle = ({categories, isEdit = false, article}) => {
    const articleId = isEdit ? article.id : ""
    const [body, setBody] = useState(isEdit ? article.description : "")
    const [title, setTitle] = useState(isEdit ? article.title : "")
    const [image, setImage] = useState(isEdit ? article.image : "")
    const [category, setCategory] = useState(isEdit ? article.categoryId : "")
    const [isLoading, setIsLoading] = useState(false)

    console.log(body)
    const router = useRouter()

    const titleRef = useRef()
    const imageRef = useRef()
    const categoryRef = useRef()
    const bodyRef = useRef()

    const [isShow, setShow] = useState(false)
    const [message, setMessage] = useState("")

    if(isShow === true) {
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }

    return (
        <form className={"flex flex-col gap-4"} action={async () => {
            const formData = new FormData();
            formData.append("articleId", articleId);
            formData.append("title", title);
            formData.append("image", image);
            formData.append("body", body);
            formData.append("category", category);

            setIsLoading(true)
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

            if (body.length === 0){
                bodyRef.current.classList.add("border-red-500");
                bodyRef.current.classList.add("border-2");
                bodyRef.current.focus();
                setIsLoading(false)
                return false;
            }else {
                bodyRef.current.classList.remove("border-red-500");
                bodyRef.current.classList.remove("border-2");
            }

            if(!isEdit){
                if(image.length === 0 || image.size === 0) {
                    imageRef.current.classList.add("border-red-500");
                    imageRef.current.classList.replace("border", "border-2");
                    imageRef.current.focus();
                    setIsLoading(false)
                    return false;
                } else {
                    imageRef.current.classList.remove("border-red-500");
                    imageRef.current.classList.replace("border-2", "border");
                }

                if (category.length === 0){
                    categoryRef.current.classList.add("border-red-500");
                    categoryRef.current.classList.replace("border", "border-2");
                    categoryRef.current.focus();
                    setIsLoading(false)
                    return false;
                }else {
                    categoryRef.current.classList.remove("border-red-500");
                    categoryRef.current.classList.replace("border-2", "border");
                }
            }

            const { status, message } = isEdit ? await updateArticle(formData) : await createArticle(formData)
            if(status === "success"){
                setMessage(message)
                setShow(true)
                router.back()
            }
        }}>
            { isShow && <Toaster message={message} /> }
            <button disabled={isLoading} className={"p-2 text-sm text-white bg-blue-700 transition hover:bg-blue-800 text-center self-end rounded-xl w-24"}>{ isEdit ? "تحديث" : "إنشاء" }</button>
            <input defaultValue={title} ref={titleRef} onChange={(e) => setTitle(e.target.value)} className={"p-2 border rounded-xl focus:outline-0"} type={"text"} placeholder={"العنوان"}/>
            <input ref={imageRef} onChange={(e) => setImage(e.target.files[0])} className={"p-2 border bg-white rounded-xl focus:outline-0"} type={"file"} accept={"image/*"}/>
            <div className={"rounded-xl"} ref={bodyRef}>
                <Editor
                    apiKey='1pwbld79ntpeigxurq9pxzrgu5oi3683qsvfk0lc7essw9d8'
                    onEditorChange={(newValue, editor) => {
                        setBody(newValue);
                    }}
                    init={{
                        plugins: 'anchor autolink directionality charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image imageupload media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | ltr rtl',
                        language_url: "/lang/tinymce/ar.js",
                        language: "ar",
                        directionality: "rtl",

                    }}
                    value={body}
                />
            </div>
            <div className={"flex flex-col gap-2"}>
                <label>التصنيف</label>
                <select className={"p-2 border rounded-xl focus:outline-0"} ref={categoryRef} onChange={(e) => setCategory(e.target.value)}>
                    {
                        categories.map(categoryList => <option key={categoryList.id} selected={categoryList.id === category} value={categoryList.id}>{categoryList.name}</option>)
                    }
                </select>
            </div>
        </form>
    )
}

export default addArticle