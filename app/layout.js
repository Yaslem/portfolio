import Redux from './Redux'
import './globals.css'
import {getAbout} from "@/app/controllers/About";
import {getSocial} from "@/app/controllers/Social";


export const metadata = {
  title: {
    template: "%s | يسلم أحمد ناجم",
    default: "يسلم أحمد ناجم"
  },
  description: 'يسلم أحمد ناجم، مطور مواقع الويب، وطالب شرعي. قمت ببرمجة العديد من المواقع، أسعى لبرمجة وابتكار حلول تقنية تساعد في إثراء المجتمع التقني.',
  category: 'programming',
  generator: 'Nextjs',
  applicationName: 'يسلم أحمد ناجم',
  referrer: 'origin-when-cross-origin',
  keywords: ['يسلم أحمد ناجم', 'يسلم الشنقيطي', 'البرمجة يسلم', 'Yeslem Ahmed Najem'],
  authors: [{ name: 'يسلم أحمد ناجم' }, { name: 'Yeslem Ahmed Najem', url: 'https://nextjs.org' }],
  creator: 'يسلم أحمد ناجم',
  publisher: 'يسلم أحمد ناجم',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://acme.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: '/favicon.png',
    title: 'يسلم أحمد ناجم',
    description: 'يسلم أحمد ناجم، مطور مواقع الويب، وطالب شرعي. قمت ببرمجة العديد من المواقع، أسعى لبرمجة وابتكار حلول تقنية تساعد في إثراء المجتمع التقني.',
    url: 'https://nextjs.org',
    siteName: 'يسلم أحمد ناجم',
    locale: 'ar_MR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({ children }) {

  const { about } = await getAbout()
  const { social } = await getSocial()

  return (
    <Redux social={social} about={about}>
        {children}
    </Redux>
  )
}
