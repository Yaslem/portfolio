import { NextResponse } from 'next/server'
import {getPublicArticles} from "../../controllers/Article";
export async function GET(request: Request) {
    const { articles, status, message } = await getPublicArticles()
    return NextResponse.json({ articles }, { status: 200 })
}