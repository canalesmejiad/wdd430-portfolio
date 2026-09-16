import Pagination from "@/components/Pagination";
import ProjectList from "@/components/ProjectList";
import ProjectSearch from "@/components/ProjectSearch";
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from "@/lib/projects-db";
import { connection } from "next/server";

interface ProjectsPageProps {
  searchParams: Promise<{
    query?: string | string[];
    page?: string | string[];
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  await connection();

  const params = await searchParams;

  const query =
    typeof params.query === "string" ? params.query : "";

  const pageFromURL =
    typeof params.page === "string" ? Number(params.page) : 1;

  const requestedPage =
    Number.isInteger(pageFromURL) && pageFromURL > 0
      ? pageFromURL
      : 1;

  const totalPages = await fetchProjectsPages(query);
  const currentPage = Math.min(
    requestedPage,
    Math.max(totalPages, 1),
  );

  const projects = await fetchFilteredProjects(
    query,
    currentPage,
  );

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        All Projects
      </h1>

      <ProjectSearch />

      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <p>No projects found.</p>
      )}

      <Pagination totalPages={totalPages} />
    </main>
  );
}