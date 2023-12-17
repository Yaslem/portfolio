"use server"
import prisma from "@/prisma/db"
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import upload from "@/helpers/Upload";
import {revalidatePath} from "next/cache";
import SendMessage from "@/helpers/SendMessage";

let session
getServerSession(authOptions).then(data => {
    session = data
})
export const createArticle = async (formData) => {
    if(session.user.is_admin) {
        if (formData.get("title").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "عنوان المقال مطلوب."
            }
        }else if(formData.get("image").length === 0 || formData.get("image").size === 0) {
            return {
                status: "error",
                code: 404,
                message: "صورة المقال مطلوبة."
            }
        }else if(formData.get("category").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "تصنيف المقال مطلوبة."
            }
        }else if(formData.get("body").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "محتوى المقال مطلوب."
            }
        }else {
            const filename = await upload(formData.get("image"))

            await prisma.article.create({
                data: {
                    title: formData.get("title"),
                    image: filename,
                    description: formData.get("body"),
                    user_id: session.user.id,
                    categoryId: parseInt(formData.get("category"))
                }
            })

            revalidatePath("/dash/articles")
            return SendMessage(true, 201, "تم إنشاء المقال بنجاح.")
        }
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const updateArticle = async (formData) => {
    if(session.user.is_admin) {
        if (formData.get("title").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "عنوان المقال مطلوب."
            }
        }else if(formData.get("category").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "تصنيف المقال مطلوبة."
            }
        }else if(formData.get("body").length === 0) {
            return {
                status: "error",
                code: 404,
                message: "محتوى المقال مطلوب."
            }
        }else {
            const article = await prisma.article.findUnique({
                where: {
                    id: parseInt(formData.get("articleId"))
                }
            })

            if(article.image === formData.get("image")){

                await prisma.article.update({
                    where: {
                        id: parseInt(formData.get("articleId"))
                    },
                    data: {
                        title: formData.get("title"),
                        description: formData.get("body"),
                        categoryId: parseInt(formData.get("category"))
                    }
                })

            }else {
                const filename = await upload(formData.get("image"))

                await prisma.article.update({
                    where: {
                        id: parseInt(formData.get("articleId"))
                    },
                    data: {
                        title: formData.get("title"),
                        description: formData.get("body"),
                        image: filename,
                        categoryId: parseInt(formData.get("category"))
                    }
                })
            }

            revalidatePath("/dash/articles")
            return SendMessage(true, 201, "تم تحديث المقال بنجاح.")
        }
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const updateStatusArticle = async (id, value) => {
    if(session.user.is_admin) {
        await prisma.article.update({
            where: {
                id: parseInt(id),
            },
            data: {
                is_public: value
            }
        })
        revalidatePath("/dash/articles")
        return SendMessage(true, 201, "تم تحديث المقال بنجاح.")
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const updateStatusCommentArticle = async (id, value) => {
    if(session.user.is_admin) {
        await prisma.article.update({
            where: {
                id: parseInt(id),
            },
            data: {
                is_comment: value
            }
        })
        revalidatePath("/dash/articles")
        return SendMessage(true, 201, "تم تحديث المقال بنجاح.")
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}
export const deleteArticle = async (id) => {
    if(session.user.is_admin) {
        if (id === undefined) {
            return {
                status: "error",
                code: 404,
                message: "معرف المشروع مطلوب."
            }
        } else {
            await prisma.article.delete({
                where: {
                    id: parseInt(id),
                }
            })
            revalidatePath("/dash/articles")
            return SendMessage(true, 201, "تم حذف المقال بنجاح.")
        }
    } else {
        return SendMessage(false, 403, "غير مسموح لك.")
    }
}

export const getArticles = async () => {
    const articles = await prisma.article.findMany({
        include: {
            category: true,
            _count: {
                select: { comments: true },
            },
        }
    })

    if(articles.length > 0){
        // return SendMessage(true, 404, "لا توجد بيانات.")
        return {
            articles: articles,
            status: "success",
            code: 404,
            message: "تم جلب البيانات بنجاح."
        }
    }else {
        return SendMessage(false, 404, "لا توجد بيانات.")
    }
}

export const getPublicArticles = async () => {
    const articles = await prisma.article.findMany({
        where: {
            is_public: true
        },
        include: {
            category: true,
            user: {
                include: {
                    about: true,
                },
            },
            _count: {
                select: { comments: true },
            },
        }
    })

    if(articles.length > 0){
        // return SendMessage(true, 404, "لا توجد بيانات.")
        return {
            articles: articles,
            status: "success",
            code: 404,
            message: "تم جلب البيانات بنجاح."
        }
    }else {
        return SendMessage(false, 404, "لا توجد بيانات.")
    }
}
export const getArticleById = async (id) => {
    const article = await prisma.article.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(article){
        // return SendMessage(true, 404, "لا توجد بيانات.")
        return {
            article: article,
            status: "success",
            code: 404,
            message: "تم جلب البيانات بنجاح."
        }
    }else {
        return SendMessage(false, 404, "لا توجد بيانات.")
    }
}
export const getPublicArticleById = async (id) => {
    const article = await prisma.article.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            category: true,
            user: {
                include: {
                    about: true,
                },
            },
            _count: {
                select: { comments: true },
            },
        }
    })

    if(article){
        // return SendMessage(true, 404, "لا توجد بيانات.")
        return {
            article: article,
            status: "success",
            code: 404,
            message: "تم جلب البيانات بنجاح."
        }
    }else {
        return SendMessage(false, 404, "لا توجد بيانات.")
    }
}
export const getCategories = async () => {
    const categories = await prisma.category.findMany({
        where: {
          type: "Article"
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