"use client";

import { useEffect, useRef } from "react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

export default function ProjectSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentQuery = searchParams.get("query") ?? "";
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    function handleSearch(value: string) {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            const query = value.trim();

            if (query) {
                params.set("query", query);
            } else {
                params.delete("query");
            }

            params.set("page", "1");
            router.push(`${pathname}?${params.toString()}`);
        }, 300);
    }

    return (
        <div className="mb-8">
            <label
                htmlFor="project-search"
                className="mb-2 block font-semibold"
            >
                Search projects
            </label>

            <input
                key={currentQuery}
                id="project-search"
                type="search"
                defaultValue={currentQuery}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search by title or description"
                className="w-full rounded-md border border-slate-300 px-4 py-3"
            />
        </div>
    );
}