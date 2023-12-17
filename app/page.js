import Index from "@/app/components";
import {getCategories, getPublicProjects} from "@/app/controllers/Project";
import {getPublicArticles} from "@/app/controllers/Article";

const page = async () => {
  const { categories, status: statusCategories, message: messageCategories } = await getCategories()
  const { projects, status: statusProjects, message: messageProjects } = await getPublicProjects()
  const { articles, status, message } = await getPublicArticles()
  return (
      <Index articles={articles} categories={categories} projects={projects} />
  )
}

export default page