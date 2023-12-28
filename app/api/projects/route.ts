import { NextResponse } from 'next/server'
import {getCategories, getPublicProjects} from "../../controllers/Project";
export async function GET(request: Request) {
    const { categories, status: statusCategories, message: messageCategories } = await getCategories()
    const { projects, status: statusProjects, message: messageProjects } = await getPublicProjects()
    return NextResponse.json({ projects, categories }, { status: 200 })
}