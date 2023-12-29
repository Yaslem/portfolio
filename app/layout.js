export const dynamic = 'force-dynamic';
import Redux from './Redux'
import './globals.css'
import {getAbout} from "./controllers/About";
import {getSocial} from "./controllers/Social";


export const metadata = {
  title: {
    template: `%s | ${process.env.SITE_TITLE}`,
    default: process.env.SITE_TITLE
  },
  description: process.env.SITE_DESCRIPTION,
  category: 'programming',
  generator: process.env.SITE_TITLE,
  applicationName: process.env.SITE_TITLE,
  referrer: 'origin-when-cross-origin',
  keywords: [process.env.SITE_TITLE, 'يسلم الشنقيطي', 'البرمجة يسلم', 'Yeslem Ahmed Najem'],
  authors: { name: process.env.SITE_TITLE, url: process.env.BASE_URL },
  creator: process.env.SITE_TITLE,
  publisher: process.env.SITE_TITLE,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL(process.env.BASE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: '/favicon.png',
    title: process.env.SITE_TITLE,
    description: process.env.SITE_DESCRIPTION,
    url: process.env.BASE_URL,
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

  const { about } = await getAbout()
  const { social } = await getSocial()

  return (
    <Redux social={social} about={about}>
        {children}
    </Redux>
  )
}
