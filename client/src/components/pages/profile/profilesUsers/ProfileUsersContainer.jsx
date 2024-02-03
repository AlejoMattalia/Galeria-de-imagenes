import { useContext, useEffect, useState } from "react";
import { ProfileUsers } from "./ProfileUsers";
import { AuthContext } from "../../../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function ProfileUsersContianer() {

  const { token, user } = useContext(AuthContext);
  const { id } = useParams();
  const [follow, setFollow] = useState(false);
  const [login, setLogin] = useState(true);
  const [messageFollow, setMessageFollow] = useState("");
  const [profileDataUsers, setProfileDataUsers] = useState(null)
  const [imageUsersProfile, setImageUsersProfile] = useState(null)
  const [countFollowing, setCountFollowing] = useState(0);
  const [countFollowers, setCountFollowers] = useState(0);
  const [openModalFollowing, setOpenModalFollowing] = useState(false);
  const [openModalFollowers, setOpenModalFollowers] = useState(false)


  useEffect(() => {

    if (id) {
      axios.get(`https://galeria-imagenes-five.vercel.app/api/user/profile/${id}`)
        .then((res) => {
          setProfileDataUsers(res.data.user)
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }, [id])

  useEffect(() => {
    if (profileDataUsers) {
      axios.get(`https://galeria-imagenes-five.vercel.app/api/user/show_image/${profileDataUsers.photo}`, {
        responseType: 'blob' // Esto indica que esperas una respuesta en formato Blob.
      })
        .then((res) => {
          const imageUrl = URL.createObjectURL(new Blob([res.data]));
          setImageUsersProfile(imageUrl)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [profileDataUsers])


  useEffect(()=>{

    if(id && user && token){
      axios.get(`https://galeria-imagenes-five.vercel.app/api/follow/follow_info/${id}`, {
        headers: {
          'Authorization': `${token}`
        }
      })
      .then((res)=>{
        if(res.data.following){
          setFollow(true)
        }else{
          setFollow(false)
        }

        if(res.data.following && res.data.follower){
          setMessageFollow("Se siguen mutuamente")
        }else if(res.data.following && profileDataUsers){
          setMessageFollow(`Seguis a ${profileDataUsers.username}`)
        }else if(res.data.follower){
          setMessageFollow(`${profileDataUsers.username} te sigue`)
        }else{
          setMessageFollow("")
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }

  },[id, follow])

  useEffect(()=>{

    if(id){
      axios.get(`https://galeria-imagenes-five.vercel.app/api/follow/followsUserIds/${id}`)
        .then((res)=>{
          setCountFollowing(res.data.following.length);
          setCountFollowers(res.data.followers.length)
        })
        .catch((err)=>{
          console.log(err)
        })
    }

  },[id, follow])

  const followUser = () => {

    if (id && user && token) {

      axios.post("https://galeria-imagenes-five.vercel.app/api/follow/follow_to_user", { followed: id }, {
        headers: {
          'Authorization': `${token}`
        }
      })
        .then((res) => {

          Toastify({
            text: `${res.data.message} ${profileDataUsers.username}`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "#25D366",
            },
          }).showToast();

          setFollow(true)

        })
        .catch((err) => {
          console.log(err)
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
    }else{
      setLogin(false)
    }
  }


  const unFollow = () => {

    if (id) {
      console.log(id)
      axios.delete(`https://galeria-imagenes-five.vercel.app/api/follow/un_follow/${id}`, {
        headers: {
          'Authorization': `${token}`
        }
      })
      .then((res)=>{

        Toastify({
          text: res.data.message,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#25D366",
          },
        }).showToast();

        setFollow(false)
      })
      .catch((err)=>{
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
    }

  }

  const data = {
    profileDataUsers,
    imageUsersProfile,
    followUser,
    follow,
    login,
    unFollow,
    messageFollow,
    countFollowers,
    countFollowing,
    user,
    openModalFollowing, 
    setOpenModalFollowing,
    openModalFollowers, 
    setOpenModalFollowers,
    id
  }
  return (
    <ProfileUsers data={data} />
  )
}
