"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageFromURL = Number(searchParams.get("page") ?? "1");
    const currentPage =
        Number.isInteger(pageFromURL) && pageFromURL > 0
            ? Math.min(pageFromURL, Math.max(totalPages, 1))
            : 1;

    function createPageURL(pageNumber: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            className="mt-8 flex items-center justify-center gap-4"
            aria-label="Projects pagination"
        >
            {currentPage > 1 ? (
                <Link
                    href={createPageURL(currentPage - 1)}
                    className="rounded-md border border-slate-300 px-4 py-2"
                >
                    Previous
                </Link>
            ) : (
                <span
                    className="cursor-not-allowed rounded-md border border-slate-200 px-4 py-2 text-slate-400"
                    aria-disabled="true"
                >
                    Previous
                </span>
            )}

            <span>
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link
                    href={createPageURL(currentPage + 1)}
                    className="rounded-md border border-slate-300 px-4 py-2"
                >
                    Next
                </Link>
            ) : (
                <span
                    className="cursor-not-allowed rounded-md border border-slate-200 px-4 py-2 text-slate-400"
                    aria-disabled="true"
                >
                    Next
                </span>
            )}
        </nav>
    );
}