import Projects from "../components/Projects";
import {getProjects} from "../../controllers/Project";

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