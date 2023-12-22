import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes/AppRouter"
import "normalize.css"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { TailSpin } from 'react-loader-spinner'


function App() {

  const { loading } = useContext(AuthContext);

  console.log(loading)
  return (
    <>
      {
        loading ?
          <div className="w-screen h-screen flex items-center justify-center">
            <TailSpin
              visible={true}
              height="120"
              width="120"
              color="#000"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
          :
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
      }
    </>
  )
}

export default App
