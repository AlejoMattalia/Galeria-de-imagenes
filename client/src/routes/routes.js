import { HomeContainer } from "../components/pages/home/HomeContainer";
import { LoginContainer } from "../components/pages/login/LoginContainer";
import { ProfileContainer } from "../components/pages/profile/ProfileContainer";
import { ProfileUsersContianer } from "../components/pages/profile/profilesUsers/ProfileUsersContainer";
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
  },

  {
    id: "profile",
    path: "/profile/:id",
    Element: ProfileContainer
  },

  {
    id: "profileUsers",
    path: "/users/profile/:id",
    Element: ProfileUsersContianer
  }
]