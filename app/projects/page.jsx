import Main from "@/app/components/Main";
import {getCategories, getPublicProjects} from "@/app/controllers/Project";

export const metadata = {
    title: 'المشاريع',
}
const page = async () => {
    const { categories, status: statusCategories, message: messageCategories } = await getCategories()
    const { projects, status: statusProjects, message: messageProjects } = await getPublicProjects()
    return (
        <Main categories={categories} projects={projects} />
    )
}

export default page