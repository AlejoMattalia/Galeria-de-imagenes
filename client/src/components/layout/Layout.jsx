import { Footer } from "./footer/Footer";
import { NavBarContainer } from "./navBar/NavBarContainer";
import {Outlet} from "react-router-dom" 

export function Layout() {
  return (
    <>
      <NavBarContainer/>
      <Outlet/>
      <Footer/>
    </>
  )
}
