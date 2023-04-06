export default async function getLinkData(id: string) {
    const response = await fetch(`${process.env.BASE_URL}/api/getLinkData?id=${id}`, {cache: "no-store"})
    if (!response.ok) {
        console.log(response)
    }
    return response.json();
}