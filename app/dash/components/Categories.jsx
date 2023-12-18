"use client"

import {useRef, useState} from "react";
import {createCategory, deleteCategory, updateCategory} from "../../controllers/Category";
import Toaster from "./Toaster";

export default function Categories({categories, status, messageEmpty}) {
    const [showModal, setShowModal] = useState(false)
    const [isShow, setShow] = useState(false)
    const [message, setMessage] = useState("")
    const nameRef = useRef()
    const slugRef = useRef()
    const typeRef = useRef()

    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const [categoryId, setCategoryId] = useState(null)

    if(isShow === true) {
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }

    return (
        <section className={"flex flex-col gap-4"}>
            <div className={"flex items-center justify-between"}>
                <div />
                <button onClick={() => setShowModal(true)} data-modal-target="crud-modal" data-modal-toggle="crud-modal"
                        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button">
                    إضافة
                </button>
            </div>
            { isShow && <Toaster message={message} /> }
            {
                showModal &&
                <div id="crud-modal" tabindex="-1" aria-hidden="true"
                     className="overflow-y-auto bg-gray-50 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative mx-auto p-4 w-full max-w-md max-h-full">
                        {/*Modal content*/}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/*Modal header*/}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    إضافة تصنيف
                                </h3>
                                <button onClick={() => {
                                    setName("")
                                    setSlug("")
                                    setShowModal(false)
                                }} type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">إغلاق</span>
                                </button>
                            </div>
                            {/*Modal body*/}
                            <form className="p-4 md:p-5" action={async (FormData) => {
                                if(FormData.get("name").length === 0) {
                                    nameRef.current.classList.replace("border", "border-2");
                                    nameRef.current.classList.replace("border-gray-300", "border-red-500");
                                    nameRef.current.focus();
                                    return false
                                }else {
                                    nameRef.current.classList.replace("border-2", "border");
                                    nameRef.current.classList.replace("border-red-500", "border-gray-300");
                                }
                                if(FormData.get("slug").length === 0) {
                                    slugRef.current.classList.replace("border", "border-2");
                                    slugRef.current.classList.replace("border-gray-300", "border-red-500");
                                    slugRef.current.focus();
                                    return false
                                }else {
                                    slugRef.current.classList.replace("border-2", "border");
                                    slugRef.current.classList.replace("border-red-500", "border-gray-300");
                                }
                                if(name.length === 0 && slug.length === 0) {
                                    if(FormData.get("type").length === 0) {
                                        typeRef.current.classList.replace("border", "border-2");
                                        typeRef.current.classList.replace("border-gray-300", "border-red-500");
                                        typeRef.current.focus();
                                        return false
                                    }else {
                                        typeRef.current.classList.replace("border-2", "border");
                                        typeRef.current.classList.replace("border-red-500", "border-gray-300");
                                    }

                                    const { status, message } = await createCategory(FormData)
                                    if(status === "success"){
                                        setMessage(message)
                                        setShow(true)
                                        setShowModal(false)
                                    }
                                }else {
                                    const { status, message } = await updateCategory(FormData)
                                    if(status === "success"){
                                        setMessage(message)
                                        setShow(true)
                                        setShowModal(false)
                                    }
                                }
                            }}>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الاسم</label>
                                        <input
                                            ref={nameRef}
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="اكتب اسم التصنيف"
                                            required=""
                                            defaultValue={name}
                                        />
                                        <input
                                            type="hidden"
                                            name="id"
                                            defaultValue={categoryId}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="slug"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الاسم اللطيف</label>
                                        <input
                                            ref={slugRef}
                                            type="text"
                                            name="slug"
                                            id="slug"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="اكتب الاسم اللطيف للتصنيف"
                                            required=""
                                            defaultValue={slug}
                                        />
                                    </div>
                                    {
                                        name.length === 0 && slug.length === 0 &&
                                        <div className="col-span-2">
                                            <label
                                                htmlFor="type"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الاسم اللطيف</label>
                                            <select
                                                ref={typeRef}
                                                name="type"
                                                id="type"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required=""
                                            >
                                                <option value={"Article"}>Article</option>
                                                <option value={"Project"}>Project</option>
                                            </select>
                                        </div>
                                    }
                                </div>
                                <button type="submit"
                                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                              clip-rule="evenodd"></path>
                                    </svg>
                                    إضافة التصنيف
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {
                status === "error"
                    ? <p>{messageEmpty}</p>
                    : <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                        <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                            <caption
                                className="p-5 text-lg font-semibold text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                التصنيفات
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">تظهر هنا جميع التصنيفات، تصنيفات المشاريع، والمقالات، ويمكن تعديلها أو حذفها.</p>
                            </caption>
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    اسم المشروع
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    عدد المشاريع
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    عدد المقالات
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                categories.map(category =>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {category.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {category._count.projects}
                                        </td>
                                        <td className="px-6 py-4">
                                            {category._count.articles}
                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-4 text-right">
                                            <button onClick={() => {
                                                setShowModal(true)
                                                setCategoryId(category.id)
                                                setName(category.name)
                                                setSlug(category.slug)
                                            }}
                                               className="font-medium text-blue-600 dark:text-blue-500 hover:underline">تعديل</button>
                                            <button onClick={async () => {
                                                const { status, message } = await deleteCategory(category.id)
                                                if(status === "success"){
                                                    setMessage(message)
                                                    setShow(true)
                                                }
                                            }}
                                               className="font-medium text-red-600 dark:text-red-500 hover:underline">حذف</button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>

            }
        </section>
    )
}
