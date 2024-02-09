import { useState } from "react";
import { NavBar } from "./NavBar";

export function NavBarContainer() {
  //Abrir cerrar buscador
  const [showSearch, setShowSearch] = useState(false);
  const [openModalCreatePublication, setOpenModalCreatePublication] = useState(false)

  const data = {
    setShowSearch,
    showSearch,
    openModalCreatePublication, 
    setOpenModalCreatePublication
  }

  return (
    <NavBar data={data}/>
  )
}
