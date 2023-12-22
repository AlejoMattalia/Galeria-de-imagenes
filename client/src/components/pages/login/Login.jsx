import { Button, Checkbox, TextField } from "@mui/material";
import "./login.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export function Login({ data }) {

  const { checked, handleChangeCheckbox, handleChange, handleSubmit, values, errors } = data
  const { user } = useContext(AuthContext)

  return (
    <>
      {
        user ?
          <Navigate to="/" />
          :
          <section className="container-login">

            <main className="main">

              <div className="login">
                <AccountCircleIcon style={{ fontSize: "70px" }} />

                <p className="login-text">INICIAR SESIÓN</p>

                <form action="" onSubmit={handleSubmit}>
                  <TextField
                    id="standard-textarea"
                    label="Email o nombre de usuario"
                    placeholder="Por ejemplo: ZenZorro"
                    multiline
                    variant="standard"
                    sx={{ width: "100%" }}
                    name="username_or_email"
                    onChange={handleChange}
                    value={values.username_or_email}
                    error={errors.username_or_email}
                    helperText={errors.username_or_email}
                  />

                  <TextField
                    id="standard-password-input"
                    label="Contraseña"
                    type={checked ? "text" : "password"}
                    autoComplete="current-password"
                    variant="standard"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password}
                    helperText={errors.password}
                  />

                  <div className="container-checkbox">
                    <Checkbox
                      checked={checked}
                      onChange={handleChangeCheckbox}
                      inputProps={{ 'aria-label': 'Checkbox demo' }}
                      size="small"
                    />
                    <p>Ver contraseña</p>
                  </div>


                  <Button variant="contained" sx={{ marginTop: "10px" }} type="submit">Iniciar sesión</Button>
                </form>

                <p className="mt-3 text-sm">¿No tenés cuenta? <Link to="/register" className="text-blue-600 border-b-[1px] border-blue-600">Registrate</Link></p>
              </div>

            </main>

          </section>
      }

    </>
  )
}
