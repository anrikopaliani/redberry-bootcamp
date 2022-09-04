import React from "react";
import Titles from "../Titles/Titles";
import styles from "./Navbar.module.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

const Navbar = () => {
  const { pathname } = useLocation();

  if (pathname.includes("/laptop/")) {
    return (
      <div
        className={`${styles.navbar} ${styles["mt-60"]}`}
        style={{ background: "#fff" }}
      >
        <div>
          <Link to="/laptops" className={styles["btn-back"]}>
            <IoChevronBackSharp color="black" size={30} />
          </Link>
        </div>
        <div>
          <h1 className={styles.laptopInfoTitle}>ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ</h1>
        </div>
        <div className={styles["extra-div"]}></div>
      </div>
    );
  }

  if (pathname === "/laptops") {
    return (
      <nav
        className={`${styles.navbar} ${styles["mt-60"]}`}
        style={{ background: "#fff", width: "100%" }}
      >
        <div>
          <Link to="/" className={styles["btn-back"]}>
            <IoChevronBackSharp color="black" size={30} />
          </Link>
        </div>
        <div>
          <h1 style={{ fontSize: "25px", paddingTop: "14%" }}>
            ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ
          </h1>
        </div>
        <div className={styles["extra-div"]}></div>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div>
        <Link
          to={
            pathname === "/first" ? "/" : pathname === "/second" ? "/first" : ""
          }
          className={styles["btn-back"]}
        >
          <IoChevronBackSharp color="black" size={30} />
        </Link>
      </div>
      <div>
        <Titles />
      </div>
      <div className={styles["extra-div"]}></div>
    </nav>
  );
};

export default Navbar;
