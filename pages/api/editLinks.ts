import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const linkData = JSON.parse(req.body);
        if (req.method === "POST") {
            // check for link content
            if (!linkData.url) {
                return res.status(400).json({error: "Link content is required"})
            }
            try {
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
                                    }
                                }
                            }) : []
                        }
                    }
                })
                return res.status(200).json(link)
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}