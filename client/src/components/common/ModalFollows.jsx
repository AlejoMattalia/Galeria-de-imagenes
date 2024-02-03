import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 260,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  overflow: "auto",
};

export function ModalFollows({ open, setOpen, id, followingOrFollowers }) {
  const handleClose = () => setOpen(false);
  const [arrayUsers, setArrayUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const functionArrayUsers = async (users) => {
    try {
      const promises = users.map(async (user) => {

        if(followingOrFollowers === "following"){
          var { _id, username, photo } = user.followed;
        }
        if(followingOrFollowers === "followers"){
          var { _id, username, photo } = user.user;
        }

        const response = await axios.get(
          `https://galeria-imagenes-five.vercel.app/api/user/show_image/${photo}`,
          {
            responseType: "blob",
          }
        );

        const imageUrl = URL.createObjectURL(response.data);
        return { id: _id, username, imageUrl };
      });

      // Espera a que todas las promesas se resuelvan
      const resolvedUsers = await Promise.all(promises);
      let array = arrayUsers.concat(resolvedUsers);

      // Actualiza el estado con el nuevo array que contiene todas las imágenes
      setArrayUsers(array);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    if (id) {
      if (followingOrFollowers === "following") {
        axios
          .get(`https://galeria-imagenes-five.vercel.app/api/follow/following/${id}/${page}`)
          .then((res) => {
            if (res.data.follows.length === 0) {
              setHasMore(false);
            } else {
              functionArrayUsers(res.data.follows);
            }
          })
          .catch((error) => {
            console.error("Error fetching following:", error);
          });
      } else if (followingOrFollowers === "followers") {
        axios
          .get(`https://galeria-imagenes-five.vercel.app/api/follow/followers/${id}/${page}`)
          .then((res) => {
            if (res.data.follows.length === 0) {
              setHasMore(false);
            } else {
              functionArrayUsers(res.data.follows);
            }
          })
          .catch((error) => {
            console.error("Error fetching followers:", error);
          });
      }
    }
  }, [id, followingOrFollowers, page]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="infiniteScroll">
          {arrayUsers && (
            <InfiniteScroll
              dataLength={arrayUsers.length}
              next={() => {
                if (hasMore) {
                  setPage(page + 1);
                }
              }}
              hasMore={true}
              loader={
                hasMore && (
                  <div className="w-full flex items-center justify-center">
                    <ThreeDots
                      visible={true}
                      height="80"
                      width="80"
                      color="#000"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                )
              }
              scrollableTarget="infiniteScroll"
            >
              {arrayUsers.map((user) => {
                return (
                  <Link to={`/users/profile/${user.id}`}>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={user.imageUrl}
                        alt=""
                        className="w-10 h-10 rounded-[50%]"
                      />
                      <h1>{user.username}</h1>
                    </div>
                  </Link>
                );
              })}
            </InfiniteScroll>
          )}
        </Box>
      </Modal>
    </div>
  );
}
