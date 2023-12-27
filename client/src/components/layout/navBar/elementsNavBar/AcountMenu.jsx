import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'

export function AccountMenu() {
  //Usuario
  const { user, setUser, imageProfile } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Funcion cerrar sesion y cerrar el menu
  const closeSession = () => {
    swal({
      title: "¿Estás seguro de cerrar sesión?",
      dangerMode: true,
      button: "Cerrar sesión"
    })
      .then(willDelete => {
        if (willDelete) {
          setUser(undefined);
          handleClose();
          localStorage.removeItem('token');
        }
      });
  }

  return (
    <Fragment>
      <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 26, height: 26, background: "#fff", color: "#000", fontWeight: 600 }}>{user ? user.username[0].toUpperCase() : null}</Avatar>
          </IconButton>
        </Tooltip>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user ?
          <>
            <Link to={`/profile/${user.id}`}>
              <MenuItem onClick={handleClose}>
                <Avatar sx={{ width: 26, height: 26, background: "#fff", color: "#000", fontWeight: 600 }} alt="Descripción de la imagen"
                  src={imageProfile}></Avatar> Mi cuenta
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={closeSession}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </>
          :
          <>
            <Link to="/login">
              <MenuItem onClick={handleClose}>
                <Avatar /> Iniciar sesión
              </MenuItem>
            </Link>
            <Divider />
            <Link to="/register">
              <MenuItem onClick={handleClose}>
                <LockOpenIcon>
                  <Logout fontSize="small" />
                </LockOpenIcon>
                <p className="relative left-3">Registrarse</p>
              </MenuItem>
            </Link>
          </>
        }
      </Menu>
    </Fragment>
  );
}