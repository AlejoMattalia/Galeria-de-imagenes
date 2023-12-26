import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const AuthContext = createContext();

export function AuthContextProvider({children}) {

  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const effectStart = useRef(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Verificamos si el efecto ya se ejecutó antes
    if (!effectStart.current) {

      if (token) {
        axios.get(`http://localhost:4000/api/user/user_through_token`, {
          headers: {
            'Authorization': `${token}`
          }
        })
          .then((res) => {
            let user = res.data.user;
            setUser(user);
          })
          .catch((err) => {
            Toastify({
              text: err.response.data.message,
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              style: {
                background: "red",
              },
            }).showToast();
          })
          .finally(() => {
            setLoading(false);
          });

        // Marcamos que el efecto ya se ejecutó
        effectStart.current = true;
      } else {
        setLoading(false);
      }
    }
  }, [user, token]); // Dependencia adicional para evitar un bucle infinito si setUser actualiza el estado

  
  
  const data = {
    setUser,
    user,
    loading,
    setLoading,
    token,
  }

  return (
    <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
  )
}
