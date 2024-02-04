import { useContext, useState } from "react";
import { Login } from "./Login";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"
import { AuthContext } from "../../../context/AuthContext";
import Toastify from "toastify-js";


export function LoginContainer() {

  const {setUser} = useContext(AuthContext)

  const { handleChange, handleSubmit, values, errors, resetForm } = useFormik({
    initialValues: {
      username_or_email: "",
      password: ""
    },

    validationSchema: Yup.object({
      username_or_email: Yup.string().required("Este campo es requerido")
        .min(5, "El nombre de usuario debe tener al menos 5 caracteres"),
      password: Yup.string().required("Este campo es requerido")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
    }),

    onSubmit: (data) => {
      console.log(data)
      axios.post("https://galeria-imagenes-pi.vercel.app/api/user/login", data)
        .then((res) => {
          console.log(res)
          if (res) {
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);

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
          }

          resetForm();
        })
        .catch((err) => {
          console.log(err)

          let error;

          if (err.response && err.response.data && err.response.data.message) {
            error = "Error, " + err.response.data.message;
          }
          else {
            error = "Error, no pudiste iniciar sesión"
          }

          if (error) {
            Toastify({
              text: error,
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


  //Ver contraseña
  const [checked, setChecked] = useState(false);
  const handleChangeCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  const data = {
    checked,
    handleChangeCheckbox,
    handleChange,
    handleSubmit,
    values,
    errors,
    resetForm
  }

  return (
    <Login data={data} />
  )
}
