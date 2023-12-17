"use client"
import React, { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Message from "@/app/components/Message";
import Title from "@/app/components/Title";
var classNames = require('classnames');
export default function Main({categories, projects}) {
    const pathname = usePathname()
    const [projectsList, setProjectsList] = useState(projects)
  const [active, setActive] = useState("all")
  return (
      <>
          <Title title={"المشاريع"} />
          <main className={classNames({
              'flex items-start gap-4 max-[600px]:flex-col max-[600px]:items-center': true,
              'mt-10': projects !== undefined
          })}>
              {
                  projectsList === undefined
                      ? <Message message={"لا توجد مشاريع حاليا"} />
                      : <>
                          <section className='flex flex-col gap-2 max-[600px]:flex-row max-[600px]:flex-wrap max-[600px]:justify-center'>
                              <button className={classNames({
                                  "bg-main-buttons-backgraound-color text-white w-40 py-2 text-center text-base transition hover:opacity-100 rounded-md opacity-50 capitalize max-[600px]:w-28 max-[600px]:px-0 max-[600px]:py-3 max-[600px]:text-sm max-[600px]:rounded-xl px-0": true,
                                  "active": active === "all"
                              })} onClick={() => {
                                  setActive("all")
                                  setProjectsList(projects)
                              }}>جميع المشاريع</button>
                              {
                                  categories.map(category =>
                                      <button
                                          className={classNames({
                                          "bg-main-buttons-backgraound-color text-white w-40 py-2 text-center text-base transition hover:opacity-100 rounded-md opacity-50 capitalize max-[600px]:w-28 max-[600px]:px-0 max-[600px]:py-3 max-[600px]:text-sm max-[600px]:rounded-xl px-0": true,
                                          "active": active === category.id
                                      })}
                                          onClick={() => {
                                              setActive(category.id)
                                              setProjectsList(projects.filter((project) => project.categoryId === category.id))
                                          }}>
                                          {category.name}
                                      </button>
                                  )
                              }

                          </section>
                          <section className='flex flex-grow flex-wrap gap-x-4 gap-y-8 justify-center'>
                              {
                                  projectsList.length === 0
                                      ? <Message message={"لا توجد مشاريع حاليا لدى هذا التصنيف"} />
                                      : projectsList.map(project =>
                                          <article className='card-box-shadow dark:border overflow-hidden dark:border-[#5dbcfc4d] rounded-xl transition dark:bg-gradient-to-b dark:from-[#ffffff0d] dark:to-[#ffffff0d] hover:border-blue hover:rotate-1 hover:scale-100 hover:cursor-pointer'>
                                              <Image width={266} height={147} className='rounded-xl h-[147px] object-cover w-[266px]' src={"/uploads/" + project.image} />
                                              <div className='w-[266px] py-4 px-2'>
                                                  <h1 className='text-title'>{project.name}</h1>
                                                  <p className='text-sub-title text-sm mt-3 mb-4'>{project.description}</p>
                                                  <div className="flex justify-between">
                                                      <div className='flex gap-3'>
                                                          <Link href={project.link} target={"_blank"}>
                                                              <div className='icon-link text-sub-title text-base cursor-pointer hover:scale-125 hover:text-icon-hover' />
                                                          </Link>
                                                          <div className='icon-github text-sub-title text-base cursor-pointer hover:scale-125 hover:text-icon-hover' />
                                                      </div>
                                                      <a href='#' className='text-sm text-blue-color flex'>
                                                          المزيد
                                                          <span className='icon-arrow-right self-end mr-3 rotate-180' />
                                                      </a>
                                                  </div>
                                              </div>
                                          </article>
                                  )
                              }
                          </section>
                      </>
              }
      </main>
      </>

  )
}