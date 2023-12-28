"use client"
import { motion } from "framer-motion"
import {useEffect, useState} from "react"
import Contact from "./Contact";
import Main from "./Main";
import Articles from "./Articles";
function Index() {
    const [showButton, setShowButton] = useState(false)
    useEffect(() => {
        document.addEventListener("scroll", () => {
            if (window.scrollY > 250) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        })
    }, [showButton])

    return (
        <>
            <Main />
            <div className="divider" />
            <Articles />
            <div className="divider" />
            <Contact />
            {
                showButton && (
                    <motion.a onClick={() => {
                        window.scrollTo({
                            top: 0,
                        });
                    }}

                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 1 }}

                    >
                        <button className="bg-[#1976d2d9] text-white w-11 h-11 rounded-full flex items-center justify-center fixed bottom-8 right-[3%] border border-[#ffffff33] hover:bg-[#1976d2] max-[600px]:opacity-50 max-[600px]:w-9 max-[600px]:h-9 icon-keyboard_arrow_up"></button>
                    </motion.a>
                )
            }
        </>
    )
}

export default Index
