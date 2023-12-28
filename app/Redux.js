"use client"
import './globals.css'
import ReadexPro from './font'
import NextNProgress from 'nextjs-progressbar';
import Header from "./components/Header"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import { Provider } from 'react-redux';
import store from '../redux/store'
import { SessionProvider } from "next-auth/react";
import {usePathname} from "next/navigation";
export default function Redux({ children, session }) {
    const pathname = usePathname()
    if(pathname.startsWith("/dash") || pathname === "/register" || pathname === "/signin"){
        return (
            <html lang="ar">
            <head>
                <link rel="stylesheet" href="/style.css" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={ReadexPro.className}>
                <Provider store={store}>
                    <SessionProvider session={session}>
                        <NextNProgress options={{ showSpinner: false }} stopDelayMs={10} color="#2d5e99" />
                        {children}
                    </SessionProvider>
                </Provider>
            </body>
            </html>
        )
    }else {
        return (
            <html lang="ar">
            <head>
                <link rel="stylesheet" href="/style.css" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={ReadexPro.className + " " + "bg-primary-background"}>
                <Provider store={store}>
                    <SessionProvider session={session}>
                        <NextNProgress options={{ showSpinner: false }} stopDelayMs={10} color="#2d5e99" />
                        <div id="up" className="w-[90%] overflow-hidden max-[640px]:w-[100%] my-0 mx-auto bg-secondary-background py-0 px-4 border-2 border-primary-border">
                            <Header />
                            <Hero />
                            <div className="divider" />
                            {children}
                            <div className="divider" />
                            <Footer />
                        </div>
                    </SessionProvider>
                </Provider>
            </body>
            </html>
        )
    }

}
