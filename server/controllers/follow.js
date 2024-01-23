//importaciones
const Follow = require("../models/Follow");
const followSerive = require("../services/followService");

//Acciones

//Seguir a un usuario
const followToUser = (req, res) => {

  const params = req.body;
  const identity = req.user;

  //Verificar si ya sigue al usuario
  Follow.findOne({ user: identity.id, followed: params.followed })
    .then((existingFollow) => {
      if (existingFollow) {
        return res.status(400).json({
          status: "Error",
          message: "Ya sigues a este usuario",
          existingFollow,
        });
      }

      //Crear follow
      const userToFollow = new Follow({
        user: identity.id,
        followed: params.followed,
      });

      // Guardar follow en la base de datos
      userToFollow
        .save()
        .then((follow) => {
          return res.status(200).json({
            status: "Success",
            message: "Comenzaste a seguir a",
            follow,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            status: "Error",
            message: "Error, no pudiste seguir al usuario",
          });
        });

    })
    .catch((err) => {
      return res.status(400).json({
        status: "Error",
        message: "Error, no pudiste seguir al usuario",
      });
    })
}


//Dejar de seguir a un usuario
const unFollow = (req, res) => {

  //Id del usuario logeado
  const userId = req.user.id;
  //Id del usuario que sigo y voy a dejar de seguir
  const followedId = req.params.id


  //Elinar documento
  Follow.findOneAndDelete({
    user: userId,
    followed: followedId,
  })
    .then((follow) => {
      if (follow) {
        return res.status(200).json({
          status: "Success",
          message: "Dejaste de seguir al usuario correctamente",
        });
      } else {
        return res.status(200).json({
          status: "Error",
          message: "Error, no sigues a este usuario",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: "Error",
        message: "Error, no pudiste seguir al usuario",
      });
    })
}


const followInfo = async (req, res) => {

  try {
    const identityUserId = req.user.id
    const profileUserId = req.params.id;


    let following = await Follow.findOne({ "user": identityUserId, "followed": profileUserId });
    let follower = await Follow.findOne({ "user": profileUserId, "followed": identityUserId })

    return res.status(200).json({
      status: "Success",
      message: "Información de seguimiento (Si seguis al usuario y si el tambien te sigue)",
      following,
      follower
    })

  } catch (error) {
    return false;
  }
}


const followsUserIds = async(req, res) => {

  let identityUserId = req.params.id

  let following = await Follow.find({"user": identityUserId})
  .select({ "followed": 1, "_id": 0 }).exec();

  let followers = await Follow.find({"followed": identityUserId})
  .select({ "user": 1, "_id": 0 }).exec();

  let followingClean = [];
  following.forEach(follow => {
    followingClean.push(follow.followed)
  })

  let followersClean = [];
  followers.forEach(follow => {
    followersClean.push(follow.user)
  })

  return res.status(200).json({
    following: followingClean,
    followers: followersClean
  })
}


const following = (req, res) => {

  let userId = req.params.id;
  let page = 1;
  const itemsPerPage = 8;

  if (req.params.page) page = req.params.page;

  Follow.find({ "user": userId })
    .populate("followed", "-password -role -__v")
    .then((follows) => {
      const total = follows.length;
      // Calcular totalPages en base al número total de follows y itemsPerPage
      const totalPages = Math.ceil(total / itemsPerPage);

      // Realizar la paginación usando el método slice para obtener solo la página actual
      const currentPageFollows = follows.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      
      return res.status(200).json({
        status: "Success",
        message: "Los usuarios que sigo",
        total,
        totalPages,
        follows: currentPageFollows,
      })
    })
    .catch((err)=>{
      return res.status(500).json({
        status: "Error",
        message: "Error, no puedes ver el listado de los usuarios",
      });
    })
}


const followers = (req, res) => {
  let userId = req.params.id;
  let page = 1;
  let itemsPerPage = 8;

  if(req.params.page) page = req.params.page;

  Follow.find({"followed": userId})
    .populate("user", "-password -role -__v")
    .then((follows)=>{

      const total = follows.length;
      // Calcular totalPages en base al número total de follows y itemsPerPage
      const totalPages = Math.ceil(total / itemsPerPage);

      // Realizar la paginación usando el método slice para obtener solo la página actual
      const currentPageFollows = follows.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      
      return res.status(200).json({
        status: "Success",
        message: "Los usuarios que sigo",
        total,
        totalPages,
        follows: currentPageFollows,
      })
    })
    .catch(()=>{
      return res.status(500).json({
        status: "Error",
        message: "Error, no puedes ver el listado de los usuarios",
        err
      });
    })
 
}


module.exports = {
  followToUser,
  unFollow,
  followInfo,
  following,
  followsUserIds,
  followers
}