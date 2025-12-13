import { ProjectForm } from "@/components/admin/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Project</h1>
        <p className="text-muted-foreground">Create a new project for your portfolio</p>
      </div>

      <ProjectForm />
    </div>
  )
}
