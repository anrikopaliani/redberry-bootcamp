import { createContext, useState, useEffect, useReducer } from "react";

const FormContext = createContext();

const TEAMS_URL = "https://pcfy.redberryinternship.ge/api/teams";
const POSITIONS_URL = "https://pcfy.redberryinternship.ge/api/positions";

export const FormProvider = ({ children }) => {
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    teams: "",
    team_id: null,
    position_id: null,
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

  return (
    <FormContext.Provider
      value={{
        formValues,
        teamName,
        positionName,
        setFormValues,
        setTeamName,
        setPositionName,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
