import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { Button, TextField } from "@mui/material";

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
}) {

  const {handleSubmit, handleChange, values, errors} = useFormik({
    initialValues: {
      description: ""
    },

    validationSchema: Yup.object({
      description: Yup.string().required("Debes ingresar una descripción")
      .min(1, "El nombre de usuario debe tener al menos 1 caracteres")
    }),

    onSubmit: (data) => {
      console.log(data)
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
              value={values.description}
              error={errors.description}
              helperText={errors.description}
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
