import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = JSON.parse(req.body);
        console.log(data);
        if (req.method === "POST") {
            // check for link content
            if (!data.link) {
                return res.status(400).json({error: "Link content is required"})
            }
            try {
                const link = await prisma.link.create({
                    data: {
                        url: data.link,
                        userId: "cjld2cjxh0000qzrmn831i7rn", // TODO: get user id from session
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