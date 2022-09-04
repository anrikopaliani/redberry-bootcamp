import { createContext, useState, useEffect, useReducer } from "react";

const FormContext = createContext();

const TEAMS_URL = "https://pcfy.redberryinternship.ge/api/teams";
const POSITIONS_URL = "https://pcfy.redberryinternship.ge/api/positions";

export const FormProvider = ({ children }) => {
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    team_id: null,
    position_id: null,
    laptop_name: "",
    laptop_brand_id: null,
    laptop_image: "",
    laptop_cpu: null,
    laptop_cpu_cores: "",
    laptop_cpu_threads: "",
    laptop_ram: "",
    laptop_price: "",
    laptop_purchase_date: "",
  };
  const [formValues, setFormValues] = useState(
    JSON.parse(window.localStorage.getItem("data")) || initialValues
  );
  const [teamName, setTeamName] = useState(
    window.localStorage.getItem("teamName") || ""
  );
  const [positionName, setPositionName] = useState(
    window.localStorage.getItem("position") || ""
  );
  const [laptopBrand, setLaptopBrand] = useState(
    JSON.parse(window.localStorage.getItem("brandName")) || ""
  );
  const [cpuName, setCpuName] = useState(
    JSON.parse(window.localStorage.getItem("cpuName")) || ""
  );

  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);
  const [brands, setBrands] = useState([]);

  const fetchTeams = async () => {
    const response = await fetch(
      "https://pcfy.redberryinternship.ge/api/teams"
    );
    const { data } = await response.json();
    setTeams(data);
  };

  const fetchPositions = async () => {
    const response = await fetch(
      "https://pcfy.redberryinternship.ge/api/positions"
    );
    const { data } = await response.json();
    setPositions(data);
  };

  const fetchBrands = async () => {
    const response = await fetch(
      "https://pcfy.redberryinternship.ge/api/brands"
    );
    const { data } = await response.json();
    setBrands(data);
  };

  useEffect(() => {
    fetchTeams();
    fetchPositions();
    fetchBrands();
  }, []);

  return (
    <FormContext.Provider
      value={{
        formValues,
        teamName,
        positionName,
        laptopBrand,
        cpuName,
        teams,
        positions,
        brands,
        setFormValues,
        setTeamName,
        setPositionName,
        setLaptopBrand,
        setCpuName,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
