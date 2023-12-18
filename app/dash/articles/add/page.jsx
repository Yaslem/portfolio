import {getCategories} from "../../../controllers/Article";
import AddArticles from "../../components/AddArticles";

export const metadata = {
    title: 'إضافة مقال',
}

export default async function page() {
    const { categories, status } = await getCategories()


    return (
        <AddArticles categories={categories} />
    )
}