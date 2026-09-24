"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const currentYear = new Date().getFullYear();

const CreateProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters."),
  technologies: z
    .string()
    .min(2, "Add at least one technology."),
  yearCompleted: z.coerce
    .number()
    .int("Year must be a whole number.")
    .gte(2000, "Year must be 2000 or later.")
    .lte(
      currentYear,
      `Year cannot be greater than ${currentYear}.`,
    ),
});

const UpdateProjectSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  technologies: z.string().min(2),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    technologies?: string[];
    yearCompleted?: string[];
  };
  message?: string | null;
};

export async function createProject(
  previousState: State,
  formData: FormData,
): Promise<State> {
  // React supplies the previous state when using useActionState.
  // This action does not need its value, but it must accept it.
  void previousState;

  const validatedFields = CreateProjectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    yearCompleted: formData.get("yearCompleted"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Missing or invalid fields. Failed to create project.",
    };
  }

  const {
    title,
    description,
    technologies,
    yearCompleted,
  } = validatedFields.data;

  try {
    await sql`
            INSERT INTO projects (
                title,
                description,
                technologies,
                year_completed
            )
            VALUES (
                ${title},
                ${description},
                ARRAY(
                    SELECT btrim(value)
                    FROM unnest(
                        string_to_array(${technologies}, ',')
                    ) AS technology(value)
                    WHERE btrim(value) <> ''
                ),
                ${yearCompleted}
            )
        `;
  } catch (error) {
    console.error("Failed to create project:", error);

    return {
      message: "Database Error: Failed to create project.",
    };
  }

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(
  id: number,
  formData: FormData,
) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
  };

  const parsedData = UpdateProjectSchema.safeParse(rawData);

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
                FROM unnest(
                    string_to_array(${technologies}, ',')
                ) AS technology(value)
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