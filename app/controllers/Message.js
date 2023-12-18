"use server"
import SendMessage from "@/helpers/SendMessage";
import prisma from "@/prisma/db"
import {revalidatePath} from "next/cache";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const createMessage = async (name, email, message) => {
    if(name.length === 0){
        return {
            status: "error",
            code: 404,
            message: "لاسم مطلوب."
        }
    } else if(email.length === 0){
        return {
            status: "error",
            code: 404,
            message: "البريد مطلوب."
        }
    } else if (message.length === 0) {
        return {
            status: "error",
            code: 404,
            message: "الرسالة مطلوبة."
        }
    } else {
        await prisma.message.create({
            data: {
                name: name,
                email: email,
                message: message
            }
        })

        return SendMessage(true, 201, "تم إرسال الرسالة بنجاح")
    }
}

export const getMessages = async () => {
    const session = await getServerSession(authOptions)
    if(session.user.is_admin) {
        const messages = await prisma.message.findMany()

        if(messages.length > 0){
            return {
                messages: messages,
                status: "success",
                code: 404,
                message: "تم جلب البيانات بنجاح"
            }
        }else {
            return SendMessage(false, 404, "لا توجد بيانات.")
        }
    }else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const deleteMessage = async (id) => {
    const session = await getServerSession(authOptions)
    if(session.user.is_admin) {
        if (id === undefined) {
            return {
                status: "error",
                code: 404,
                message: "معرف الرسالة مطلوب."
            }
        } else {
            await prisma.message.delete({
                where: {
                    id: parseInt(id),
                }
            })
            revalidatePath("/dash/messages")
            return SendMessage(true, 201, "تم حذف الرسالة بنجاح.")
        }
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const updateStatusMessage = async (id, value) => {
    const session = await getServerSession(authOptions)
    if(session.user.is_admin) {
        await prisma.message.update({
            where: {
                id: parseInt(id),
            },
            data: {
                isReply: value
            }
        })
        revalidatePath("/dash/messages")
        return SendMessage(true, 201, "تم تحديث الرسالة بنجاح.")
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}