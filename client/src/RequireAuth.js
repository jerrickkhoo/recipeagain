import { Navigate } from "react-router-dom";
import {useAuth} from 'react-use-auth'

function RequireAuth({ children }) {
  const { authed } = useAuth();
//   const location = useLocation();

  return authed === true ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
