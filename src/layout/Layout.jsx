import { useParams } from "react-router-dom";
import AppBar from "./components/AppBar";
import SideBar from "./components/SideBar";
import "./layout.css"

const Layout=({ children })=>{
  const {user}=useParams();

  return (
    <>
      <div className="layout-container">
        <AppBar/>
        <SideBar/>
        <div className="main-container">
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout;