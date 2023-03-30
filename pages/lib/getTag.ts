export default async function getTag(id: string) {

    const response = await fetch(`${process.env.BASE_URL}/api/getTag?id=${id}`, {
        cache: "no-store",
    })
    if (!response.ok) {
        throw new Error("response not ok")
    }
    return response.json();
}