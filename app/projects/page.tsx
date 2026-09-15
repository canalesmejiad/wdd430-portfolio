import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";
import { connection } from "next/server";

export default async function ProjectsPage() {
  await connection();
  const projects = await getProjects();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">All Projects</h1>
      <ProjectList projects={projects} />
    </main>
  );
}
