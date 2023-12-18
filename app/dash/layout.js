import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import {getAbout} from "../controllers/About";

export const metadata = {
    title: {
        template: "%s | صفحة القيادة",
        default: "صفحة القيادة"
    },
}
const layout = async ({ children }) => {
    const { about } = await getAbout()
    return (
        <section className="flex">
            <Sidebar />
            <main className="w-[100%]">
                <Header about={about} />
                <div className={"p-4 bg-slate-50 h-[calc(100vh-57px)] overflow-y-scroll"}>
                    {children}
                </div>
            </main>
        </section>
    )
}

export default layout