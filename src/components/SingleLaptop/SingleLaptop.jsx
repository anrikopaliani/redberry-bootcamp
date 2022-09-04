import React, { useState, useEffect } from "react";
import styles from "./SingleLaptop.module.css";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import SingleLaptopDetails from "./SingleLaptopDetails";

const SingleLaptop = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.detailsContainer}>
        <SingleLaptopDetails />
      </div>
    </div>
  );
};

export default SingleLaptop;
