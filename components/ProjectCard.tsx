import Link from "next/link";
import { deleteProject } from "@/app/lib/actions";

interface ProjectCardProps {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

export default function ProjectCard({
    id,
    title,
    description,
    technologies,
    link,
}: ProjectCardProps) {
    const deleteProjectWithId = deleteProject.bind(null, id);

    return (
        <article className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-2xl font-bold text-slate-900">
                {title}
            </h2>

            <p className="mb-4 text-slate-700">{description}</p>

            <p className="text-sm text-slate-600">
                <strong>Technologies:</strong> {technologies.join(", ")}
            </p>

            <div className="mt-4 flex items-center gap-4">
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-800 hover:underline"
                    >
                        View Project
                    </a>
                )}

                <Link
                    href={`/projects/${id}/edit`}
                    className="font-medium text-blue-800 hover:underline"
                >
                    Edit Project
                </Link>

                <form action={deleteProjectWithId}>
                    <button
                        type="submit"
                        className="font-medium text-red-700 hover:underline"
                    >
                        Delete Project
                    </button>
                </form>
            </div>
        </article>
    );
}