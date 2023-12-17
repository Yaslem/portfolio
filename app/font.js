import localFont from 'next/font/local'

const ReadexPro = localFont({
    src: [
        {
            path: '../public/fonts/ReadexProExtraLight.ttf',
            weight: '200',
            style: 'extra',
        },
        {
            path: '../public/fonts/ReadexPro-Light.ttf',
            weight: '300',
            style: 'light',
        },
        {
            path: '../public/fonts/ReadexProRegular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/ReadexProMedium.ttf',
            weight: '500',
            style: 'medium',
        },
        {
            path: '../public/fonts/ReadexPro-SemiBold.ttf',
            weight: '600',
            style: 'semi bold',
        },
        {
            path: '../public/fonts/ReadexPro-Bold.ttf',
            weight: '700',
            style: 'bold',
        },
    ],
})

export default ReadexPro