import React from "react";
import { Link } from "react-router-dom";
import Titles from "../Titles/Titles";
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

// const FirstPage = () => {
//   return (
//     <div className="smth">
//       <div className="first-page-container">
//         <div className="first-page-titles-container">
//           <Navbar />
//         </div>
//         <Firstform />
//         <img src={RedberryLogo} className="redberry-logo" alt="redberry logo" />
//       </div>
//     </div>
//   );
// };

export default FirstPage;
