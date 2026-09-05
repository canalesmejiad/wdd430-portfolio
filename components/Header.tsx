import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-slate-900 text-white shadow-md">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <p className="text-xl font-bold">David Canales</p>

                <nav aria-label="Main navigation">
                    <ul className="flex gap-6">
                        <li>
                            <Link href="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:underline">
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}