import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";
import { connection } from "next/server";

export default async function OpenSourceProjectsPage() {
    await connection();
    
    const projects = await getProjects("opensource");

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
            <h1 className="mb-8 text-4xl font-bold">
                Open Source Projects
            </h1>

            <ProjectList projects={projects} />
        </main>
    );
}