export default function Footer() {
    return (
        <footer className="mt-12 bg-slate-900 py-4 text-white">
            <div className="mx-auto max-w-5xl px-6 text-center">
                <p>
                    Copyright &copy; {new Date().getFullYear()} | David Canales | All
                    rights reserved
                </p>
            </div>
        </footer>
    );
}