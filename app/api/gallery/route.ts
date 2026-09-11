import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const categories = [
    "laser",
    "hair",
    "depilation",
    "massage",
    "pedicure",
    "manicure",
    "lashes",
];

const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
];

export async function GET() {
    try {
        const galleryPath = path.join(
            process.cwd(),
            "public",
            "images",
            "gallery"
        );

        const result = categories.map(
            (category) => {
                const categoryPath =
                    path.join(
                        galleryPath,
                        category
                    );

                if (
                    !fs.existsSync(
                        categoryPath
                    )
                ) {
                    return {
                        id: category,
                        images: [],
                    };
                }

                const files =
                    fs.readdirSync(
                        categoryPath
                    );

                const images = files
                    .filter((file) =>
                        allowedExtensions.includes(
                            path.extname(
                                file
                            ).toLowerCase()
                        )
                    )
                    .sort(
                        (a, b) =>
                            a.localeCompare(
                                b,
                                undefined,
                                {
                                    numeric: true,
                                    sensitivity:
                                        "base",
                                }
                            )
                    )
                    .map((file) => ({
                        src: `/images/gallery/${category}/${file}`,
                        name: file,
                    }));

                return {
                    id: category,
                    images,
                };
            }
        );

        return NextResponse.json(
            result
        );
    } catch (error) {
        console.error(
            "Gallery API error:",
            error
        );

        return NextResponse.json(
            {
                error:
                    "Failed to load gallery",
            },
            {
                status: 500,
            }
        );
    }
}