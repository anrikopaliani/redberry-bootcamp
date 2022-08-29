import React from "react";
import Titles from "../Titles/Titles";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles["btn-back"]}>
        <IoChevronBackSharp size={30} />
      </Link>
      <div>
        <Titles />
      </div>
      <div className={styles["extra-div"]}></div>
    </nav>
  );
};

export default Navbar;
