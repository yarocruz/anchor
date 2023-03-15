"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"

export default function LinkSubmitForm() {
    const [link, setLink] = useState('')
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const response = await fetch(`/api/createLinks`, {
            method: 'POST',
            body: JSON.stringify({ link }),
        })
        router.refresh()
        if (!response.ok) {
        console.log(response)
        }
        setLink('')
    }

    return (
        <form
        className="flex space-x-2 my-2 max-w-md"
        onSubmit={handleSubmit}
        >
        <input
            className="input input-bordered input-md w-full max-w-xs"
            type="text"
            placeholder="Enter a url"
            value={link}
            onChange={(event) => setLink(event.target.value)}
        />
        <button
            className="btn btn-md rounded bg-orange-600 border-0"
            type="submit"
        >Add Link</button>
        </form>
    )
}