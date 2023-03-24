import {NextApiRequest, NextApiResponse} from "next";
import { hash } from 'bcryptjs';
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        const hashedPassword = await hash(password, 10);

        // check duplicate for duplicate user
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (userExists) {
            return res.status(400).json({error: "User already exists"})
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        })

        res.json(user);
    }
}