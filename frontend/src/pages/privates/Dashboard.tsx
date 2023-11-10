import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks"

const Dashboard = () => {
const {auth} = useAuth()
console.log(auth)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard