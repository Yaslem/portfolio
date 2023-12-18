import {getSocial} from "../../controllers/Social";
import Social from "../components/Social";

export const metadata = {
    title: 'روابط التواصل الاجتماعي',
}
const page = async () => {

    const { social, status } = await getSocial()
    console.log(status)
    return (
       <Social status={status} social={social} />
    )
}

export default page