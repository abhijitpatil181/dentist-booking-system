import React, { useEffect, useState } from "react";
import "./sideBar.css"
import { useNavigate, useParams ,useLocation} from "react-router-dom";
import useLoginContext from "@/hooks/useLoginConext";

let menuOptions=[{label:'dashboard',Name:'Dashboard'},{label:'add-service',Name:'Add Service'},{label:"view-report",Name:"View Report"},{label:'add-dentist',Name:"Add Dentist"}]


const SideBar=()=>{
  const {user}=useParams();
  const [selectedTab,setSelectedTab]=useState('dashboard');

  const navigate=useNavigate();
  


  if(user!=='admin'){
    menuOptions=[{label:'dashboard',Name:'Dashboard'}]
  }



  const onMenuClick=(menuItem)=>{
    setSelectedTab(menuItem)
    navigate(`${menuItem}`)  
  }
  
  return(
    <>
      <div className="sidebar-container" key={"sidebar"} >
        {menuOptions.map((menu,index)=>(
          <React.Fragment key={index}>        
              <h3 className="menu-item" onClick={()=>onMenuClick(menu.label)} style={{
                backgroundColor:selectedTab===menu.label ? '#D9D9D9':'transparent',padding:'0.5rem',borderRadius:'5px'
              }} >{menu.Name}</h3>         
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default SideBar;