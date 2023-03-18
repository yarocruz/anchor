import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    try {
        const linkData = JSON.parse(req.body);

        if (req.method === "POST") {
            // check for link content
            if (!linkData.url) {
                return res.status(400).json({error: "Link content is required"})
            }
            try {

                const userData = await prisma.user.findUnique({
                    where: {
                        email: session?.user?.email!
                    }
                })
                const link = await prisma.link.create({
                    data: {
                        url: linkData.url,
                        title: linkData.title ? linkData.title : "",
                        userId: userData?.id!,
                        description: linkData.description ? linkData.description : "",
                        tags: {
                            create: linkData.tags ? linkData.tags.map((tag: string) => {
                                return {
                                    name: tag,
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