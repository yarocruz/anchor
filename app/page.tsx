import LinkSubmitForm from "./components/LinkSubmitForm";

async function getLinks() {
  const response = await fetch(`${process.env.BASE_URL}/api/getLinks`, {cache: "no-store"})
  if (!response.ok) {
      console.log(response)
  }
  return response.json();
}
export default async function Home() {

    const data: { id: string, url: string }[] = await getLinks()
  return (
        <main className="container mx-auto">
            <h1>Home</h1>

            <LinkSubmitForm />

            <ul className="space-y-2">
                {data.map((link) => (
                    <li
                        key={link.id}
                    >
                        <a
                            className="text-blue-500"
                            href={link.url}
                        >{link.url}</a></li>
                ))}
            </ul>
        </main>

  )
}
