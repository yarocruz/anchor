import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        // Get prisma to fetch Link
        const data = await prisma.link.findUnique({
            where: {
                id: req.query.id as string
            },
            include: {
                tags: true,
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }

}