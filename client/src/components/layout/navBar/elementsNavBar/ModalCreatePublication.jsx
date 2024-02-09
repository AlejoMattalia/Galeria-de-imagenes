import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

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

export function ModalCreatePublication({ open, setOpen }) {
  const { token } = useContext(AuthContext);

  const { handleSubmit, handleChange, setFieldValue, values, errors, resetForm } =
    useFormik({
      initialValues: {
        title: "",
        file: "",
        description: "",
      },

      validationSchema: Yup.object({
        title: Yup.string().required("Debes completar este campo"),
        file: Yup.mixed().required("Selecciona un archivo"),
      }),

      onSubmit: (data) => {
        const formData = new FormData();
        formData.append("file0", data.file);
        formData.append("title", data.title);
        formData.append("description", data.description);


        axios
          .post("http://localhost:4000/api/publication/save", formData, {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "multipart/form-data",
            },
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

            resetForm()
            setOpen(false)
          })
          .catch((err) => {
            console.log(err);
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
      },
    });

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "600", marginBottom: "10px" }}
          >
            SUBIR PUBLICACIÓN
          </Typography>

          <form
            action=""
            className="flex flex-col items-stretch gap-3"
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-basic"
              label="Título"
              variant="outlined"
              name="title"
              onChange={handleChange}
              value={values.title}
              error={errors.title}
              helperText={errors.title}
            />

            <input
              type="file"
              name="file"
              onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0]);
              }}
            />
            {errors.file && (
              <p className="text-red-700 text-xs relative bottom-2 left-4">
                {errors.file}
              </p>
            )}

            <TextField
              id="outlined-multiline-static"
              label="Descripción"
              multiline
              rows={3}
              name="description"
              onChange={handleChange}
              value={values.description}
            />

            <Button variant="contained" type="submit">
              Publicar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
