"use server"
import Articles from "../components/Articles";
import {getPublicArticles} from "../controllers/Article";

export const metadata = {
    title: 'المقالات',
}
export default async function Page()  {
    const { articles, status, message } = await getPublicArticles()
  return (
    <Articles articles={articles} status={status} />
  )
}