import React from "react";
import { Link } from "react-router-dom";
import styles from "./Modal.module.css";
import Image from "../../images/Frame.png";

const Modal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles["modal-content"]}>
        <div className={styles.imgContainer}>
          <img src={Image} alt="" />
          <h1>
            ჩანაწერი {window.innerWidth > "768px" ? "" : <br />} დამატებულია!
          </h1>
        </div>
        <div className={styles.btnContainer}>
          <Link className={styles.btn} to="/laptops">
            სიაში გადაყვანა
          </Link>
          <Link to="/" className={styles.homeBtn}>
            მთავარი
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
