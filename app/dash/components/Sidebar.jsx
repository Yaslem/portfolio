"use client"
import { GoHomeFill } from "react-icons/go";
import { FaCircleInfo } from "react-icons/fa6";
import { MdArticle } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { TiThMenu } from "react-icons/ti";
import Link from "next/link"
import {usePathname} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {sideActions} from "../../../redux/slices/sideSlice";
import useDeviceSize from "../components/useDeviceSize";
var classNames = require('classnames');
const Header = () => {
  const pathName = usePathname()
    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.side.isOpen)
    const [width, height] = useDeviceSize();
  return (
      <>
          {
              width >= 640 &&
              <aside id="logo-sidebar"
                     className="w-64 h-screen pt-5 transition-transform bg-white border-l border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                     aria-label="Sidebar">
                  <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                      <ul className="space-y-2 font-medium">
                          <li>
                              <Link href="/dash"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash"
                                    })}>
                                  <GoHomeFill className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                  <span className="ms-3">الرئيسية</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/about"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/about"
                                    })}>
                                  <FaCircleInfo className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                  <span className="flex-1 ms-3 whitespace-nowrap">عني</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/messages"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/messages"
                                    })}>
                                  <svg
                                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                      aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                          d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                                  </svg>
                                  <span className="flex-1 ms-3 whitespace-nowrap">الرسائل</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/projects"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/projects"
                                    })}>
                                  <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                      <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                  </svg>
                                  <span className="flex-1 ms-3 whitespace-nowrap">المشاريع</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/articles"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/articles"
                                    })}>
                                  <MdArticle className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                  <span className="flex-1 ms-3 whitespace-nowrap">المقالات</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/categories"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/categories"
                                    })}>
                                  <BiSolidCategory className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                  <span className="flex-1 ms-3 whitespace-nowrap">التصنيفات</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/social"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/social"
                                    })}>
                                  <IoShareSocial className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                  <span className="flex-1 ms-3 whitespace-nowrap">مواقع التواصل</span>
                              </Link>
                          </li>
                      </ul>
                  </div>
              </aside>
          }
          {
              isOpen &&
                width < 640 &&
              <aside id="logo-sidebar"
                     className="w-64 h-screen absolute pt-5 transition-transform bg-white border-l border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                     aria-label="Sidebar">
                  <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                      <TiThMenu
                          className={"md:block lg:hidden text-blue-600 mb-5"}
                          onClick={() => dispatch(sideActions.isOpen(!isOpen))}
                      />
                      <ul className="space-y-2 font-medium">
                          <li>
                              <Link href="/dash"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash"
                                    })}>
                                  <GoHomeFill className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                  <span className="ms-3">الرئيسية</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/about"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/about"
                                    })}>
                                  <FaCircleInfo className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                  <span className="flex-1 ms-3 whitespace-nowrap">عني</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/messages"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/messages"
                                    })}>
                                  <svg
                                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                      aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                          d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                                  </svg>
                                  <span className="flex-1 ms-3 whitespace-nowrap">الرسائل</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/projects"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/projects"
                                    })}>
                                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                      <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                  </svg>
                                  <span className="flex-1 ms-3 whitespace-nowrap">المشاريع</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/articles"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/articles"
                                    })}>
                                  <MdArticle className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                  <span className="flex-1 ms-3 whitespace-nowrap">المقالات</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/categories"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/categories"
                                    })}>
                                  <BiSolidCategory className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                  <span className="flex-1 ms-3 whitespace-nowrap">التصنيفات</span>
                              </Link>
                          </li>
                          <li>
                              <Link href="/dash/social"
                                    className={classNames({
                                        "flex items-center text-sm p-2 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group": true,
                                        "bg-gray-100": pathName === "/dash/social"
                                    })}>
                                  <IoShareSocial className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                  <span className="flex-1 ms-3 whitespace-nowrap">مواقع التواصل</span>
                              </Link>
                          </li>
                      </ul>
                  </div>
              </aside>
          }
      </>
  )
}

export default Header