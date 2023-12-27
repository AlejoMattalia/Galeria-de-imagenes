import { useContext, useEffect, useState } from "react";
import { Profile } from "./Profile";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export function ProfileContainer() {

  const { token, user, setProfileData, profileData, imageProfile } = useContext(AuthContext);
  // const [profileData, setProfileData] = useState(null);
  const { id } = useParams();
  const [openModalDescription, setOpenModalDescription] = useState(false);
  const [openModalPhoto, setOpenModalPhoto] = useState(false);
  const [openModalUsername, setOpenModalUsername] = useState(false);
  const [viewButtonsEdit, setViewButtonEdit] = useState(false);


  useEffect(() => {

    axios.get(`http://localhost:4000/api/user/profile/${user.id}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then((res) => {
        setProfileData(res.data.user)

        if(user.id === id){
          setViewButtonEdit(true)
        }else{
          setViewButtonEdit(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])


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
    imageProfile,
    setOpenModalUsername,
    openModalUsername,
    viewButtonsEdit
  }

  return (
    <Profile data={data} />
  )
}
