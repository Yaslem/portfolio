import Redux from './Redux'
import './globals.css'
import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL_API;

export const metadata = {
  title: {
    template: `%s | ${process.env.SITE_TITLE}`,
    default: process.env.SITE_TITLE
  },
  description: 'يسلم أحمد ناجم، مطور مواقع الويب، وطالب شرعي. قمت ببرمجة العديد من المواقع، أسعى لبرمجة وابتكار حلول تقنية تساعد في إثراء المجتمع التقني.',
  category: 'programming',
  generator: process.env.SITE_TITLE,
  applicationName: process.env.SITE_TITLE,
  referrer: 'origin-when-cross-origin',
  keywords: [process.env.SITE_TITLE, 'يسلم الشنقيطي', 'البرمجة يسلم', 'Yeslem Ahmed Najem'],
  authors: [{ name: process.env.SITE_TITLE }, { name: 'Yeslem Ahmed Najem', url: 'https://yeslem.dev' }],
  creator: process.env.SITE_TITLE,
  publisher: process.env.SITE_TITLE,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://yeslem.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: '/favicon.png',
    title: process.env.SITE_TITLE,
    description: `${process.env.SITE_TITLE}، مطور مواقع الويب، وطالب علم شرعي. قمت ببرمجة العديد من المواقع، أسعى لبرمجة وابتكار حلول تقنية تساعد في إثراء المجتمع التقني.`,
    url: 'https://yeslem.dev',
    siteName: process.env.SITE_TITLE,
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

  return (
    <Redux>
        {children}
    </Redux>
  )
}
