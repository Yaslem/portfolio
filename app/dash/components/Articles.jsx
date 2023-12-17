"use client"

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import {useState} from "react";
import {deleteArticle, updateStatusArticle, updateStatusCommentArticle} from "@/app/controllers/Article";
import Toaster from "@/app/dash/components/Toaster";
export default function Articles({articles, status, messageEmpty}) {
    const pathname = usePathname()

    const [isShow, setShow] = useState(false)
    const [message, setMessage] = useState("")

    if(isShow === true) {
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }

    return (
        <>
            { isShow && <Toaster message={message} /> }
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
                                    عنوان المقالة
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    صورة المقالة
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    تصنيف المقالة
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    حالة المقالة
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    حالة التعليقات
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                articles.map(article =>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {article.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            <Image width={40} height={40} src={"/uploads/" + article.image} alt={"صورة المقالة"} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {article.category.name}
                                        </td>
                                        <td className="px-6 py-4">

                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox"
                                                       defaultValue={article.is_public}
                                                       checked={article.is_public}
                                                       className="sr-only peer"
                                                       onChange={async (e) => {
                                                           const { status, message } = await updateStatusArticle(article.id, e.target.checked)
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
                                                            article.is_public
                                                                ? "منشور"
                                                                : "محجوب"
                                                        }
                                                    </span>
                                            </label>

                                        </td>
                                        <td className="px-6 py-4">

                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox"
                                                       defaultValue={article.is_comment}
                                                       checked={article.is_comment}
                                                       className="sr-only peer"
                                                       onChange={async (e) => {
                                                           const { status, message } = await updateStatusCommentArticle(article.id, e.target.checked)
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
                                                            article.is_public
                                                                ? "منشور"
                                                                : "محجوب"
                                                        }
                                                    </span>
                                            </label>

                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-4 text-right">
                                            <Link href={pathname + `/${article.id}/edit`}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">تعديل</Link>
                                            <button onClick={async () => {
                                                const { status, message } = await deleteArticle(article.id)
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