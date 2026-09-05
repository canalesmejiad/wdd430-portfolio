interface ProjectCardProps {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

export default function ProjectCard({
    title,
    description,
    technologies,
    link,
}: ProjectCardProps) {
    return (
        <article className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-2xl font-bold text-slate-900">{title}</h2>

            <p className="mb-4 text-slate-700">{description}</p>

            <p className="text-sm text-slate-600">
                <strong>Technologies:</strong> {technologies.join(", ")}
            </p>

            {link && (
                <p className="mt-4">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-800 hover:underline"
                    >
                        View Project
                    </a>
                </p>
            )}
        </article>
    );
}