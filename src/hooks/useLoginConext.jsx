

import { LoginContext } from "@/context/logInConext";
import { useContext } from "react"


const useLoginContext=()=>{
  const context=useContext(LoginContext);
  if(!context)
    throw new Error('useExtensionContext must be used within an ExtensionProvider');

  return context;
}

export default useLoginContext;