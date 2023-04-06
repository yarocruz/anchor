// This form will edit the link with the id of {id}

"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"

interface LinkData {
    id: string,
    url: string,
    title: string,
    description: string,
    tags: string[],
}

export default function EditLinkSubmitForm() {
    const [linkData, setLinkData] = useState<LinkData>({
        id: '',
        url: '',
        title: '',
        description: '',
        tags: [] })
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const response = await fetch(`/api/editLinks`, {
            method: 'POST',
            body: JSON.stringify(linkData),
        })
        router.refresh()
        if (!response.ok) {
            console.log(response)
        }
        setLinkData({ id: '', url: '', title: '', description: '', tags: [] })
    }

    return (
        <form
            className="flex flex-col w-full max-w-xs"
            onSubmit={handleSubmit}
        >
            <input
                className="input input-bordered mb-2 input-sm"
                type="text"
                placeholder="Enter a url"
                value={linkData.url}
                onChange={(event) => {
                    setLinkData({ ...linkData, url: event.target.value })
                }}
            />
            <input
                className="input input-bordered mb-2 input-sm"
                type="text"
                placeholder="Enter a title(optional)"
                value={linkData.title}
                onChange={(event) => {
                    setLinkData({ ...linkData, title: event.target.value })
                }}
            />
            <input
                className="input input-bordered mb-2 input-sm"
                type="text"
                placeholder="Enter description(optional)"
                value={linkData.description}
                onChange={(event) => {
                    setLinkData({ ...linkData, description: event.target.value })
                }}
            />
            <input
                className="input input-bordered mb-2 input-sm"
                type="text"
                placeholder="Enter tag(s) (optional)"
                value={linkData.tags.join(' ')}
                onChange={(event) => {
                    setLinkData({ ...linkData, tags: event.target.value.split(' ') })
                }}
            />
            <button
                className="btn btn-sm rounded bg-orange-600 border-0"
                type="submit"
            >Edit Link</button>
        </form>
    )
}