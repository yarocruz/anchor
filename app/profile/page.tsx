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
            <h1>Your Saved Links</h1>
            <div className="my-5">
                {data.length > 0 ? data.map((link) => (
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
                        <p className="my-1"><span className="text-base-100 rounded py-1 btn-sm bg-orange-400 mr-1">edit</span> <span className="text-base-100 rounded py-1 btn-sm bg-orange-600 mr-3">delete</span></p>
                    </div>
                )) : <p className="max-w-md">
                        Hi there {session?.user?.name}! You haven't added any Links.
                        Be sure to go back to the <Link className="text-orange-600" href="/">main page </Link>
                        and start adding some links.</p>}

            </div>
        </main>
    )
}