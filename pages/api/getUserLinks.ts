import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    // const session = await getServerSession(req, res, authOptions);
    // console.log("session", session)

        try {
            const userData = await prisma.user.findUnique({
                where: {
                    email: req.query.email as string
                }
            })
            // Get prisma to fetch Link
            const data = await prisma.link.findMany({
                where: {
                    userId: userData?.id
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