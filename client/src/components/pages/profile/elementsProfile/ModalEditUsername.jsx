import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';
import { useContext } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function ModalEditUsername({ openModalUsername, setOpenModalUsername, updateProfileData, username }) {

  const { token } = useContext(AuthContext);

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      username: ""
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Debes ingresar un nombre de usuario")
        .min(5, "El nombre de usuario debe tener al menos 5 caracteres")
        .max(16, "El nombre de usuario no puede tener más de 16 caracteres")
        .matches(/^[a-zA-Z0-9_]+$/, "Solo se permiten letras, números y guiones bajos"),
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

          setOpenModalUsername(false)
          updateProfileData(res.data.user)
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
        open={openModalUsername}
        onClose={() => setOpenModalUsername(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar Nombre de usuario
          </Typography>

          <form action="" onSubmit={handleSubmit} className='mt-5'>

            <TextField
              id="outlined-basic"
              label="Descripción"
              variant="outlined"
              style={{ width: "100%" }}
              name="username"
              onChange={handleChange}
              error={errors.username}
              helperText={errors.username}
              defaultValue={username}
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