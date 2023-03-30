import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
   // Get prisma to get a specific tag
    const data = await prisma.tag.findUnique({
        where: {
            id: req.query.id as string
        },
        include: {
            links: true,
        }
    })
    return res.status(200).json(data)
}