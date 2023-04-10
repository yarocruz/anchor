import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        // Get prisma to delete Link
        const link = await prisma.link.delete({
            where: {
                id: req.query.id as string
            }
        })

        return res.status(200).json(link)
    } catch (error) {
        return res.status(500).json(error);
    }
}