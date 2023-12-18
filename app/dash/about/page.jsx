import About from "../components/About";
import {getAbout} from "../../controllers/About";

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