"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"

export default function LinkSubmitForm() {
    const [content, setContent] = useState('')
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const response = await fetch(`/api/createLinks`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        })
        router.refresh()
        if (!response.ok) {
        console.log(response)
        }
        setContent('')
    }

    return (
        <form
        className="flex space-x-2"
        onSubmit={handleSubmit}
        >
        <input
            className="flex-1 p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Enter a url"
            value={content}
            onChange={(event) => setContent(event.target.value)}
        />
        <button
            className="p-2 text-white bg-blue-500 rounded"
            type="submit"
        >Add Link</button>
        </form>
    )
}