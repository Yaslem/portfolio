"use client"
import Image from "next/image"
import { TbLogout2 } from "react-icons/tb";
import {signOut} from "next-auth/react";
import {sideActions} from "../../../redux/slices/sideSlice";
import {TiThMenu} from "react-icons/ti";
import {useDispatch, useSelector} from "react-redux";
import useDeviceSize from "../components/useDeviceSize";

const Header = ({about}) => {
    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.side.isOpen)
    const [width, height] = useDeviceSize();
  return (
    <header className="flex p-2 justify-between items-center border-b">
        {
            width < 640 &&
            <TiThMenu
                className={"md:block lg:hidden text-blue-600"}
                onClick={() => dispatch(sideActions.isOpen(!isOpen))}
            />
        }
        {
            width > 400 &&
            <p className={"font-medium text-sm text-blue-500"}>مرحبا بالمبرمج {about?.name}!</p>
        }
        <div className={"flex items-center gap-4"}>
            <Image className={"rounded-full object-cover w-[40px] h-[40px] border-2"} alt={"صورة يسلم أحمد ناجم"} width={40} height={40} src={"/api/uploads/" + about?.image} />
            <TbLogout2 onClick={() => signOut()} className={"text-2xl text-red-500"} />
        </div>
    </header>
  )
}

export default Header