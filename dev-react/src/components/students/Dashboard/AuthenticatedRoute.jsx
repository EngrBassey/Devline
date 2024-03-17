import { Outlet, Navigate } from "react-router-dom";
import withInactivityTimeout from "../../withInactivityTimeout";

const AuthenticatedStudentRoute = () => {
  let auth = { token: localStorage.getItem("student_id") };
  return auth.token ? <Outlet /> : <Navigate to="/signin" />;
};

export default withInactivityTimeout(AuthenticatedStudentRoute);
