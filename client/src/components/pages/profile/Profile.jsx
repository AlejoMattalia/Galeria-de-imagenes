import { Navigate } from "react-router-dom";
import "./profile.css";
import { TailSpin } from 'react-loader-spinner'
import { ModalEditDescription } from "./elementsProfile/ModalEditDescription";
import EditIcon from '@mui/icons-material/Edit';
import { ModalEditPhoto } from "./elementsProfile/ModalEditPhoto";
import { ModalEditUsername } from "./elementsProfile/ModalEditUsername";

export function Profile({ data }) {

  const { profileData, user, setOpenModalDescription, openModalDescription, openModalPhoto, setOpenModalPhoto, updateProfileData, imageProfile, setOpenModalUsername,
    openModalUsername, viewButtonsEdit } = data;


  return (
    <>
      {
        user ?

          profileData ?
            <section className="container-profile">

              <header>

                <div className="relative p-3 min-[550px]:p-0">
                  <img src={imageProfile} alt="" />

                  {
                    viewButtonsEdit &&
                   <EditIcon onClick={() => setOpenModalPhoto(true)} style={{ cursor: "pointer", position: "absolute", top: 0, right: 0 }} />
                  }
                </div>

                <main>
                  <div className="info">

                    <div className="relative p-5">
                      <p className="username">{profileData.username}</p>
                      {
                        viewButtonsEdit &&
                        <EditIcon onClick={() => setOpenModalUsername(true)} style={{ cursor: "pointer", position: "absolute", top: 0, right: 0 }} />
                      }
                    </div>


                    <section className="container-follow">

                      <div>
                        <p>Seguidores</p>
                        <p className="follow-number">1000</p>
                      </div>

                      <div>
                        <p>Seguidos</p>
                        <p className="follow-number">900</p>
                      </div>

                    </section>
                  </div>

                  <div className="description-desktop">
                    <section>
                      <p className="title-description">DESCRIPCIÓN</p>
                      {
                        viewButtonsEdit &&
                        <EditIcon onClick={() => setOpenModalDescription(true)} style={{ cursor: "pointer" }} />
                      }
                    </section>

                    <div>
                      <p>{profileData.description}</p>
                    </div>
                  </div>

                </main>
              </header>

              <div className="description-mobile">
                <section>
                  <p className="title-description">DESCRIPCIÓN</p>
                  {
                    viewButtonsEdit &&
                    <EditIcon onClick={() => setOpenModalDescription(true)} style={{ cursor: "pointer" }} />
                  }
                </section>

                <div>
                  <p>{profileData.description}</p>
                </div>
              </div>


              <section className="container-images">
                <p>IMAGENES</p>
              </section>

              {
                openModalDescription &&
                <ModalEditDescription setOpenModalDescription={setOpenModalDescription} openModalDescription={openModalDescription} description={profileData.description} updateProfileData={updateProfileData} />
              }

              {
                openModalPhoto &&
                <ModalEditPhoto openModalPhoto={openModalPhoto} setOpenModalPhoto={setOpenModalPhoto} updateProfileData={updateProfileData} />
              }

              {
                openModalUsername &&
                <ModalEditUsername openModalUsername={openModalUsername} setOpenModalUsername={setOpenModalUsername} updateProfileData={updateProfileData} username={profileData.username}/>
              }

            </section>

            :
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
          :
          <>
            <Navigate to="/" />
          </>
      }
    </>

  )
}
