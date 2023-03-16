"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"

interface LinkData {
    url: string,
    title: string,
    description: string,
    tags: string[]
}

export default function LinkSubmitForm() {
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [linkData, setLinkData] = useState<LinkData>({ url: '', title: '', description: '', tags: [] })
    const router = useRouter()


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const response = await fetch(`/api/createLinks`, {
            method: 'POST',
            body: JSON.stringify({ ...linkData, tags: tags.split(" ")}),
        })
        router.refresh()
        if (!response.ok) {
        console.log(response)
        }
        setUrl('')
        setTitle('')
        setDescription('')
        setTags('')
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
            value={url}
            onChange={(event) => {
                setUrl(event.target.value)
                setLinkData({ ...linkData, url: event.target.value })
            }}
        />
        <input
            className="input input-bordered mb-2 input-sm"
            type="text"
            placeholder="Enter a title(optional)"
            value={title}
            onChange={(event) => {
                setTitle(event.target.value)
                setLinkData({ ...linkData, title: event.target.value })
            }}
        />
        <input
            className="input input-bordered mb-2 input-sm"
            type="text"
            placeholder="Enter description(optional)"
            value={description}
            onChange={(event) => {
                setDescription(event.target.value)
                setLinkData({ ...linkData, description: event.target.value })
            }}
        />
        <input
            className="input input-bordered mb-2 input-sm"
            type="text"
            placeholder="Enter tag(s) (optional)"
            value={tags}
            onChange={(event) => {
                setTags(event.target.value)
                setLinkData({ ...linkData, tags: event.target.value.split(' ') })
            }}
        />
        <button
            className="btn btn-sm rounded bg-orange-600 border-0"
            type="submit"
        >Add Link</button>
        </form>
    )
}