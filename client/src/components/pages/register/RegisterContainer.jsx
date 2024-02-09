import { Register } from "./Register";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useContext, useState } from "react";
import axios from "axios"
import { AuthContext } from "../../../context/AuthContext";

export function RegisterContainer() {

  const { user, setUser } = useContext(AuthContext)

  const { handleChange, handleSubmit, values, errors, resetForm } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Este campo es obligatorio")
        .min(5, "El nombre de usuario debe tener al menos 5 caracteres")
        .max(16, "El nombre de usuario no puede tener más de 16 caracteres")
        .matches(/^[a-zA-Z0-9_]+$/, "Solo se permiten letras, números y guiones bajos"),

      email: Yup.string().required("Este campo es obligatorio")
        .email("Formato de correo electrónico inválido")
        .max(255, "El correo electrónico no puede tener más de 255 caracteres")
        .test('lowercase', 'El correo electrónico debe contener solo minúsculas', function (value) {
          return value === value.toLowerCase();
        })
        .matches(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, "Formato de correo electrónico inválido"),

      password: Yup.string().required("Este campo es obligatorio")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
        .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .matches(/\d/, "Debe contener al menos un número")
    }),

    onSubmit: (data) => {

      if (data) {
        axios.post("http://localhost:4000/api/user/register", data)
          .then((res) => {
            if (res) {
              setUser(res.data.user);
              localStorage.setItem('token', res.data.token);

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
            let error;

            if (err.response && err.response.data && err.response.data.messageError) {
              error = "Error, " + err.response.data.messageError;
            }
            else {
              error = "Error, no pudiste regitrarte"
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
    }
  })


  //Ver contraseña
  const [checked, setChecked] = useState(false);
  const handleChangeCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  const data = {
    handleChange,
    handleSubmit,
    values,
    errors,
    checked,
    handleChangeCheckbox,
    user
  }
  return (
    <Register data={data} />
  )
}
