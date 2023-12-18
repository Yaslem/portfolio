import {getArticleById, getCategories} from "../../../../controllers/Article";
import AddArticles from "../../../components/AddArticles";
import {redirect} from "next/navigation";

export const metadata = {
    title: 'تعديل مقال',
}
export default async function page({ params }) {
    const { categories } = await getCategories()
    const { article, status } = await getArticleById([params.articleId])
    if(status === "error"){
       return redirect("/dash")
    }
    return (
        <AddArticles isEdit={true} article={article} categories={categories} />
    )
}