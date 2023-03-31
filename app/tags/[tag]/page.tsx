import Link from "next/link";
import getTag from "../../../pages/lib/getTag";
import prisma from "@/prisma/client";
export default async function TagPage({ params: { tag } }: { params: { tag: string } }) {
    const tagData = await prisma.tag.findFirst({
        where: {
            name: tag
        }
    })

    const data = await getTag(tagData?.id!)

    return (
        <main className="container mx-auto my-2 w-auto p-2">
            <h1 className="my-5 font-bold text-orange-600 underline text-3xl">{data.name}</h1>
            <div className="my-5">
                {data.links.map((link) => (
                    <div key={link.id} className="py-3 border-b-gray-100 border-b-2">
                        <p
                            className="break-words"
                        >
                            <a
                                className="text-orange-600"
                                target="_blank"
                                href={link.url}
                            >{link.title ? link.title : link.url}</a>
                        </p>
                        <p>{link.description ? link.description : null}</p>
                    </div>
                ))}

            </div>
        </main>
    )
}
