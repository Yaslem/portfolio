
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Message from "@/app/components/Message";
import Title from "@/app/components/Title";
import parse from 'html-react-parser';

const Articles = ({articles, status}) => {
    const getDate = (date) => {
        let days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

        return  <section>
            <strong>{days[date.getDay()]}، </strong>
            <span dir={"ltr"}>{`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}</span>
        </section>
    }

    return (
        <section>
            <Title title={"المقالات"} />
            {
                articles === undefined
                    ? <Message message={"لا توجد مقالات حتى الآن"} />
                    : <article className={"grid mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                        {
                            articles.map(article =>
                                <Link href={"/articles/" + article.id}>
                                    <div className={"flex gap-4 overflow-hidden flex-col bg-white dark:bg-gray-50 border-2 hover:border-blue-600 rounded-xl"}>
                                        <Image className={"w-full object-cover border-b-2 h-[200px]"} width={100} height={100} src={"/uploads/" + article.image} alt={"صورة المقال"} />
                                        <div className={"flex flex-col p-2 gap-2"}>
                                            <h2 className={"text-lg font-bold text-blue-600"}>{article.title}</h2>
                                            <p className={"text-sm text-gray-500"}>
                                                {
                                                    article.description.length <= 150
                                                        ? parse(article.description)
                                                        : parse(article.description.slice(0, 155))
                                                }
                                            </p>
                                        </div>
                                        <hr className={"border"} />
                                        <div className={"flex p-2 items-center gap-2"}>
                                            <Image className={"rounded-full object-cover w-[40px] h-[40px] border-2"} width={30} height={30} src={"/uploads/" + article.user.about.image} alt={"صورة الكاتب"} />
                                            <div className={"flex flex-col gap-2"}>
                                                <h3 className={"text-sm font-medium text-gray-500"}>{article.user.name}</h3>
                                                <p className={"text-xs text-gray-500"}>{getDate(article.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    </article>
            }
        </section>
    )
}

export default Articles