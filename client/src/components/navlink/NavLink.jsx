import { NavLink as NavLinkDom } from "react-router-dom";
import PropTypes from 'prop-types'; // Importa PropTypes

import styles from "./NavLink.module.css";

function Navlink({ to, children, ...props }) {
  return (
    <NavLinkDom
      {...props}
      to={to}
      className={({ isActive }) => (isActive ? styles.isActive : undefined)}
    >
      {children}
    </NavLinkDom>
  );
}

// Agrega validaciones de PropTypes
Navlink.propTypes = {
  to: PropTypes.string.isRequired, // Valida que 'to' sea una cadena y requerida
  children: PropTypes.node.isRequired, // Valida que 'children' sea un nodo de React y requerido
};

export default Navlink;
