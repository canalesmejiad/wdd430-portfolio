import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "Service Network Application",
    description:
      "A full-stack application for managing users, organizations, projects, and service categories.",
    technologies: ["Node.js", "Express", "EJS", "PostgreSQL"],
    link: "https://github.com/canalesmejiad/cse340-course-repo",
  },
  {
    title: "HVAC Diagnostic Tool",
    description:
      "A web application that identifies possible HVAC problems and provides diagnostic and maintenance information.",
    technologies: ["HTML", "CSS", "JavaScript", "REST API"],
    link: "https://github.com/canalesmejiad/hvac-diagnostic",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <section className="mb-10">
        <h1 className="mb-4 text-4xl font-bold">My Portfolio</h1>
        <p className="text-lg text-slate-700">
          I am a full-stack development student learning Next.js and React.
          Here are some projects I have built.
        </p>
      </section>

      <ProjectList projects={projects} />
    </main>
  );
}