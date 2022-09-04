import React, { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import styles from "./SecondForm.module.css";
import FormContext from "../../../context/FormContext";
import CameraImage from "../../../images/ic_baseline-photo-camera.png";
import errorSign from "../../../images/Vector.svg";
import LaptopCpu from "./LaptopCpu";
import { validate } from "./validation";
import axios from "axios";

const BRANDS_URL = "https://pcfy.redberryinternship.ge/api/brands";

const SecondForm = ({ setShowModal }) => {
  const {
    formValues,
    setFormValues,
    setLaptopBrand,
    laptopBrand,
    setTeamName,
    setPositionName,
    setCpuName,
  } = useContext(FormContext);
  const [formErrors, setFormErrors] = useState({});
  const [image, setImage] = useState(null);
  const [brands, setBrands] = useState([]);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  // THIS FUNCTION CONVERTS FILE SIZE WHICH IS IN BYTES INTO MB
  const convertToMegabytes = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  const fetchBrands = async () => {
    const response = await fetch(
      "https://pcfy.redberryinternship.ge/api/brands"
    );
    const brands = await response.json();
    setBrands(brands.data);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    setFormValues({
      ...formValues,
      laptop_image: preview,
    });
  }, [preview]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImage(file);
      // setFormValues({ ...formValues, laptop_image: file });
    } else {
      setImage(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "laptop_brand_id") {
      let { id } = brands.find((brand) => brand.name === value);
      setLaptopBrand(value);
      setFormValues({ ...formValues, [name]: id });
      return;
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    // CHECK IF THERE ARE NO ERRORS
    if (Object.keys(validate(formValues)).length === 0) {
      // TRANSFORM STRING VALUES INTO INTEGERS
      formValues.laptop_cpu_cores = parseInt(formValues.laptop_cpu_cores);
      formValues.laptop_cpu_threads = parseInt(formValues.laptop_cpu_threads);
      formValues.laptop_price = parseInt(formValues.laptop_price);
      formValues.laptop_ram = parseInt(formValues.laptop_ram);
      // REMOVE SPACES IN PHONE NUMBER BECAUSE IT SHOULD NOT BE MORE THAN 13 CHARACTERS LONG
      formValues.phone_number = formValues.phone_number.replace(/\s/g, "");

      const formData = new FormData();
      const obj = {
        ...formValues,
        laptop_image: image,
        token: "d8526be961fba42db085ae7ca06acfb8",
      };
      Object.keys(obj).forEach((key) => formData.append(key, obj[key]));
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(
          "https://pcfy.redberryinternship.ge/api/laptop/create",
          formData,
          config
        )
        .then((res) => {
          // CLEAR THE LOCALSTORAGE AND DATA IN CONTEXT API
          window.localStorage.clear();
          window.localStorage.removeItem("teamName");
          window.localStorage.removeItem("position");
          window.localStorage.removeItem("brandName");
          window.localStorage.removeItem("cpuName");
          setFormValues({});
          setCpuName("");
          setLaptopBrand("");
          setPositionName("");
          setTeamName("");
          // SET THE MODAL STATE TO TRUE IF THE REQUEST IS SUCCESFUL
          setShowModal(true);
        });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {preview ? (
          <div>
            <img className={styles.previewImage} src={preview} alt="img" />
            <div className={styles.imgDetails}>
              <div className={styles.imgName}>
                <div className={styles.checkmark}>
                  <IoMdCheckmark />
                </div>
                <div className={styles.imgSize}>
                  <p>{image && image.name},</p>
                  <p className={styles.mbSize}>
                    {convertToMegabytes(image.size)}mb
                  </p>
                </div>
              </div>
              <button
                onClick={(event) => {
                  setPreview(null);
                  fileInputRef.current.click();
                }}
                className={styles.btn}
              >
                თავიდან ატვირთე
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`${styles.uploadImgContainer} ${
              formErrors.laptop_image && styles.uploadImgContainerError
            }`}
          >
            <div className={styles.desktop}>
              {formErrors.laptop_image && (
                <img
                  width={38}
                  height={34}
                  style={{ display: "block", margin: "auto" }}
                  src={errorSign}
                  alt="error"
                />
              )}
              <p>
                ჩააგდე ან ატვირთე <br /> ლეპტოპის ფოტო
              </p>
              <button
                onClick={(event) => {
                  fileInputRef.current.click();
                }}
                type="button"
                className={styles.btn}
              >
                ატვირთე
              </button>
            </div>
            <div
              className={`${styles.mobile} ${
                formErrors.laptop_image && styles.mobileError
              }`}
            >
              <img src={CameraImage} alt="camera" />
              <button
                onClick={(event) => {
                  fileInputRef.current.click();
                }}
                type="button"
                className={styles.mobileImgSubmitBtn}
              >
                ლეპტოპის ფოტოს <br /> ატვირთვა
              </button>
              {formErrors.laptop_image && <img src={errorSign} alt="error" />}
            </div>
          </div>
        )}
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          name="laptop_image"
          onChange={handleImageChange}
        />
        <div className={styles.laptopBrandsContainer}>
          <div
            className={`${styles.laptopNameContainer} ${
              formErrors && formErrors.laptop_name ? styles.error : ""
            }`}
          >
            <label htmlFor="laptop_name">ლეპტოპის სახელი</label>
            <input
              onChange={handleChange}
              value={formValues.laptop_name}
              type="text"
              id="laptop_name"
              name="laptop_name"
              placeholder="HP"
            />
            <p className={styles.hint}>
              ლათინური ასოები, ციფრები, !@#$%^&*()_+={" "}
            </p>
          </div>
          <div className={styles.laptopBrandsSelect}>
            <select
              style={
                formErrors.laptop_brand_id && { border: "1.8px solid #E52F2F" }
              }
              value={laptopBrand}
              onChange={handleChange}
              name="laptop_brand_id"
              id="brands"
            >
              <option value="" hidden>
                ლეპტოპის ბრენდი
              </option>
              {brands &&
                brands.map((brand) => {
                  return (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <br />
        <hr className={styles.hr} />
        <LaptopCpu formErrors={formErrors} />
        <div className={styles.submitContainer}>
          <Link to="/first" className={styles.backBtn}>
            უკან
          </Link>
          <button type="submit" className={styles.btn}>
            დამახსოვრება
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondForm;
