import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthContextProvider({children}) {

  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    const token = localStorage.getItem("token");

    if(token){
      axios.get(`http://localhost:4000/api/user/user/${token}`)
        .then((res)=>{
          let user = res.data.user;
          setUser(user);

          setLoading(false)
        })
        .catch((err)=>{
          console.log(err)
          setLoading(false);
        })
    }
    else{
      setLoading(false);
    }
  }, [])
  
  const data = {
    setUser,
    user,
    loading,
    setLoading
  }

  return (
    <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
  )
}
