"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ProjectFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  technologies: z.string().min(2),
});

export async function createProject(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
  };

  const parsedData = ProjectFormSchema.safeParse(rawData);

  if (!parsedData.success) {
    throw new Error("Invalid project input.");
  }

  const { title, description, technologies } = parsedData.data;

  await sql`
    INSERT INTO projects (title, description, technologies)
    VALUES (
      ${title},
      ${description},
      ARRAY(
        SELECT btrim(value)
        FROM unnest(string_to_array(${technologies}, ',')) AS technology(value)
        WHERE btrim(value) <> ''
      )
    )
  `;

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(id: number, formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
  };

  const parsedData = ProjectFormSchema.safeParse(rawData);

  if (!parsedData.success) {
    throw new Error("Invalid project input.");
  }

  const { title, description, technologies } = parsedData.data;

  await sql`
    UPDATE projects
    SET
      title = ${title},
      description = ${description},
      technologies = ARRAY(
        SELECT btrim(value)
        FROM unnest(string_to_array(${technologies}, ',')) AS technology(value)
        WHERE btrim(value) <> ''
      )
    WHERE id = ${id}
  `;

  revalidatePath("/projects");
  redirect("/projects");
}

export async function deleteProject(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid project ID.");
  }

  await sql`
    DELETE FROM projects
    WHERE id = ${id}
  `;

  revalidatePath("/projects");
}