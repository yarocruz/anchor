import getUserLinks from "../../pages/lib/getUserLinks";
import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function Profile() {
    // show links that belong to current logged in user
    const session = await getServerSession(authOptions);
    const data = await getUserLinks(session?.user?.email!)
    return (
        <main className="container mx-auto my-2 w-auto p-2">
            <div className="my-5">
                {data.map((link) => (
                    <div key={link.id} className="py-3 border-b-gray-100 border-b-2">
                        <p
                            className="break-words"
                        >
                            <a
                                className="text-orange-600"
                                target="_blank"
                                href={link.url}
                            >{link.title ? link.title : link.url}</a>
                        </p>
                        <p>{link.description ? link.description : null}</p>
                        <p>{link.tags ? link.tags.map(tag => (
                            <Link href={`/tags/${tag.name}`} key={tag.id} id={tag.id} className="mr-3 text-amber-800">{tag.name}</Link>
                        )) : null}</p>
                    </div>
                ))}

            </div>
        </main>
    )
}