import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from "formik";
import * as Yup from "yup";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';
import { useContext } from 'react';
import { Button } from '@mui/material';

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

// ...

export function ModalEditPhoto({ openModalPhoto, setOpenModalPhoto }) {
  const { token } = useContext(AuthContext);

  const { handleSubmit, setFieldValue, errors} = useFormik({
    initialValues: {
      file: null,
    },

    validationSchema: Yup.object({
      file: Yup.mixed().required('Selecciona un archivo'),
    }),

    onSubmit: (data) => {
      const formData = new FormData();
      formData.append("file0", data.file);

      axios.post("http://localhost:4000/api/user/upload_image", formData, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'multipart/form-data'
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

          setOpenModalPhoto(false)
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
        });
    }
  });

  return (
    <div>
      <Modal
        open={openModalPhoto}
        onClose={() => setOpenModalPhoto(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar foto de perfil
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className='mt-5'>
            <input
              type="file"
              name="file"
              onChange={(event) => {
                setFieldValue('file', event.currentTarget.files[0]);
              }}
            />
            {errors.file && (
              <p className="text-red-700 text-sm mt-1">{errors.file}</p>
            )}
            <div className="w-full flex items-center justify-end mt-2">
              <Button variant="contained" type="submit">Editar foto</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
