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
  const [openModalPhoto, setOpenModalPhoto] = useState(false);
  const [imageProfile, setImageProfile] = useState(null)


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


  useEffect(()=>{
    axios.get(`http://localhost:4000/api/user/show_image/profiles-images-1703566529887-certificadoWebExperto.jpg`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    .then((res)=>{

      
    })
    .catch((err)=>{   
      console.log(err)
    })
  },[])

  const updateProfileData = (data) => {
    setProfileData(data)
  }




  const data = {
    profileData,
    user,
    setOpenModalDescription,
    openModalDescription,
    openModalPhoto, 
    setOpenModalPhoto,
    updateProfileData,
    imageProfile
  }
  
  return (
    <Profile data={data}/>
  )
}
