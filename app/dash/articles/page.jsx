import Articles from "@/app/dash/components/Articles";
import {getArticles} from "@/app/controllers/Article";

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