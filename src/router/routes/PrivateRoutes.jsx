import { Layout } from "@/layout"
import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom"
import { getRoleBasedRoutes } from "./helper";
import useAuth from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";


const PrivateRoutes=()=>{
   const { user } = useParams();
  const  {authenticated,loading}=useAuth();

 
  if(loading){
    return(
      <Spinner message={'Authenticating User ...'}/>
    )
  }

  const roleBasedRoutes = getRoleBasedRoutes(user);
  // console.log("role based",roleBasedRoutes)
  roleBasedRoutes.forEach((route)=>{
    if(route.children && route.children.length>0){
      route?.children.forEach((children)=>{
        console.log("path",children.path);
        console.log("element",children.element)
      })
    }
  })
  
  if(authenticated){

    return(
    
      <Layout>
          <Routes>
              {roleBasedRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element}>
                      {/* Only add Outlet for routes with children */}
                      {route.children && route.children.length > 0 && (
                          <Route path="*" element={<Outlet />} />
                      )}
                  </Route>
              ))}
          </Routes>
      </Layout> 
    )
  }
  return  <Navigate to="/login" replace />;
}

export default PrivateRoutes;