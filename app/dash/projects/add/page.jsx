import AddProject from "../../components/AddProject";
import {getCategories} from "../../../controllers/Project";

export const metadata = {
    title: 'إضافة مشروع',
}
export default async function page() {
    const { categories, status } = await getCategories()


    return (
        <AddProject categories={categories} />
    )
}