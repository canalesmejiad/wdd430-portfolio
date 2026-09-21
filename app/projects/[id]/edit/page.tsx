import { updateProject } from "@/app/lib/actions";
import { getProjectById } from "@/lib/projects-db";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const projectId = Number(id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
        notFound();
    }

    const project = await getProjectById(projectId);

    if (!project) {
        notFound();
    }

    const updateProjectWithId = updateProject.bind(null, project.id);

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <h1 className="mb-8 text-4xl font-bold">Edit Project</h1>

            <form action={updateProjectWithId} className="space-y-6">
                <div>
                    <label htmlFor="title" className="mb-2 block font-semibold">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        defaultValue={project.title}
                        required
                        className="w-full rounded border p-3"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="mb-2 block font-semibold">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={project.description}
                        required
                        className="min-h-32 w-full rounded border p-3"
                    />
                </div>

                <div>
                    <label htmlFor="technologies" className="mb-2 block font-semibold">
                        Technologies
                    </label>
                    <input
                        id="technologies"
                        name="technologies"
                        type="text"
                        defaultValue={project.technologies.join(", ")}
                        required
                        className="w-full rounded border p-3"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded bg-blue-700 px-5 py-3 font-semibold text-white"
                >
                    Update Project
                </button>
            </form>
        </main>
    );
}