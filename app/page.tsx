import LinkSubmitForm from "./components/LinkSubmitForm";
import { getServerSession} from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

async function getLinks() {
  const response = await fetch(`${process.env.BASE_URL}/api/getLinks`, {cache: "no-store"})
  if (!response.ok) {
      console.log(response)
  }
  return response.json();
}
export default async function Home() {
    const session = await getServerSession(authOptions);

    const data: {
        id: string,
        url: string,
        title?: string,
        description?: string,
        tags?: string[]
    }[] = await getLinks()
  return (
        <main className="container mx-auto my-2 w-auto p-2">

            {session ? ( <LinkSubmitForm /> ) : null}

            <div className="tabs mt-10 border-b-4 border-orange-600">
                <a className="tab bg-orange-400 text-white mr-1.5">Recent Links</a>
                <a className="tab bg-orange-400 text-white">Tags</a>
            </div>

            <div className="my-5">
                {data.map((link) => (
                    <div className="py-3 border-b-gray-100 border-b-2">
                        <p
                            className="break-words"
                            key={link.id}
                        >
                            <a
                                className="text-orange-600"
                                href={link.url}
                            >{link.title ? link.title : link.url}</a>
                        </p>
                        <p>{link.description ? link.description : null}</p>
                        <p>{link.tags ? link.tags.join(", ") : null}</p>
                    </div>
                ))}

            </div>
        </main>

  )
}
