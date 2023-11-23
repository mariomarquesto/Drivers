import React from 'react'
import { NavLink as NavLinkDom} from "react-router-dom"
<<<<<<< HEAD
import styles from "./Navlink.module.css"
=======
import styles from "./NavLink.module.css"
>>>>>>> 730aaec0e62698841c53269d193dd11555caf658

function Navlink({to, children, ...props}) {
  return (
    <NavLinkDom
        {...props}
        to={to}
        className={({isActive})=>(isActive? styles.isActive: undefined)}
        >
            {children}
        </NavLinkDom>
  )
}

export default Navlink