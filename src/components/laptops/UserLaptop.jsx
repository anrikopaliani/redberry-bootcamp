import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./UserLaptop.module.css";

const UserLaptop = () => {
  const [laptops, setLaptops] = useState([]);

  const fetchLaptops = async () => {
    // const response = await fetch(
    //   "https://pcfy.redberryinternship.ge/api/laptops?token=b4ae04e1840505aff78f5e5a281225e2"
    // );
    const response = await fetch(
      "https://pcfy.redberryinternship.ge/api/laptops?token=d8526be961fba42db085ae7ca06acfb8"
    );
    const { data } = await response.json();
    setLaptops(data);
  };

  useEffect(() => {
    fetchLaptops();
  }, []);
  console.log(laptops);
  return (
    <div className={styles.container}>
      {laptops.map((item) => {
        return (
          <div key={item.laptop.id} className={styles.laptopContainer}>
            <div className={styles.imgContainer}>
              <img
                src={`https://pcfy.redberryinternship.ge/${item.laptop.image}`}
                alt=""
              />
            </div>
            <div className={styles.laptopUserCotainer}>
              <div className={styles.usernameContainer}>
                <p className={styles.username}>
                  {item.user.name} {item.user.surname}
                </p>
                <p className={styles.laptopName}>{item.laptop.name}</p>
              </div>
              <div>
                <Link
                  to={`/laptop/${item.laptop.id}`}
                  className={styles.seeMoreBtn}
                >
                  მეტის ნახვა
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserLaptop;
