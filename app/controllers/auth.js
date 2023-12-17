"use server"
import { getServerSession } from "next-auth";
import prisma from "@/prisma/db"
import { hash } from 'bcrypt'
import { authOptions } from "../api/auth/[...nextauth]/route";
import SendMessage from "@/helpers/SendMessage";

export const register = async (inputs) => {
    const session = await getServerSession(authOptions);
    if (session) {
        return {
            status: "error",
            code: 404,
            message: "المستخدم مسجل الدخول."
        }
    } else {
        const checkUser = await prisma.user.findUnique({
            where: {
                email: inputs.email,
            },
        })
    
        if (checkUser) {
            return SendMessage(false, 404, "المستخدم موجود بالفعل")
        }
    
        const hashPassword = await hash(inputs.password, 12)
        await prisma.user.create({
            data: {
                email: inputs.email,
                name: inputs.name,
                password: hashPassword,
            }
        })

        return SendMessage(true, 201, "تم إنشاء المستخدم بنجاح")
    }
}