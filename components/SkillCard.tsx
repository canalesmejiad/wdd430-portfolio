interface SkillCardProps {
    title: string;
    skills: string[];
}

export default function SkillCard({ title, skills }: SkillCardProps) {
    return (
        <section className="mt-8 rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">{title}</h2>

            <ul className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                    <li
                        key={skill}
                        className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900"
                    >
                        {skill}
                    </li>
                ))}
            </ul>
        </section>
    );
}