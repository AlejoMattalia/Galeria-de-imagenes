import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { Button, TextField } from "@mui/material";
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function ModalEditDescription({
  setOpenModalDescription,
  openModalDescription,
  description,
  updateProfileData
}) {

  const {token} = useContext(AuthContext);

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      description: ""
    },

    validationSchema: Yup.object({
      description: Yup.string().required("Debes ingresar algo")
        .min(1, "El nombre de usuario debe tener al menos 1 caracteres")
    }),

    onSubmit: (data) => {

      axios.patch(`https://galeria-imagenes-pi.vercel.app/api/user/update`, data, {
        headers: {
          'Authorization': `${token}`
        }
      })
        .then((res) => {
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

          setOpenModalDescription(false);
          updateProfileData(res.data.user);
          localStorage.setItem('token', res.data.token);
        })
        .catch((err) => {
          console.log(err)
          if (err) {
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
          }
        })
    }
  })


  return (
    <div>
      <Modal
        open={openModalDescription}
        onClose={() => setOpenModalDescription(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar Descripción
          </Typography>

          <form action="" className="w-full mt-3" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Descripción"
              variant="outlined"
              multiline
              rows={4}
              style={{ width: "100%" }}
              name="description"
              onChange={handleChange}
              error={errors.description}
              helperText={errors.description}
              defaultValue={description}
            />

            <div className="w-full flex items-center justify-end mt-2">
              <Button variant="contained" type="submit">Editar</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
