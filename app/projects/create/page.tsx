import { createProject } from "../../lib/actions";

export default function CreateProjectPage() {
    return (
        <main>
            <h1>Create a New Project</h1>

            <form action={createProject}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" required />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="technologies">Technologies</label>
                    <input
                        id="technologies"
                        name="technologies"
                        type="text"
                        placeholder="React, Next.js, TypeScript"
                        required
                    />
                </div>

                <button type="submit">Save Project</button>
            </form>
        </main>
    );
}