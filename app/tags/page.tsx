import LinkSubmitForm from "../components/LinkSubmitForm";
import { getServerSession} from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Link from "next/link";
import getTags from "../../pages/lib/getTags";

export default async function Page() {
    const session = await getServerSession(authOptions);
    const data = await getTags()

    const filterDuplicateTags = (d) => {
        const tags = []
        d.map((tag) => {
            if (!tags.includes(tag.name) && tag.name !== "") {
                tags.push(tag.name)
            }
        })
        return tags
    }

    return (

        <main className="container mx-auto my-2 w-auto p-2">

            {session ? ( <LinkSubmitForm /> ) : null}

            <div className="tabs my-10 border-b-4 border-orange-600">
                <Link href='/' className="tab rounded-t-md bg-orange-400 text-white mr-2.5">Recent Links</Link>
                <Link href='../tags/' className="tab rounded-t-md bg-orange-400 text-white">Tags</Link>
            </div>

                <p>
                {filterDuplicateTags(data).map((tag) => (
                    <span><Link className="mr-3 text-amber-800 inline-block" key={tag} href={`/tags/${tag}`}>{tag}</Link></span>
                ))}
                </p>

        </main>
    )
}