import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes/AppRouter"
import "normalize.css"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { RotatingSquare } from 'react-loader-spinner'


function App() {

  const { loading } = useContext(AuthContext);

  console.log(loading)
  return (
    <>
      {
        loading ?
          <div className="w-screen h-screen flex items-center justify-center">
            <RotatingSquare
              visible={true}
              height="200"
              width="200"
              color="#000"
              ariaLabel="rotating-square-loading"
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
