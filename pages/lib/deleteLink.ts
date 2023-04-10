export default async function deleteLink(id: string) {
    const response = await fetch(`/api/deleteLink?id=${id}`, {cache: "no-store"})
    if (!response.ok) {
        console.log(response)
    }
    return response.json();
}