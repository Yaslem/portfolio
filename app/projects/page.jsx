
export const dynamic = 'force-dynamic';
import Main from "../components/Main";
import {getCategories, getPublicProjects} from "../controllers/Project";

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