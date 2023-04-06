
'use client'
import { useState, useEffect } from "react";
import getUserLinks from "../../pages/lib/getUserLinks";
import Link from "next/link";
import {getSession, useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import {Session} from "next-auth";

interface LinkData {
    id: string,
    url: string,
    title: string,
    tags: [{id: string, name: string}],
    description: string,
}

export default function Profile() {
    // show links that belong to current logged-in user
    const [data, setData] = useState<LinkData[] | []>([])
    const [session, setSession] = useState<Session | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession()
            console.log(sessionData)
            setSession(sessionData)
            const links = await getUserLinks(sessionData?.user?.email!)
            console.log(links)
            setData(links)
        }
        fetchSession()
    }, []);


    // create on edit handler that will grab the link id and redirect to the edit page
    // create on delete handler that will grab the link id and delete the link from the database
    const onEdit = (id: string) => {
        router.push(`/edit/?id=${id}`)
    }

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
                        <p className="my-1">
                            <span onClick={() => onEdit(link.id)} className="text-base-100 rounded py-1 btn-sm bg-orange-400 mr-1">edit</span>
                            <span className="text-base-100 rounded py-1 btn-sm bg-orange-600 mr-3">delete</span>
                        </p>
                    </div>
                )) : <p className="max-w-md">
                        Hi there {session?.user?.name}! You haven't added any Links.
                        Be sure to go back to the <Link className="text-orange-600" href="/">main page </Link>
                        and start adding some links.</p>}

            </div>
        </main>
    )
}