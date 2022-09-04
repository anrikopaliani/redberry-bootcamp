import React, { useState, useEffect, useContext } from "react";
import FormContext from "../../../context/FormContext";
import styles from "./LaptopCpu.module.css";
import errorSign from "../../../images/Vector.svg";

const LaptopCpu = ({ formErrors }) => {
  const { formValues, setFormValues, laptopBrand, setCpuName, cpuName } =
    useContext(FormContext);
  const [cpuList, setCpuList] = useState([]);

  const fetchCpus = async () => {
    const response = await fetch("https://pcfy.redberryinternship.ge/api/cpus");
    const { data } = await response.json();
    setCpuList(data);
  };

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(formValues));
    window.localStorage.setItem("brandName", JSON.stringify(laptopBrand));
    window.localStorage.setItem("cpuName", JSON.stringify(cpuName));
  }, [formValues, laptopBrand, cpuName]);

  useEffect(() => {
    fetchCpus();
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "laptop_cpu") {
      setCpuName(value);
    }

    if (name === "laptop_hard_drive_type") {
      window.localStorage.setItem("hard_drive_type", value);
    }

    if (name === "laptop_purchase_date") {
      window.localStorage.setItem("laptop_purchase_date", value);
    }

    if (name === "laptop_state") {
      window.localStorage.setItem("laptop_state", value);
    }

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={styles.fullContainer}>
      <div className={styles.container}>
        <div className={styles.selectContainer}>
          <select
            style={formErrors.laptop_cpu && { border: "1.8px solid #E52F2F" }}
            onChange={handleChange}
            name="laptop_cpu"
            id="laptop_cpu"
            value={cpuName}
          >
            <option value="" hidden>
              CPU
            </option>
            {cpuList &&
              cpuList.map((cpu) => {
                return (
                  <option key={cpu.id} value={cpu.name}>
                    {cpu.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div
          className={`${styles.coreContainer} ${
            formErrors.laptop_cpu_cores ? styles.error : ""
          }`}
        >
          <label htmlFor="laptop_cpu_cores">CPU-ს ბირთვი</label>
          <input
            type="text"
            value={formValues.laptop_cpu_cores}
            onChange={handleChange}
            id="laptop_cpu_cores"
            name="laptop_cpu_cores"
            placeholder="14"
          />
          <p className={styles.hint}>მხოლოდ ციფრები</p>
        </div>
        <div
          className={`${styles.cpuThreads} ${
            formErrors.laptop_cpu_threads ? styles.error : ""
          }`}
        >
          <label htmlFor="laptop_cpu_threads">CPU-ს ნაკადი</label>
          <input
            onChange={handleChange}
            type="text"
            id="laptop_cpu_threads"
            name="laptop_cpu_threads"
            placeholder="365"
          />
          <p className={styles.hint}>მხოლოდ ციფრები</p>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <div
          className={`${styles.ramContainer} ${
            formErrors.laptop_ram ? styles.error : ""
          }`}
        >
          <label htmlFor="laptop_ram">ლეპტოპის RAM (GB)</label>
          <input
            onChange={handleChange}
            value={formValues.laptop_ram}
            type="text"
            id="laptop_ram"
            name="laptop_ram"
            placeholder="16"
          />
          <p style={{ opacity: 0.7 }}>მხოლოდ ციფრები</p>
        </div>
        <div className={styles.hardDriveContainer}>
          <label
            style={formErrors.laptop_hard_drive_type && { color: "#E52F2F" }}
          >
            მეხსიერების ტიპი{" "}
            {formErrors.laptop_hard_drive_type && (
              <img src={errorSign} alt="error" />
            )}
          </label>
          <div className={styles.hardDriveRadioBtnContainer}>
            <div className={styles.sameLine}>
              <input
                checked={
                  window.localStorage.getItem("hard_drive_type") === "SSD"
                }
                value="SSD"
                onChange={handleChange}
                type="radio"
                name="laptop_hard_drive_type"
                id="ssd"
              />
              <label className={styles.radioLabel} htmlFor="ssd">
                SSD
              </label>
            </div>
            <div className={styles.sameLine}>
              <input
                checked={
                  window.localStorage.getItem("hard_drive_type") === "HDD"
                }
                value="HDD"
                onChange={handleChange}
                type="radio"
                name="laptop_hard_drive_type"
                id="hdd"
              />
              <label className={styles.radioLabel} htmlFor="hdd">
                HDD
              </label>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.priceContainer}>
        <div
          className={`${styles.price} ${
            formErrors.laptop_purchase_date && styles.error
          }`}
        >
          <label htmlFor="laptop_purchase_date">
            შეძენის რიცხვი (არჩევითი)
          </label>
          <input
            onChange={handleChange}
            value={
              window.localStorage.getItem("laptop_purchase_date") ||
              formValues.laptop_purchase_date ||
              ""
            }
            type="text"
            name="laptop_purchase_date"
            id="laptop_purchase_date"
            placeholder="დდ / თთ / წწწწ"
          />
        </div>
        <div
          className={`${styles.price} ${
            formErrors.laptop_price && styles.error
          }`}
        >
          <label htmlFor="laptop_price">ლეპტოპის ფასი</label>
          <input
            onChange={handleChange}
            value={formValues.laptop_price || ""}
            type="text"
            className={styles.laptopPriceInput}
            id="laptop_price"
            name="laptop_price"
            placeholder="0000"
          />
          <p style={{ opacity: 0.7 }}>მხოლოდ ციფრები</p>
        </div>
      </div>
      <div>
        <div className={styles.laptopStateContainer}>
          <label style={formErrors.laptop_state && { color: "#E52F2F" }}>
            ლეპტოპის მდგომარეობა{" "}
            {formErrors.laptop_state && <img src={errorSign} alt="error" />}
          </label>
          <div className={styles.laptopStateRadioBtnContainer}>
            <div className={styles.sameLine}>
              <input
                checked={window.localStorage.getItem("laptop_state") === "new"}
                value="new"
                onChange={handleChange}
                type="radio"
                name="laptop_state"
                id="new"
              />
              <label className={styles.radioLabel} htmlFor="">
                ახალი
              </label>
            </div>
            <div className={styles.sameLine}>
              <input
                checked={window.localStorage.getItem("laptop_state") === "used"}
                value="used"
                onChange={handleChange}
                type="radio"
                name="laptop_state"
                id="used"
              />
              <label className={styles.radioLabel} htmlFor="laptop_state">
                მეორადი
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopCpu;
