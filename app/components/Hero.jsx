import Lottie from "lottie-react";
import dev from "../animations/dev.json";
import Link from "next/link";

export default function Hero(data) {
    const about = data.data.about
    const social = data.data.social
  return (
    <section className='mt-12 flex'>
      <div className='flex-grow'>
        <div className='flex items-end gap-6'>
          <img alt={"صورة يسلم أحمد ناجم"} src={"/uploads/" + about.image} className='w-[88px] h-[88px] object-cover border border-[darkorange] rounded-full p-[1px] shadow-[2px 2px 40px rgba(255, 255, 255, 0.521) inset]' />
          <div className='icon-verified text-blue-color text-base mb-1' />
        </div>
        <h1 className='text-title leading-[48px] text-3xl font-bold my-6 mx-0'>{about.title}</h1>
        <p className='text-sub-title text-justify text-base leading-7 mb-8'>{about.description}</p>
        <div className="flex gap-5 text-lg transition text-sub-title">
            <Link href={social?.facebook || "#"} target={"_blank"}>
                <div className="hover:scale-150 hover:cursor-pointer hover:text-icon-hover icon-facebook" />
            </Link>
            <Link href={social?.twitter || "#"} target={"_blank"}>
                <div className="hover:scale-150 hover:cursor-pointer hover:text-icon-hover icon-twitter" />
            </Link>
            <Link href={social?.instagram || "#"} target={"_blank"}>
                <div className="hover:scale-150 hover:cursor-pointer hover:text-icon-hover icon-instagram" />
            </Link>
            <Link href={social?.github || "#"} target={"_blank"}>
                <div className="hover:scale-150 hover:cursor-pointer hover:text-icon-hover icon-github" />
            </Link>
            <Link href={social?.linkedin || "#"} target={"_blank"}>
                <div className="hover:scale-150 hover:cursor-pointer hover:text-icon-hover icon-linkedin" />
            </Link>
        </div>
      </div>
      <div className='max-[600px]:hidden animation'>
      <Lottie animationData={dev} />
      </div>
    </section>
  )
}
