
import { getServerSession} from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import SignIn from "@/app/auth/SignIn";
import Logout from "@/app/auth/Logout";

export default async function Navbar() {
    const session = await getServerSession(authOptions)
    console.log("from the navbar", session)
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <a className="btn btn-link normal-case text-xl text-orange-600">hypertext</a>
            </div>
            {session ? (
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={session.user?.image || ""} alt="User profile image"/>
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <Logout />
                        </ul>
                    </div>
                </div>
            ) : (
                <SignIn />
                )}
        </div>
    )
}