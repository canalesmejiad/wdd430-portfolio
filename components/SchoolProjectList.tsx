import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";
import { connection } from "next/server";

export default async function SchoolProjectList() {
  await connection();


  const projects = await getProjects("school");

  return <ProjectList projects={projects} />;
}