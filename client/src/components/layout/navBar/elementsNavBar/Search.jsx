import "../navBar.css";
import SearchIcon from '@mui/icons-material/Search';
import { motion } from "framer-motion";

export function Search({showSearch}) {  
  return (
    <motion.section className="container-search" initial={{ y: -100 }}
    animate={showSearch ? { y: 0 } : { y: -120 }}
    transition={{ duration: 1.5 }}>

      <div className="search">
        <input type="text" placeholder="Tiutlo de la imagen o un usuario" />
        <SearchIcon sx={{background: "#fff", width: "30px", height: "30px", borderLeft: "1px solid black"}}/>
      </div>

    </motion.section>
  )
}
