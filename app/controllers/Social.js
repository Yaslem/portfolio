"use server"
import {getServerSession} from "next-auth";
import authOptions from "../../helpers/Auth";
import SendMessage from "../../helpers/SendMessage";
import {revalidatePath} from "next/cache";
import prisma from "../../prisma/db"


export const createSocial = async ({
    facebook,
    twitter,
    instagram,
    tiktok,
    github,
    linkedin,
    id
}) => {
    const session = await getServerSession(authOptions)
    if(session.user.is_admin) {
        if(id === null) {
            await prisma.social.create({
                data: {
                    facebook,
                    twitter,
                    tiktok,
                    instagram,
                    github,
                    linkedin,
                    user_id: session.user.id,
                }
            })
            revalidatePath("/dash/social")
            return SendMessage(true, 201, "تم إنشاء روابط مواقع التواصل بنجاح.")
        }else {
            await prisma.social.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    facebook,
                    twitter,
                    tiktok,
                    instagram,
                    github,
                    linkedin
                }
            })
            revalidatePath("/dash/social")
            return SendMessage(true, 201, "تم تحديث روابط مواقع التواصل بنجاح.")
        }
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}
export const getSocial = async () => {
    const social = await prisma.social.findFirst()
    if(social){
        return {
            social: social,
            status: "success",
            code: 404,
            message: "تم جلب البيانات بنجاح."
        }
    }else {
        return SendMessage(false, 404, "لا توجد بيانات.")
    }
}