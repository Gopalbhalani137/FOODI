import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"


export const useAuth = () => {
    const auth = useContext(AuthContext)
  return auth
}


