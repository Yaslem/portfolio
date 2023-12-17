
import Articles from "@/app/components/Articles";
import {getPublicArticles} from "@/app/controllers/Article";

export const metadata = {
    title: 'المقالات',
}
const page = async () => {
    const { articles, status, message } = await getPublicArticles()
  return (
    <Articles articles={articles} status={status} />
  )
}

export default page