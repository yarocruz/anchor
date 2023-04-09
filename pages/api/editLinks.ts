import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const linkData = JSON.parse(req.body);

        // Get prisma to update Link
        const link = await prisma.link.update({
            where: {
                id: linkData.id
            },
            data: {
                url: linkData.url,
                title: linkData.title ? linkData.title : "",
                description: linkData.description ? linkData.description : "",
                tags: {
                    connectOrCreate: linkData.tags ? linkData.tags.map((tag: string) => {
                        return {
                            where: {
                                name: tag
                            },
                            create: {
                                name: tag
                            },
                        }
                    }) : []
                }
            },
            // Include the tags when returning the updated link
            include: {
                tags: true
            }
        })

        const tagIdsToRemove = link.tags.filter(tag => !linkData.tags.includes(tag.name)).map(tag => tag.id)
        if (tagIdsToRemove.length > 0) {
            await prisma.link.update({
                where: {
                    id: linkData.id
                },
                data: {
                    tags: {
                        disconnect: tagIdsToRemove.map(id => ({ id }))
                    }
                }
            })
        }

        return res.status(200).json(link)
    } catch (error) {
        return res.status(500).json(error);
    }
}