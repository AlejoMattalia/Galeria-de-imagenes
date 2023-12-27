import { Footer } from "./footer/Footer";
import { NavBarContainer } from "./navBar/NavBarContainer";
import {Outlet} from "react-router-dom" 

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <NavBarContainer/>
      <div className="w-full" style={{minHeight: "77vh"}}>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
