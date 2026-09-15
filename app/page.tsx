import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export default async function Home() {
  const projects = await getProjects();

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
