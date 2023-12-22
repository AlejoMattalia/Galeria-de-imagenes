import { useState } from "react";
import "./navBar.css"
import { AccountMenu } from "./elementsNavBar/AcountMenu"
import { Search } from "./elementsNavBar/Search";
import { TooltipIcon } from "./elementsNavBar/TooltipIcon"
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom"

export function NavBar({data}) {

  const {showSearch, setShowSearch} = data;

  return (
    <>
      <section className="navbar-responsive">
        <Link to="/" style={{color: "#fff", zIndex: 100}}>
          <p>INICIO</p>
        </Link>

        <div className="hidden sm:block w-full">
          <div className="search">
            <input type="text" placeholder="Tiutlo de la imagen o un usuario" />
            <SearchIcon sx={{ background: "#fff", width: "30px", height: "30px", borderLeft: "1px solid black" }} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-">
          <div className="relative left-3 sm:hidden">
            <SearchIcon sx={{ color: "#fff", fontSize: "28px" }} onClick={() => setShowSearch(!showSearch)} />
          </div>
          <div className="relative left-3">
            <TooltipIcon />
          </div>
          <AccountMenu />
        </div>
      </section>

      <div className="sm:hidden">
        <Search showSearch={showSearch} />
      </div>
    </>
  )
}
