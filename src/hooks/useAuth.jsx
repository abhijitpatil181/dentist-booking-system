import { useEffect, useState } from "react"
import useLoginContext from "./useLoginConext";



const useAuth=()=>{
  const [authenticated,setAuthenticated]=useState(false);
  const {setLogInDetails}=useLoginContext()
  // const [logIn,setLogIn]=useState({username:'',role:''})
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
   
    setLoading(true);
    const username=sessionStorage.getItem('username');
    const role=sessionStorage.getItem("role");
    if(username && role){
      setAuthenticated(true);
      setLogInDetails({username,role})
      setLoading(false);
    }else{
      setLogInDetails({username:'',role:''})
      setLoading(false);
    }

  },[])

  return {authenticated,loading};
}

export default useAuth;