"use server"

import { join } from "path";
import { mkdir, stat, writeFile } from "fs/promises";
const upload = async (image) => {
    const uploadDir = join(
        process.env.ROOT_DIR || process.cwd(),
        `/public/uploads/`
    );
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = Date.now() + image.name.replaceAll(" ", "_");
    try {
        await stat(uploadDir);
    } catch (e) {
        if (e.code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
        } else {
            console.error(e);
        }
    }
    await writeFile(
        uploadDir + filename,
        buffer
    );

    return filename;
}

export default upload;