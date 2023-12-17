import Projects from "@/app/dash/components/Projects";
import {getProjects} from "@/app/controllers/Project";

export const metadata = {
    title: 'المشاريع',
}
const page = async () => {

    const { projects, status, message } = await getProjects()

    return (
       <Projects messageEmpty={message} status={status} projects={projects} />
    )
}

export default page