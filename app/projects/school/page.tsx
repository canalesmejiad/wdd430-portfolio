import SchoolProjectList from "@/components/SchoolProjectList";
import ProjectListSkeleton from "@/components/ProjectListSkeleton";
import { Suspense } from "react";

export default function SchoolProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        School Projects
      </h1>

      <Suspense fallback={<ProjectListSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}