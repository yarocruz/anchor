import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Get prisma to fetch Link
    const data = await prisma.tag.findMany()
    return res.status(200).json(data)
}