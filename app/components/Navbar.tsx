import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Cart from "./Cart";

export default function Navbar() {

    return (
        <nav className="fixed top-0 w-full flex items-center justify-between py-2 px-8 z-50  bg-slate-800 text-gray-300">
            <Link className="uppercase font-bold h-12 flex items-center" href="/">
                Store
            </Link>
            <div className="flex items-center gap-8">
                <Cart />
                <div>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="border rounded-md border-gray-400 px-3 py-2">Fazer Login</button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </nav>
    )
}