import Articles from "../components/Articles";
import {getArticles} from "../../controllers/Article";

export const metadata = {
    title: 'المقالات',
}
const page = async () => {

    const { articles, status, message } = await getArticles()
    return (
       <Articles messageEmpty={message} status={status} articles={articles} />
    )
}

export default page