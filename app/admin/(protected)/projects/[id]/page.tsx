import { getProjectById } from "@/lib/data-service"
import { ProjectForm } from "@/components/admin/project-form"
import { notFound } from "next/navigation"

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const project = await getProjectById(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
        <p className="text-muted-foreground">Update your project information</p>
      </div>

      <ProjectForm project={project} />
    </div>
  )
}
