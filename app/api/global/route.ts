import {getAbout} from "../../controllers/About";
import { NextResponse } from 'next/server'
import {getSocial} from "../../controllers/Social";
export async function GET(request: Request) {
    const { about } = await getAbout()
    const { social } = await getSocial()
    return NextResponse.json({ about, social }, { status: 200 })
}