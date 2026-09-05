import SkillCard from "@/components/SkillCard";

const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Git",
];

export default function About() {
    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
            <h1 className="mb-6 text-4xl font-bold">About Me</h1>

            <div className="space-y-4 text-lg text-slate-700">
                <p>
                    My name is David Canales. I am a full-stack development student based
                    in Vancouver, Washington.
                </p>

                <p>
                    I enjoy combining my technical experience with software development
                    to build practical applications that solve real-world problems.
                </p>
            </div>

            <SkillCard title="Technical Skills" skills={skills} />
        </main>
    );
}