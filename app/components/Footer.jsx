import Link from "next/link";
export default function Footer() {
  return (
    <footer className='flex justify-between pb-8 max-[750px]:flex-col max-[750px]:gap-8 max-[750px]:items-center'>
      <ul className='flex gap-4 flex-wrap justify-center'>
        <li><Link className='text-title opacity-[0.9] hover:text-blue-600 hover:opacity-100 hover:text-base text-sm font-medium' href="/">الرئيسية</Link></li>
        <li><Link className='text-title opacity-[0.9] hover:text-blue-600 hover:opacity-100 hover:text-base text-sm font-medium' href="/articles">المقالات</Link></li>
        <li><Link className='text-title opacity-[0.9] hover:text-blue-600 hover:opacity-100 hover:text-base text-sm font-medium' href="/projects">المشاريع</Link></li>
        <li><Link className='text-title opacity-[0.9] hover:text-blue-600 hover:opacity-100 hover:text-base text-sm font-medium' href="/contact">تواصل معي</Link></li>
      </ul>
      <p className='text-[#717184] text-xs leading-4'>© 2023 يسلم أحمد ناجم. جميع الحقوق محفوظة.</p>
    </footer>
  )
}
