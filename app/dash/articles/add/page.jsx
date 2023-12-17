import {getCategories} from "@/app/controllers/Article";
import AddArticles from "@/app/dash/components/AddArticles";

export const metadata = {
    title: 'إضافة مقال',
}

export default async function page() {
    const { categories, status } = await getCategories()


    return (
        <AddArticles categories={categories} />
    )
}