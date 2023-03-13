import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";

type DataProps = {
    content: string,
    published: boolean,
    userId: number
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data: DataProps = JSON.parse(req.body);
        console.log(data);
        if (req.method === "POST") {
            // check for link content
            if (!data.content) {
                return res.status(400).json({error: "Link content is required"})
            }
            try {
                const link = await prisma.link.create({
                    data: {
                        content: data.content,
                        published: false,
                        userId: 1
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