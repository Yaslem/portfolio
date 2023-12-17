"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {deleteProject, updateProject, updateStatusProject} from "@/app/controllers/Project";
import {useRef, useState} from "react";
import Toaster from "@/app/dash/components/Toaster";

export default function Projects({projects, status, messageEmpty}) {
    const pathname = usePathname()
    const [isShow, setShow] = useState(false)
    const [message, setMessage] = useState("")

    // ref
    const nameRef = useRef()
    const descriptionRef = useRef()
    const linkRef = useRef()

    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [link, setLink] = useState("")
    const [projectId, setProjectId] = useState(null)

    if(isShow === true) {
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }
    return (
        <>
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
                                if(FormData.get("link").length === 0) {
                                    linkRef.current.classList.replace("border", "border-2");
                                    linkRef.current.classList.replace("border-gray-300", "border-red-500");
                                    linkRef.current.focus();
                                    return false
                                }else {
                                    linkRef.current.classList.replace("border-2", "border");
                                    linkRef.current.classList.replace("border-red-500", "border-gray-300");
                                }
                                if(FormData.get("description").length === 0) {
                                    descriptionRef.current.classList.replace("border", "border-2");
                                    descriptionRef.current.classList.replace("border-gray-300", "border-red-500");
                                    descriptionRef.current.focus();
                                    return false
                                }else {
                                    descriptionRef.current.classList.replace("border-2", "border");
                                    descriptionRef.current.classList.replace("border-red-500", "border-gray-300");
                                }
                                const { status, message } = await updateProject(FormData)
                                if(status === "success"){
                                    setMessage(message)
                                    setShow(true)
                                    setShowModal(false)
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
                                            placeholder="اكتب اسم المشروع"
                                            required=""
                                            defaultValue={name}
                                        />
                                        <input
                                            type="hidden"
                                            name="id"
                                            defaultValue={projectId}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="link"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">رابط المشروع</label>
                                        <input
                                            ref={linkRef}
                                            type="text"
                                            name="link"
                                            id="link"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="اكتب رابط المشروع"
                                            required=""
                                            defaultValue={link}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">وصف المشروع</label>
                                        <textarea
                                            ref={descriptionRef}
                                            name="description"
                                            id="description"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="اكتب الاسم اللطيف للتصنيف"
                                            required=""
                                            defaultValue={description}
                                        ></textarea>
                                    </div>
                                </div>
                                <button type="submit"
                                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                              clip-rule="evenodd"></path>
                                    </svg>
                                    تحديث المشروع
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            }
            <section className={"flex flex-col gap-4"}>
                <div className={"flex items-center justify-between"}>
                    <div />
                    <Link className={"flex items-center justify-center text-white p-2 text-base w-24 rounded-xl bg-black"} href={pathname + "/add"}>إضافة</Link>
                </div>
                {
                    status === "error"
                        ? <p>{messageEmpty}</p>
                        : <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    اسم المشروع
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    وصف المشروع
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    صورة المشروع
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    تصنيف المشروع
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    حالة المشروع
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                projects.map(project =>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {project.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {project.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Image width={40} height={40} src={"/uploads/" + project.image} alt={"صورة المشروع"} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.category.name}
                                        </td>
                                        <td className="px-6 py-4">

                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox"
                                                       defaultValue={project.is_public}
                                                       checked={project.is_public}
                                                       className="sr-only peer"
                                                       onChange={async (e) => {
                                                           const { status, message } = await updateStatusProject(project.id, e.target.checked)
                                                           if(status === "success"){
                                                               setMessage(message)
                                                               setShow(true)
                                                           }
                                                       }}
                                                />
                                                    <div
                                                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                                                    />
                                                    <span
                                                        className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        {
                                                            project.is_public
                                                                ? "منشور"
                                                                : "محجوب"
                                                        }
                                                    </span>
                                            </label>

                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-4 text-right">
                                            <button onClick={() => {
                                                setShowModal(true)
                                                setProjectId(project.id)
                                                setName(project.name)
                                                setDescription(project.description)
                                                setLink(project.link)
                                            }}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">تعديل</button>
                                            <button onClick={async () => {
                                                const { status, message } = await deleteProject(project.id)
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
                }
            </section>
        </>
    )
}