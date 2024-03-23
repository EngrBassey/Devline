import { Outlet, Navigate } from 'react-router-dom'
import withInactivityTimeout from '../../withInactivityTimeout'


const AuthenticatedMentorRoute = () => {
    let auth = { 'token' :localStorage.getItem('mentor_id') }
    return(
        auth.token ? <Outlet/> : <Navigate to="/mentor-signin"/>
    )
}

export default withInactivityTimeout(AuthenticatedMentorRoute);
