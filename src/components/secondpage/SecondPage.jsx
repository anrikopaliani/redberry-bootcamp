import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import SecondForm from "./secondform/SecondForm";
import styles from "./SecondPage.module.css";
import RedberryLogo from "../../images/LOGO-10 2.png";
import Modal from "../Modal/Modal";

const SecondPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.formContainer}>
        <SecondForm setShowModal={setShowModal} />
      </div>
      <img
        className={styles.redberryLogo}
        src={RedberryLogo}
        alt="redberry logo"
      />
      {showModal && <Modal />}
    </div>
  );
};

export default SecondPage;
