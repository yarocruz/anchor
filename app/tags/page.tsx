import LinkSubmitForm from "../components/LinkSubmitForm";
import { getServerSession} from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Link from "next/link";
import getLinks from "../../pages/lib/getLinks";

export default async function Page() {
    const session = await getServerSession(authOptions);
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
                <Link href='../tags/' className="tab rounded-t-md bg-orange-400 text-white">Tags</Link>
            </div>

            <div className="my-5">
                TODO: ADD TAGS HERE
            </div>

        </main>
    )
}