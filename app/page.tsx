import LinkSubmitForm from "./components/LinkSubmitForm";
import { getServerSession} from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Link from "next/link";
import getLinks from "../pages/lib/getLinks";

export default async function Home() {
    const session = await getServerSession(authOptions);
    console.log("Session", session)
    const data: {
        id: string,
        url: string,
        title?: string,
        description?: string,
        tags?: {name: string, id: string}[]
    }[] = await getLinks()

  return (
        <main className="container mx-auto my-2 w-auto p-2">

            {session ? ( <LinkSubmitForm /> ) : null}

            <div className="tabs mt-10 border-b-4 border-orange-600">
                <Link href='/' className="tab rounded-t-md bg-orange-400 text-white mr-2.5">Recent Links</Link>
                <Link href='/tags/' className="tab rounded-t-md bg-orange-400 text-white">Tags</Link>
            </div>

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
                            <Link href={`/tags/${tag.name}`} key={tag.id} id={tag.id} className="mr-3 text-amber-800 hover:text-amber-500">{tag.name}</Link>
                        )) : null}</p>
                    </div>
                ))}

            </div>
        </main>

  )
}
