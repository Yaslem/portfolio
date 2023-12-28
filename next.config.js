/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: "http://localhost:3000",
        SITE_TITLE: "يسلم أحمد ناجم",
        BASE_URL_API: process.env.BASE_URL + "/api",
        DATABASE_URL: "mysql://root:@localhost:3306/portfolio",
        NEXTAUTH_URL: process.env.BASE_URL,
        SECRET: "0d256b914bacf54e340a10177355a916",
    }
}

module.exports = nextConfig
