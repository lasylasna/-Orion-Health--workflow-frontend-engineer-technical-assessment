import {Navigate, Outlet} from 'react-router-dom';


//disabling profile view from unautherized access
const ProtectedRoute = ({ element: Element, ...rest }) => {

    const auth =  window.sessionStorage.getItem("session-token") ;
    return auth  ? <Outlet /> : <Navigate to="/" />;      
  
  }
 export default ProtectedRoute;