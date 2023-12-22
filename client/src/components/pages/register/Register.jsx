import { Button, Checkbox, TextField } from "@mui/material";
import "./register.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Navigate } from "react-router-dom"

export function Register({ data }) {

  const { handleChange, handleSubmit, values, errors, checked, handleChangeCheckbox, user} = data;

  return (

    <>
      {
        user ?
          <>
            <Navigate to="/" />
          </>
          :
          <section className="container-register">
            <main className="main">

              <div className="register">
                <AccountCircleIcon style={{ fontSize: "70px" }} />

                <p className="register-text">REGISTRARSE</p>

                <form action="" onSubmit={handleSubmit}>
                  <TextField
                    id="standard-textarea"
                    label="Nombre de usuario"
                    placeholder="Por ejemplo: ZenZorro"
                    multiline
                    variant="standard"
                    sx={{ width: "100%" }}
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    error={errors.username}
                    helperText={errors.username}
                  />

                  <TextField
                    id="standard-textarea"
                    label="Email"
                    placeholder="Por ejemplo: email@gmail.com"
                    multiline
                    variant="standard"
                    sx={{ width: "100%" }}
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    error={errors.email}
                    helperText={errors.email}
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

                  <Button variant="contained" sx={{ marginTop: "10px" }} type="submit">Registrarse</Button>

                </form>

                <p className="mt-3 text-sm">¿Ya ténes cuenta? <Link to="/login" className="text-blue-600 border-b-[1px] border-blue-600">Inicia Sesión</Link></p>
              </div>
            </main>
          </section>
      }
    </>
  )
}
