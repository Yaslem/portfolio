import Categories from "../components/Categories";
import {getCategories} from "../../controllers/Category";

export const metadata = {
    title: 'التصنيفات',
}
const page = async () => {

    const { categories, status, message } = await getCategories()
    return (
       <Categories messageEmpty={message} status={status} categories={categories} />
    )
}

export default page