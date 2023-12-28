"use server"
import {getServerSession} from "next-auth";
import authOptions from "../../helpers/Auth";
import SendMessage from "../../helpers/SendMessage";
import {revalidatePath} from "next/cache";
import prisma from "../../prisma/db"

export const createCategory = async (FormData) => {
    const session = await getServerSession(authOptions)
    if(session.user.is_admin) {
        if (FormData.get("name").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "اسم التصنيف مطلوب."
            }
        }else if(FormData.get("slug").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "الاسم اللطيف للتصنيف مطلوب."
            }
        }else if(FormData.get("type").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "نوع التصنيف مطلوب."
            }
        } else {
            await prisma.category.create({
                data: {
                    name: FormData.get("name"),
                    slug: FormData.get("slug"),
                    type: FormData.get("type"),
                }
            })
            revalidatePath("/dash/categories")
            return SendMessage(true, 201, "تم إنشاء التصنيف بنجاح.")
        }
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const updateCategory = async (FormData) => {
    const session = await getServerSession(authOptions)
    if(session.user.is_admin) {
        if (FormData.get("id").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "معرف التصنيف مطلوب."
            }
        }if (FormData.get("name").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "اسم التصنيف مطلوب."
            }
        }else if(FormData.get("slug").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "الاسم اللطيف للتصنيف مطلوب."
            }
        } else {
            await prisma.category.update({
                where: {
                    id: +FormData.get("id"),
                },
                data: {
                    name: FormData.get("name"),
                    slug: FormData.get("slug")
                }
            })
            revalidatePath("/dash/categories")
            return SendMessage(true, 201, "تم تحديث التصنيف بنجاح.")
        }
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const deleteCategory = async (id) => {
    const session = await getServerSession(authOptions)
    if(session.user.is_admin) {
        if (id === undefined) {
            return {
                status: "error",
                code: 404,
                message: "معرف التصنيف مطلوب."
            }
        } else {
            await prisma.category.delete({
                where: {
                    id: +id,
                }
            })
            revalidatePath("/dash/categories")
            return SendMessage(true, 201, "تم حذف التصنيف بنجاح.")
        }
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const getCategories = async () => {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: {
                    projects: true,
                    articles: true,
                },
            },
        }
    })

    if(categories.length > 0){
        return {
            categories: categories,
            status: "success",
            code: 404,
            message: "لا توجد بيانات."
        }
    }else {
        return {
            status: "error",
            code: 404,
            message: "لا توجد بيانات."
        }
    }
}