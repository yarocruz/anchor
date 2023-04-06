export default async function getUserLinks(email: string) {
    const response = await fetch(`/api/getUserLinks?email=${email}`, {cache: "no-store"})
    if (!response.ok) {
        console.log("Response from getUserLinks", response)
    }
    return response.json();
}