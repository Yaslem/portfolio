import { useEffect, useState } from "react";
import Link from "next/link";
export default function Header() {
  const [showModel, setShowModel] = useState(false);
  const [theme, setTheme] = useState();

  useEffect(() => {
      setTheme(localStorage.getItem("theme") ?? "light")
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light")
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark")
    }
  }, [theme])

  return (
    <header className="flex justify-between px-9 max-[640px]:px-0 pt-5">
      <button onClick={() => setShowModel(true)} className="icon-menu flex md:hidden bg-header-background h-10 w-10 justify-center items-center rounded-full text-sub-title primary-border-header transition primary-shadow hover:text-title hover:border-primary-border-hover" />
      <div />
      <nav className="bg-header-background py-3 px-6 rounded-[55px] hidden md:block nav-box-shadow shadow-sm">
        <ul className="flex gap-4">
          <li><Link className="text-title opacity-[0.9] hover:text-blue-600 hover:opacity-100 hover:text-base text-sm font-medium" href="/">الرئيسية</Link></li>
          <li><Link className="text-title opacity-[0.9] hover:text-blue-600 hover:opacity-100 hover:text-base text-sm font-medium" href="/articles">المقالات</Link></li>
          <li><Link className="text-title opacity-[0.9] hover:text-blue-600 hover:opacity-100 hover:text-base text-sm font-medium" href="/projects">المشاريع</Link></li>
          <li><Link className="text-title opacity-[0.9] hover:text-blue-600 hover:opacity-100 hover:text-base text-sm font-medium" href="/contact">تواصل معي</Link></li>
        </ul>
      </nav>
      <button onClick={() => {
        localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
        const newTheme = localStorage.getItem("theme")
        setTheme(newTheme);
      }} className="bg-header-background h-10 w-10 justify-center items-center rounded-full text-sub-title primary-border-header transition primary-shadow hover:text-title hover:border-primary-border-hover flex text-lg">
        <span className={ theme === "dark" ? "icon-moon-o" : "icon-sun"} />
      </button>
      {showModel && (
        <div className="fixed inset-0 bg-[#5c5c914b] z-10 backdrop-blur" onClick={() => setShowModel(false)}>
          <ul className="w-3/4 my-0 menue-model mx-auto mt-8 rounded-2xl py-4 px-8 bg-secondary-background">
            <li className="pt-1 -mb-4 text-left">
              <button className="icon-close text-sub-title text-xl transition hover:text-[#FF8080] hover:text-2xl hover:rotate-180" onClick={() => setShowModel(false)} />
            </li>
              <li className="pt-2 pb-3 border-b dark:text-white border-primary-border"><Link className="hover:text-base text-sm font-medium" href="/">الرئيسية</Link></li>
              <li className="pt-2 pb-3 border-b dark:text-white border-primary-border"><Link className="hover:text-base text-sm font-medium" href="/articles">المقالات</Link></li>
              <li className="pt-2 pb-3 border-b dark:text-white border-primary-border"><Link className="hover:text-base text-sm font-medium" href="/projects">المشاريع</Link></li>
              <li className="pt-2 dark:text-white"><Link className="text-base font-medium" href="/contact">تواصل معي</Link></li>
          </ul>
        </div>
      )}
    </header>
  )
}
