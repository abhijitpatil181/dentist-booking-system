import { useNavigate, useParams } from "react-router-dom";
import "./appBar.css"
import useLoginContext from "@/hooks/useLoginConext";
import useFirestoreCollection from "@/hooks/useFirestoreCollection";
import { useState } from "react";
import CustomDialog from "./CustomDialog";

const AppBar =()=>{
  const {user}=useParams();
  const {logInDetails}=useLoginContext();
  const {data}=useFirestoreCollection(logInDetails.role);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate=useNavigate();

  const fullName= data.find((user)=>user.username===logInDetails.username)?.fullname;
  console.log("fullname",fullName)

  return (
    <>
      <div className="app-bar-container">
        <div style={{ display:"flex",justifyContent:'center',alignItems:'center',minWidth:'12vw',borderRight:'1px solid #000',height:'100%'}}>
         <h6 style={{fontSize:'1.3rem',fontWeight:500,}}>Logo</h6>
        </div>
        
         
        <div className="dashboard-container">
        <div style={{height:'100%'}}>
         
          <h6 style={{fontSize:'1.3rem',fontWeight:500}}>Dashboard</h6>
        </div>
          
          <div className="user-container">
            <h6 style={{fontSize:'1.3rem',fontWeight:500}}>{fullName}</h6>   
            <div className="avatar" onClick={()=>{
              setDialogOpen(true)
            }} style={{cursor:'pointer'}}>
             <h6 style={{fontSize:'1.3rem',fontWeight:500}}>{fullName?.charAt(0).toUpperCase()}</h6>          
            </div>
          </div>
        </div>
      </div>    
       <CustomDialog
        isOpen={isDialogOpen}
        onClose={()=>setDialogOpen(false)}
        username={logInDetails.username}
        onLogout={()=>{
          sessionStorage.clear();
          navigate('/login')
        }}
      />
    </>
  );
}

export default AppBar;