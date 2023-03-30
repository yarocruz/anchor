export default async function getTags() {
    const response = await fetch(`${process.env.BASE_URL}/api/getTags`, {cache: "no-store"})
    if (!response.ok) {
        console.log(response)
    }
    return response.json();
}