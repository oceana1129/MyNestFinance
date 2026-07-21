import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import NavBar from '../components/navigation/NavBar'
import AppPageDisplay from "../components/data-display/AppPageDisplay"

const AccountPage = () => {
const {user, logout} = UserAuth();

const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logout()
    navigate("/")
  } catch (error) {
    console.log(error.message)
  }
}

  return (
    <AppPageDisplay 
      nav={<NavBar activePage='settings'/>}
      contentPrimary={
          <div className='p-4 flex flex-col gap-4'>
            <p>User Email: {user && user.email}</p>
            <button onClick={handleLogout} className='btn btn-primary'>Log Out</button>
          </div>
      }
      />
  )
}

export default AccountPage
