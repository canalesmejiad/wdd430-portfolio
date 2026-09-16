import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

export async function getProjects(
  type?: string | null,
): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows;
  }

  const { rows } = await sql<Project>`SELECT * FROM projects ORDER BY id`;
  return rows;
}

export async function getProjectById(
  id: number,
): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;
  return rows[0] ?? null;
}
const PROJECTS_PER_PAGE = 2;

export async function fetchFilteredProjects(
  query: string,
  currentPage: number,
): Promise<Project[]> {
  const safeQuery = query.trim().slice(0, 100);
  const safePage =
    Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;

  const offset = (safePage - 1) * PROJECTS_PER_PAGE;
  const searchPattern = `%${safeQuery}%`;

  const { rows } = await sql<Project>`
    SELECT *
    FROM projects
    WHERE title ILIKE ${searchPattern}
       OR description ILIKE ${searchPattern}
    ORDER BY id
    LIMIT ${PROJECTS_PER_PAGE}
    OFFSET ${offset}
  `;

  return rows;
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const safeQuery = query.trim().slice(0, 100);
  const searchPattern = `%${safeQuery}%`;

  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*)::text AS count
    FROM projects
    WHERE title ILIKE ${searchPattern}
       OR description ILIKE ${searchPattern}
  `;

  const totalProjects = Number(rows[0]?.count ?? 0);
  return Math.ceil(totalProjects / PROJECTS_PER_PAGE);
}
