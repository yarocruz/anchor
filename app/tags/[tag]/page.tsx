import LinkSubmitForm from "../../components/LinkSubmitForm";
import { getServerSession} from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import Link from "next/link";
import getTag from "../../../pages/lib/getTag";
import prisma from "@/prisma/client";
export default async function TagPage({ params: { tag } }: { params: { tag: string } }) {
    //get id from tag

    const session = await getServerSession(authOptions);
    const tagData = await prisma.tag.findFirst({
        where: {
            name: tag
        }
    })

    const data = await getTag(tagData?.id!)
    console.log(data)


    return (
        data.links.map((link) => (
            <a href={link.url} key={link.id}>{link.title ? link.title : link.url}</a>
        ))
    )
}
