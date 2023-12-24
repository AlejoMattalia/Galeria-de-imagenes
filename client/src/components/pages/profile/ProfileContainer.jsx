import { useContext, useEffect, useState } from "react";
import { Profile } from "./Profile";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export function ProfileContainer() {

  const {token, user} = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const {id} = useParams();
  const [openModalDescription, setOpenModalDescription] = useState(false);


  useEffect(()=>{

    axios.get(`http://localhost:4000/api/user/profile/${id}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    .then((res)=>{
      setProfileData(res.data.user) 
    })
    .catch((err)=>{   
      console.log(err)
    })

  },[id])

  const data = {
    profileData,
    user,
    setOpenModalDescription,
    openModalDescription
  }
  
  return (
    <Profile data={data}/>
  )
}
