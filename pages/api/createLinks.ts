import { NextApiRequest, NextApiResponse} from "next";
import prisma from "../../prisma/client";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const linkData = JSON.parse(req.body);
        console.log("From CreateLinks", linkData);
        if (req.method === "POST") {
            // check for link content
            if (!linkData.url) {
                return res.status(400).json({error: "Link content is required"})
            }
            try {
                // Todo: Create Tags if there are any
                const link = await prisma.link.create({
                    data: {
                        url: linkData.url,
                        title: linkData.title ? linkData.title : "",
                        userId: 'clfb7zw4v00009kag1e7x8t9g', // TODO: get user id from session
                        description: linkData.description ? linkData.description : "",
                        // tags: linkData.tags ? await prisma.tag.create({
                        //     data: {
                        //         name: linkData.tags
                        //     }
                        // }): [],
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