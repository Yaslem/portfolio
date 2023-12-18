"use server"
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import upload from "@/helpers/Upload";
import {revalidatePath} from "next/cache";
import SendMessage from "@/helpers/SendMessage";
import prisma from "@/prisma/db"

export const createProject = async (FormData) => {
    const session = await getServerSession(authOptions)
    if(session.user.is_admin) {
        if (FormData.get("name").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "اسم المشروع مطلوب."
            }
        }else if(FormData.get("image").size === 0) {
            return {
                status: "error",
                code: 404,
                message: "صورة المشروع مطلوبة."
            }
        }else if(FormData.get("categoryId").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "تصنيف المشروع مطلوبة."
            }
        }else if(FormData.get("description").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "وصف المشروع مطلوب."
            }
        }else {
            const filename = await upload(FormData.get("image"))

            await prisma.project.create({
                data: {
                    name: FormData.get("name"),
                    description: FormData.get("description"),
                    image: filename,
                    link: FormData.get("link"),
                    // github: FormData.get("github"),
                    userId: session.user.id,
                    categoryId: parseInt(FormData.get("categoryId")),
                }
            })

            revalidatePath("/dash/projects")
            return SendMessage(true, 201, "تم إنشاء المشروع بنجاح.")
        }
    }else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const updateProject = async (FormData) => {
    const session = await getServerSession(authOptions)
    if(session.user.is_admin) {
        if (FormData.get("id").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "معرف المشروع مطلوب."
            }
        }if (FormData.get("name").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "اسم المشروع مطلوب."
            }
        }else if(FormData.get("link").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "رابط المشروع مطلوب."
            }
        }else if(FormData.get("description").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "وصف المشروع مطلوب."
            }
        } else {
            await prisma.project.update({
                where: {
                    id: parseInt(FormData.get("id")),
                },
                data: {
                    name: FormData.get("name"),
                    description: FormData.get("description"),
                    link: FormData.get("link")
                }
            })
            revalidatePath("/dash/projects")
            return SendMessage(true, 201, "تم تحديث المشروع بنجاح.")
        }
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const updateStatusProject = async (id, value) => {
    const session = await getServerSession(authOptions)
    if(session.user.is_admin) {
        await prisma.project.update({
            where: {
                id: parseInt(id),
            },
            data: {
                is_public: value
            }
        })
        revalidatePath("/dash/projects")
        return SendMessage(true, 201, "تم تحديث المشروع بنجاح.")
    }else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}
export const deleteProject = async (id) => {
    const session = await getServerSession(authOptions)
    if(session.user.is_admin){
        if (id === undefined) {
            return {
                status: "error",
                code: 404,
                message: "معرف المشروع مطلوب."
            }
        } else {
            await prisma.project.delete({
                where: {
                    id: +id,
                }
            })
            revalidatePath("/dash/projects")
            return SendMessage(true, 201, "تم حذف المشروع بنجاح.")
        }
    }else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const getProjects = async () => {
    const projects = await prisma.project.findMany({
        include: {
            category: true,
        }
    })

    if(projects.length > 0){
        // return SendMessage(true, 404, "لا توجد بيانات.")
        return {
            projects: projects,
            status: "success",
            code: 404,
            message: "لا توجد بيانات."
        }
    }else {
        return SendMessage(false, 404, "لا توجد بيانات.")
    }
}

export const getPublicProjects = async () => {
    const projects = await prisma.project.findMany({
        where: {
            is_public: true
        },
        include: {
            category: true,
        }
    })

    if(projects.length > 0){
        // return SendMessage(true, 404, "لا توجد بيانات.")
        return {
            projects: projects,
            status: "success",
            code: 404,
            message: "لا توجد بيانات."
        }
    }else {
        return SendMessage(false, 404, "لا توجد بيانات.")
    }
}

export const getCategories = async () => {
    const categories = await prisma.category.findMany({
        where: {
            type: "Project"
        },
        select: {
            id: true,
            name: true,
            slug: true
        },
    })

    if(categories.length > 0){
        return {
            categories: categories,
            status: "success",
            code: 404,
            message: "لا توجد بيانات."
        }
    }else {
        return SendMessage(false, 404, "لا توجد بيانات.")
    }
}