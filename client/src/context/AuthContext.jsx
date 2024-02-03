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
  const [profileData, setProfileData] = useState(null);
  const [imageProfile, setImageProfile] = useState(null)


  useEffect(() => {
    // Verificamos si el efecto ya se ejecutó antes
    if (!effectStart.current) {

      if (token) {
        axios.get(`https://galeria-imagenes-five.vercel.app/api/user/user_through_token`, {
          headers: {
            'Authorization': `${token}`
          }
        })
          .then((res) => {
            let user = res.data.user;
            setUser(user);
            setProfileData(user)
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

 

  useEffect(() => {
    if (profileData) {
      axios.get(`https://galeria-imagenes-five.vercel.app/api/user/show_image/${profileData.photo}`, {
        responseType: 'blob' // Esto indica que esperas una respuesta en formato Blob.
      })
        .then((res) => {
          console.log(res)
          const imageUrl = URL.createObjectURL(new Blob([res.data]));
          setImageProfile(imageUrl)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [profileData])
  

  
  const data = {
    setUser,
    user,
    loading,
    setLoading,
    token,
    setProfileData,
    profileData,
    imageProfile
  }

  return (
    <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
  )
}
