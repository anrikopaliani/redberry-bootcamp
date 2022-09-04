import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import FormContext from "../../context/FormContext";
import styles from "./SingleLaptopDetails.module.css";

const SingleLaptopDetails = () => {
  const { teams, brands, positions } = useContext(FormContext);
  const findTeamName = (teamId) => {
    const teamName = teams.find((team) => team.id === teamId);
    return teamName.name;
  };

  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchLaptop = async (id) => {
    const response = await fetch(
      `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=d8526be961fba42db085ae7ca06acfb8`
    );
    const { data } = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchLaptop(id);
  }, []);
  console.log(data);

  const findPositionName = (id) => {
    const positionName = positions.find((p) => p.id === id);
    return positionName.name;
  };

  const findBrands = (id) => {
    const brandName = brands.find((b) => b.id === id);
    return brandName.name;
  };

  return Object.keys(data).length !== 0 ? (
    <div className={styles.container}>
      <section className={styles.imgContainer}>
        <img
          src={`https://pcfy.redberryinternship.ge/${data.laptop.image}`}
          alt=""
        />
        <div className={styles.userCredentials}>
          <div className={styles.highlighed}>
            <p>სახელი:</p>
            <p>თიმი:</p>
            <p>პოზიცია:</p>
            <p>მეილი:</p>
            <p>ტელ.ნომერი:</p>
          </div>
          <div className={styles.response}>
            <p>{data.user.name}</p>
            <p>{findTeamName(data.user.team_id)}</p>
            <p>{findPositionName(data.user.position_id)}</p>
            <p>{data.user.email}</p>
            <p>{data.user.phone_number}</p>
          </div>
        </div>
      </section>
      <hr className={styles.hr} />
      <section className={styles.userLaptopContainer}>
        <div className={styles.laptopNameContainer}>
          <div className={styles.highlighed}>
            <p>ლეპტოპის სახელი:</p>
            <p>ლეპტოპის ბრენდი:</p>
            <p>RAM:</p>
            <p>მეხსიერების ტიპი:</p>
          </div>
          <div className={styles.laptopNameContainerResponses}>
            <p>{data.laptop.name}</p>
            <p>{findBrands(data.laptop.brand_id)}</p>
            <p>{data.laptop.ram}</p>
            <p>{data.laptop.hard_drive_type}</p>
          </div>
        </div>
        <div className={styles.laptopCpuDetails}>
          <div className={styles.highlighed}>
            <p>CPU:</p>
            <p>CPU-ს ბირთვი:</p>
            <p>CPU-ს ნაკადი:</p>
          </div>
          <div className={styles.response}>
            <p>{data.laptop.cpu.name}</p>
            <p>{data.laptop.cpu.cores}</p>
            <p>{data.laptop.cpu.threads}</p>
          </div>
        </div>
      </section>
      <hr className={styles.hr} />
      <section className={styles.lastLaptopContainer}>
        <div className={styles.laptopPriceContainer}>
          <div className={styles.highlighed}>
            <p>{window.innerWidth > "768px" && "ლეპტოპის"} მდგომარეობა:</p>
            <p>ლეპტოპის ფასი:</p>
          </div>
          <div className={styles.laptopPriceResponses}>
            <p>{data.laptop.state === "new" ? "ახალი" : "მეორადი"}</p>
            <p>{data.laptop.price}</p>
          </div>
        </div>
        <div className={styles.purchaseDataContainer}>
          <div className={`${styles.highlighed} ${styles.dateKey}`}>
            <p>შეძენის რიცხვი:</p>
          </div>
          <div className={styles.dateResponse}>
            <p>{data.laptop.purchase_date}</p>
            {/* <p>10/20/2022</p> */}
          </div>
        </div>
      </section>
    </div>
  ) : (
    <h1>loading...</h1>
  );
};

export default SingleLaptopDetails;
