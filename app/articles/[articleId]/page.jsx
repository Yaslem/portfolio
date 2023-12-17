import {getPublicArticleById} from "@/app/controllers/Article";
import AddArticles from "@/app/dash/components/AddArticles";
import {redirect} from "next/navigation";
import ShowArticle from "@/app/components/ShowArticle";

export default async function page({ params }) {
    const { article, status } = await getPublicArticleById([params.articleId])
    console.log(status)
    if(status === "error"){
        return redirect("/")
    }
    return (
        <ShowArticle article={article} />
    )
}