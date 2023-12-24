import { Navigate } from "react-router-dom";
import "./profile.css";
import { TailSpin } from 'react-loader-spinner'
import { ModalEditDescription } from "./elementsProfile/ModalEditDescription";
import EditIcon from '@mui/icons-material/Edit';

export function Profile({ data }) {

  const { profileData, user, setOpenModalDescription, openModalDescription } = data;

  return (
    <>
      {
        user ?

          profileData ?
            <section className="container-profile">

              <header>
                <img src="https://res.cloudinary.com/dl6igxwvo/image/upload/v1703353289/usuario_a0btea.png" alt="" />

                <main>
                  <div className="info">
                    <p className="username">{profileData.username}</p>

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
                      <EditIcon onClick={() => setOpenModalDescription(true)} style={{cursor: "pointer"}}/>
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
                  <EditIcon onClick={() => setOpenModalDescription(true)} style={{cursor: "pointer"}}/>
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
                <ModalEditDescription setOpenModalDescription={setOpenModalDescription} openModalDescription={openModalDescription}/>
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
