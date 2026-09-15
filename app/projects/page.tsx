import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">All Projects</h1>
      <ProjectList projects={projects} />
    </main>
  );
}
