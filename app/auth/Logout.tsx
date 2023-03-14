"use client"

import {signOut} from "next-auth/react";

export default function Logout() {
    return (
        <li><a onClick={() => signOut()}>Log Out</a></li>
    )
}