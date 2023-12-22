import { HomeContainer } from "../components/pages/home/HomeContainer";
import { LoginContainer } from "../components/pages/login/LoginContainer";
import {RegisterContainer} from "../components/pages/register/RegisterContainer";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: HomeContainer
  },

  {
    id: "register",
    path: "/register",
    Element: RegisterContainer
  },

  {
    id: "login",
    path: "/login",
    Element: LoginContainer
  }
]