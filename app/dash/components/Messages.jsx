"use client"

import Link from "next/link";
import React, {useState} from "react";
import {deleteMessage, updateStatusMessage} from "@/app/controllers/Message";
import Toaster from "@/app/dash/components/Toaster";
export default function Messages({messages, status, messageEmpty}) {

    const [isShow, setShow] = useState(false)
    const [message, setMessage] = useState("")

    if(isShow === true) {
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }

    const getDate = (date) => {
        let days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

        return  <section>
            <strong>{days[date.getDay()]}، </strong>
            <span dir={"ltr"}>{`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}</span>
        </section>
    }

    return (
        <>
            { isShow && <Toaster message={message} /> }
            <section className={"flex flex-col gap-4"}>

                {
                    status === "error"
                        ? <p>{messageEmpty}</p>
                        : <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    اسم المرسل
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    بريد المرسل
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    رسالة المرسل
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    حالة الرد
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    التاريخ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                messages.map(messageList =>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {messageList.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {messageList.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {messageList.message}
                                        </td>
                                        <td className="px-6 py-4">

                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox"
                                                       defaultValue={messageList.isReply}
                                                       checked={messageList.isReply}
                                                       className="sr-only peer"
                                                       onChange={async (e) => {
                                                           const { status, message } = await updateStatusMessage(messageList.id, e.target.checked)
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
                                                            messageList.isReply
                                                                ? "تم الرد"
                                                                : "لم يتم الرد"
                                                        }
                                                    </span>
                                            </label>

                                        </td>
                                        <td className="px-6 py-4">
                                            {getDate(messageList.created_at)}
                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-4 text-right">
                                            <button onClick={async () => {
                                                const { status, message } = await deleteMessage(messageList.id)
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