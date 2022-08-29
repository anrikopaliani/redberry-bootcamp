import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Redberry from "../../images/LOGO-02 1.svg";
import Group from "../../images/Group1.png";
import MobileGroup from "../../images/Group.svg";

const Home = () => {
  return (
    <div className={styles.container}>
      <div>
        <img
          className={styles.redberrylogo}
          width={112}
          height={18}
          src={Redberry}
          alt="redberry logo"
        />
      </div>
      <div className={styles.groupImgContainer}>
        <img
          className={styles.img1}
          width={781}
          height={482}
          src={Group}
          alt=""
        />
        <img className={styles.img2} src={MobileGroup} alt="" />
      </div>
      <div className={styles.btnContainer}>
        <Link to="/first" className={styles.btn}>
          ჩანაწერის დამატება
        </Link>
        <Link to="/" className={styles.btn}>
          ჩანაწერების სია
        </Link>
      </div>
    </div>
  );
};

export default Home;
