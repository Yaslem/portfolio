import About from "@/app/dash/components/About";
import {getAbout} from "@/app/controllers/About";

export const metadata = {
    title: 'عني',
}
const page = async () => {

    const { about, status } = await getAbout()

    return (
       <About status={status} about={about} />
    )
}

export default page