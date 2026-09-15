import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";
import { notFound } from "next/navigation";

const projectTypes = ["school", "opensource"] as const;

export default async function ProjectsByTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (!projectTypes.includes(type as (typeof projectTypes)[number])) {
    notFound();
  }

  const projects = await getProjects(type);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold capitalize">{type} Projects</h1>
      <ProjectList projects={projects} />
    </main>
  );
}
