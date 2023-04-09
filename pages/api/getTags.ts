import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Get prisma to fetch only the Tags that are connected to Links
    const data = await prisma.tag.findMany({
        where: {
            links: {
                some: {
                    id: {
                        not: undefined
                    }
                }
            }
        }
    })
    return res.status(200).json(data)
}