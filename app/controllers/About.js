"use server"
import {getServerSession} from "next-auth";
import SendMessage from "../../helpers/SendMessage";
import {revalidatePath} from "next/cache";
import prisma from "../../prisma/db"
import upload from "../../helpers/Upload";
import authOptions from "../../helpers/Auth";

export const createAbout = async (formData) => {
    const session = await getServerSession(authOptions)

    if(session.user.is_admin) {
        if(formData.get("name").length === 0){
            return {
                status: "error",
                code: 404,
                message: "لاسم مطلوب."
            }
        } else if(formData.get("title").length === 0){
            return {
                status: "error",
                code: 404,
                message: "العنوان مطلوب."
            }
        } else if (formData.get("des").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "الوصف مطلوب."
            }
        } else if(formData.get("image").length === 0 || formData.get("image").size === 0) {
            return {
                status: "error",
                code: 404,
                message: "الصورة مطلوبة."
            }
        } else {
            if(formData.get("id") !== "null") {
                const about = await prisma.about.findUnique({
                    where: {
                        id: parseInt(formData.get("id"))
                    }
                })
                if(about.image === formData.get("image")){
                    await prisma.about.update({
                        where: {
                            id: parseInt(formData.get("id")),
                        },
                        data: {
                            name: formData.get("name"),
                            title: formData.get("title"),
                            description: formData.get("des")
                        }
                    })
                }else {
                    const filename = await upload(formData.get("image"))
                    await prisma.about.update({
                        where: {
                            id: parseInt(formData.get("id")),
                        },
                        data: {
                            name: formData.get("name"),
                            title: formData.get("title"),
                            description: formData.get("des"),
                            image: filename
                        }
                    })
                }
                revalidatePath("/dash/about")
                return SendMessage(true, 201, "تم تحديث البيانات بنجاح")
            }else {
                const filename = await upload(formData.get("image"))
                await prisma.about.create({
                    data: {
                        name: formData.get("name"),
                        title: formData.get("title"),
                        description: formData.get("des"),
                        image: filename,
                        user_id: session.user.id
                    }
                })

                revalidatePath("/dash/about")
                return SendMessage(true, 201, "تم إنشاء البيانات بنجاح")
            }
        }
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const getAbout = async () => {
    const about = await prisma.about.findFirst({
        select: {
            id: true,
            name: true,
            title: true,
            image: true,
            description: true
        },
    })

    if(about){
        return {
            about: about,
            status: "success",
            code: 404,
            message: "تم جلب البيانات بنجاح."
        }
    }else {
        return SendMessage(false, 404, "لا توجد بيانات.")
    }
}