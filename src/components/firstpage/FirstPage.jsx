import React from "react";

import RedberryLogo from "../../images/LOGO-10 2.png";
import styles from "../firstpage/FirstPage.module.css";

// import "./FirstPage.css";
import Firstform from "./form/FirstForm";
import Navbar from "../Navbar/Navbar";

const FirstPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Firstform />
      <img className={styles.logo} src={RedberryLogo} alt="" />
    </div>
  );
};

export default FirstPage;
