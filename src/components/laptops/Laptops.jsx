import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import styles from "./Laptops.module.css";
import Navbar from "../Navbar/Navbar";
import UserLaptop from "./UserLaptop";

const Laptops = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <UserLaptop />
      </div>
    </div>
  );
};

export default Laptops;
