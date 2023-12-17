import AddProject from "@/app/dash/components/AddProject";
import {getCategories} from "@/app/controllers/Project";

export const metadata = {
    title: 'إضافة مشروع',
}
export default async function page() {
    const { categories, status } = await getCategories()


    return (
        <AddProject categories={categories} />
    )
}