import {getPublicArticleById} from "../../controllers/Article";
import {redirect} from "next/navigation";
import ShowArticle from "../../components/ShowArticle";

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