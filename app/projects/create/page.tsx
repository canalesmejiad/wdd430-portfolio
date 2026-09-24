"use client";

import { useActionState } from "react";
import { createProject, type State } from "../../lib/actions";

const initialState: State = {
    message: null,
    errors: {},
};

export default function CreateProjectPage() {
    const currentYear = new Date().getFullYear();

    const [state, formAction, isPending] = useActionState(
        createProject,
        initialState,
    );

    return (
        <main className="mx-auto w-full max-w-2xl px-6 py-12">
            <h1 className="mb-8 text-4xl font-bold">
                Create a New Project
            </h1>

            <form
                action={formAction}
                className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block font-semibold"
                    >
                        Title
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        aria-describedby="title-error"
                        aria-invalid={Boolean(state.errors?.title)}
                        className="w-full rounded-md border border-slate-300 p-3"
                    />

                    <div
                        id="title-error"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {state.errors?.title?.map((error) => (
                            <p key={error} className="mt-2 text-sm text-red-600">
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block font-semibold"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        required
                        aria-describedby="description-error"
                        aria-invalid={Boolean(state.errors?.description)}
                        className="min-h-32 w-full rounded-md border border-slate-300 p-3"
                    />

                    <div
                        id="description-error"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {state.errors?.description?.map((error) => (
                            <p key={error} className="mt-2 text-sm text-red-600">
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="technologies"
                        className="mb-2 block font-semibold"
                    >
                        Technologies
                    </label>

                    <input
                        id="technologies"
                        name="technologies"
                        type="text"
                        placeholder="React, Next.js, TypeScript"
                        required
                        aria-describedby="technologies-error"
                        aria-invalid={Boolean(state.errors?.technologies)}
                        className="w-full rounded-md border border-slate-300 p-3"
                    />

                    <div
                        id="technologies-error"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {state.errors?.technologies?.map((error) => (
                            <p key={error} className="mt-2 text-sm text-red-600">
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="yearCompleted"
                        className="mb-2 block font-semibold"
                    >
                        Year Completed
                    </label>

                    <input
                        id="yearCompleted"
                        name="yearCompleted"
                        type="number"
                        min="2000"
                        max={currentYear}
                        required
                        aria-describedby="yearCompleted-error"
                        aria-invalid={Boolean(state.errors?.yearCompleted)}
                        className="w-full rounded-md border border-slate-300 p-3"
                    />

                    <div
                        id="yearCompleted-error"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {state.errors?.yearCompleted?.map((error) => (
                            <p key={error} className="mt-2 text-sm text-red-600">
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                <div aria-live="polite" aria-atomic="true">
                    {state.message && (
                        <p className="text-sm text-red-600">
                            {state.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-md bg-blue-700 px-5 py-3 font-semibold text-white disabled:opacity-50"
                >
                    {isPending ? "Saving..." : "Save Project"}
                </button>
            </form>
        </main>
    );
}