export default async function getLinks() {
    const response = await fetch(`${process.env.BASE_URL}/api/getLinks`, {cache: "no-store"})
    if (!response.ok) {
        console.log(response)
    }
    return response.json();
}