import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { routes } from "./routes";


export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        {
          routes.map(({id, path, Element})=>(
            <Route key={id} path={path} element={<Element/>}/>
          ))
        }
      </Route>
    </Routes>
  )
}
