import { useParams } from "react-router-dom"
import { ProjectForm } from "../../components"
import { useEffect } from "react"
import { useProjects } from "../../hooks"

export const EditProject = () => {
    const params = useParams()
    const {getSingleProject} = useProjects()
    useEffect(() => {
      getSingleProject(params?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])
    
  return (
    <main className="w-full flex items-center justify-center">
    <ProjectForm/>
    </main>
  )
}
