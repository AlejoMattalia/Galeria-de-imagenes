import { TailSpin } from "react-loader-spinner";
import "../profile.css";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { ModalFollows } from "../../../common/ModalFollows";

export function ProfileUsers({ data }) {
  const {
    profileDataUsers,
    imageUsersProfile,
    followUser,
    unFollow,
    follow,
    login,
    messageFollow,
    countFollowers,
    countFollowing,
    user,
    openModalFollowing,
    setOpenModalFollowing,
    openModalFollowers,
    setOpenModalFollowers,
    id,
  } = data;

  return (
    <>
      {
        user ?
        user.id !== id ? (
        <>
          {profileDataUsers ? (
            <section className="container-profile">
              <header>
                <div className="relative p-3 min-[550px]:p-0">
                  <img src={imageUsersProfile} alt="" />
                </div>

                <main>
                  <div className="info">
                    <div className="relative p-5">
                      <p className="username">{profileDataUsers.username}</p>
                    </div>

                    <section
                      className={`flex flex-col items-center justify-center relative ${
                        user ? "min-[650px]:top-5" : "min-[650px]:top-1"
                      }`}
                    >
                      <div className="flex gap-10">
                        <div
                          className="flex flex-col items-center justify-center flex-wrap sm:flex-row min-[650px]:gap-1 cursor-pointer"
                          onClick={() => setOpenModalFollowers(true)}
                        >
                          <p>Seguidores</p>
                          <p className="font-bold relative bottom-1 min-[650px]:top-[1px]">
                            {countFollowers}
                          </p>
                        </div>

                        <div
                          className="flex flex-col items-center justify-center flex-wrap sm:flex-row min-[650px]:gap-1 cursor-pointer"
                          onClick={() => setOpenModalFollowing(true)}
                        >
                          <p>Seguidos</p>
                          <p className="font-bold relative bottom-1 min-[650px]:top-[1px]">
                            {countFollowing}
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-[650px]:mt-2">
                        {user && (
                          <>
                            {follow ? (
                              <Button
                                variant="outlined"
                                size="small"
                                fullWidth
                                onClick={unFollow}
                              >
                                Siguiendo
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                size="small"
                                fullWidth
                                onClick={followUser}
                              >
                                Seguir
                              </Button>
                            )}
                          </>
                        )}
                      </div>

                      <div className="w-full flex items-center justify-start">
                        {user && <p className="text-xs">{messageFollow}</p>}
                      </div>
                    </section>
                  </div>

                  <div className="description-desktop">
                    <section>
                      <p className="title-description">DESCRIPCIÓN</p>
                    </section>

                    <div>
                      <p>{profileDataUsers.description}</p>
                    </div>
                  </div>
                </main>
              </header>

              <div className="description-mobile">
                <section>
                  <p className="title-description">DESCRIPCIÓN</p>
                </section>

                <div>
                  <p>{profileDataUsers.description}</p>
                </div>
              </div>

              <section className="container-images">
                <p>IMAGENES</p>
              </section>
            </section>
          ) : (
            <div className="w-screen h-screen flex items-center justify-center">
              <TailSpin
                visible={true}
                height="120"
                width="120"
                color="#000"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}

          {openModalFollowing && (
            <ModalFollows
              open={openModalFollowing}
              setOpen={setOpenModalFollowing}
              id={id}
              followingOrFollowers="following"
            />
          )}

          {openModalFollowers && (
            <ModalFollows
              open={openModalFollowers}
              setOpen={setOpenModalFollowers}
              id={id}
              followingOrFollowers="followers"
            />
          )}

          {login === false && <Navigate to="/login" />}
        </>
      ) : (
        <Navigate to={`/profile/${user.id}`} />
      ):
      <>
      {profileDataUsers ? (
        <section className="container-profile">
          <header>
            <div className="relative p-3 min-[550px]:p-0">
              <img src={imageUsersProfile} alt="" />
            </div>

            <main>
              <div className="info">
                <div className="relative p-5">
                  <p className="username">{profileDataUsers.username}</p>
                </div>

                <section
                  className={`flex flex-col items-center justify-center relative ${
                    user ? "min-[650px]:top-5" : "min-[650px]:top-1"
                  }`}
                >
                  <div className="flex gap-10">
                    <div
                      className="flex flex-col items-center justify-center flex-wrap sm:flex-row min-[650px]:gap-1 cursor-pointer"
                      onClick={() => setOpenModalFollowers(true)}
                    >
                      <p>Seguidores</p>
                      <p className="font-bold relative bottom-1 min-[650px]:top-[1px]">
                        {countFollowers}
                      </p>
                    </div>

                    <div
                      className="flex flex-col items-center justify-center flex-wrap sm:flex-row min-[650px]:gap-1 cursor-pointer"
                      onClick={() => setOpenModalFollowing(true)}
                    >
                      <p>Seguidos</p>
                      <p className="font-bold relative bottom-1 min-[650px]:top-[1px]">
                        {countFollowing}
                      </p>
                    </div>
                  </div>

                  <div className="w-full min-[650px]:mt-2">
                    {user && (
                      <>
                        {follow ? (
                          <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            onClick={unFollow}
                          >
                            Siguiendo
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            onClick={followUser}
                          >
                            Seguir
                          </Button>
                        )}
                      </>
                    )}
                  </div>

                  <div className="w-full flex items-center justify-start">
                    {user && <p className="text-xs">{messageFollow}</p>}
                  </div>
                </section>
              </div>

              <div className="description-desktop">
                <section>
                  <p className="title-description">DESCRIPCIÓN</p>
                </section>

                <div>
                  <p>{profileDataUsers.description}</p>
                </div>
              </div>
            </main>
          </header>

          <div className="description-mobile">
            <section>
              <p className="title-description">DESCRIPCIÓN</p>
            </section>

            <div>
              <p>{profileDataUsers.description}</p>
            </div>
          </div>

          <section className="container-images">
            <p>IMAGENES</p>
          </section>
        </section>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <TailSpin
            visible={true}
            height="120"
            width="120"
            color="#000"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

      {openModalFollowing && (
        <ModalFollows
          open={openModalFollowing}
          setOpen={setOpenModalFollowing}
          id={id}
          followingOrFollowers="following"
        />
      )}

      {openModalFollowers && (
        <ModalFollows
          open={openModalFollowers}
          setOpen={setOpenModalFollowers}
          id={id}
          followingOrFollowers="followers"
        />
      )}

      {login === false && <Navigate to="/login" />}
    </>
      }
    </>
  );
}
