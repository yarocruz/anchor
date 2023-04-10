
'use client'
import { useState, useEffect } from "react";
import getUserLinks from "../../pages/lib/getUserLinks";
import Link from "next/link";
import {getSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import {Session} from "next-auth";
import deleteLink from "../../pages/lib/deleteLink";

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
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession()
            setSession(sessionData)
            const links = await getUserLinks(sessionData?.user?.email!)
            setData(links)
            setLoading(false)
        }
        if (data.length === 0) {
            fetchSession()
        }
    }, []);


    // create on edit handler that will grab the link id and redirect to the edit page
    // create on delete handler that will grab the link id and delete the link from the database
    const onEdit = (id: string) => {
        router.push(`/edit/?id=${id}`)
    }

    const onDelete = (id: string) => {
        // delete the link from the database
        deleteLink(id)
        // remove the link from the data array
        const newData = data.filter((link: LinkData) => link.id !== id)
        setData(newData)
    }

    return (
        <main className="container mx-auto my-2 w-auto p-2">
            <h1>Your Saved Links</h1>
            <div className="my-5">
                {loading ? ( <p>Loading...</p> ) :
                    data.length ? data.map((link) => (
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
                            <p className="my-1">
                                <span onClick={() => onEdit(link.id)} className="hover:text-amber-300 text-white btn-sm bg-amber-500 rounded py-1 mr-3 cursor-pointer">edit</span>
                                <span onClick={() => onDelete(link.id)} className="hover:text-red-500 text-white btn-sm bg-amber-500 rounded py-1 cursor-pointer">delete</span>
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