
import { getServerSession} from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import SignIn from "@/app/auth/SignIn";
import Logout from "@/app/auth/Logout";

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    return (
        <div className="navbar bg-orange-500 text-white">
            <div className="container mx-auto">
                <div className="flex-1">
                    <a href="#" className="normal-case text-xl">Hypertext</a>
                </div>
                <div className="flex-2">
                    <a href="#" className="px-3">Quick Tour</a>
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
        </div>
    )
}