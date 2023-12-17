"use client"
import {useState} from "react";
import Toaster from "@/app/dash/components/Toaster";
import {createSocial} from "@/app/controllers/Social";

export default function Social({social, status}) {
    const [facebook, setFacebook] = useState(status === "success" ? social.facebook : "")
    const [twitter, setTwitter] = useState(status === "success" ? social.twitter : "")
    const [instagram, setInstagram] = useState(status === "success" ? social.instagram : "")
    const [tiktok, setTiktok] = useState(status === "success" ? social.tiktok : "")
    const [github, setGithub] = useState(status === "success" ? social.github : "")
    const [linkedin, setLinkedin] = useState(status === "success" ? social.linkedin : "")
    const [id, setId] = useState(status === "success" ? social.id : null)

    const [isShow, setShow] = useState(false)

    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            { isShow && <Toaster message={message} /> }
            <section>
                <form className={"flex flex-col gap-4"} action={ async () => {
                    const { status, message } = await createSocial({
                        facebook,
                        twitter,
                        instagram,
                        tiktok,
                        github,
                        linkedin,
                        id
                    })
                    if(status === "success"){
                        setMessage(message)
                        setShow(true)
                    }
                }}>
                    <div className={"flex flex-col gap-2"}>
                        <label htmlFor={"facebook"} className={"text-sm cursor-pointer w-fit"}>فيسبوك</label>
                        <input
                            className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                            type={"text"}
                            name={"facebook"}
                            id={"facebook"}
                            autoComplete={"facebook"}
                            placeholder={"اكتب هنا رابط الحساب على فيسبوك"}
                            defaultValue={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <label htmlFor={"twitter"} className={"text-sm cursor-pointer w-fit"}>تويتر</label>
                        <input
                            className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                            type={"text"}
                            name={"twitter"}
                            id={"twitter"}
                            autoComplete={"twitter"}
                            placeholder={"اكتب هنا رابط الحساب على تويتر"}
                            defaultValue={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <label htmlFor={"instagram"} className={"text-sm cursor-pointer w-fit"}>انستغرام</label>
                        <input
                            className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                            type={"text"}
                            name={"instagram"}
                            id={"instagram"}
                            autoComplete={"instagram"}
                            placeholder={"اكتب هنا رابط الحساب على انستغرام"}
                            defaultValue={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <label htmlFor={"tiktok"} className={"text-sm cursor-pointer w-fit"}>تكتوك</label>
                        <input
                            className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                            type={"text"}
                            name={"tiktok"}
                            id={"tiktok"}
                            autoComplete={"tiktok"}
                            placeholder={"اكتب هنا رابط الحساب على تكتوك"}
                            defaultValue={tiktok}
                            onChange={(e) => setTiktok(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <label htmlFor={"github"} className={"text-sm cursor-pointer w-fit"}>جيت هب</label>
                        <input
                            className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                            type={"text"}
                            name={"github"}
                            id={"github"}
                            autoComplete={"github"}
                            placeholder={"اكتب هنا رابط الحساب على جيت هب"}
                            defaultValue={github}
                            onChange={(e) => setGithub(e.target.value)}
                        />
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <label htmlFor={"linkedin"} className={"text-sm cursor-pointer w-fit"}>لنكد ان</label>
                        <input
                            className={"text-gray-700 rounded-xl h-10 focus:outline-0 focus:ring-2 focus:ring-blue-500 p-2 text-xs border"}
                            type={"text"}
                            name={"linkedin"}
                            id={"linkedin"}
                            autoComplete={"linkedin"}
                            placeholder={"اكتب هنا رابط الحساب على لنكد ان"}
                            defaultValue={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                        />
                    </div>
                    <button disabled={isLoading} className={"w-20 text-center border-2 border-gray-200 hover:bg-neutral-800 p-2 rounded-xl bg-stone-950 text-white font-medium"}>حفظ</button>
                </form>
            </section>
        </>
    )
}