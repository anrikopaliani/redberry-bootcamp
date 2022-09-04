import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "./validation";
import FormContext from "../../../context/FormContext";

import "./first-form.css";

const errorMessageStyle = { color: "#E52F2F" };

const FirstForm = () => {
  const {
    formValues,
    setFormValues,
    teamName,
    setTeamName,
    positionName,
    setPositionName,
  } = useContext(FormContext);

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  // const [selectedPosition, setSelectedPosition] = useState("პოზიცია");
  const [positions, setPositions] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const fetchTeams = async () => {
    const response = await fetch(
      "https://pcfy.redberryinternship.ge/api/teams"
    );
    const { data } = await response.json();
    setTeams(data);
  };

  // FETCHING POSITIONS BASED ON THE TEAM ID
  const fetchPositions = async (id) => {
    if (!id) {
      return;
    }
    const response = await fetch(
      "https://pcfy.redberryinternship.ge/api/positions"
    );
    const { data } = await response.json();
    setPositions(data.filter((d) => d.team_id === id));
  };

  useEffect(() => {
    // FETCHING TEAMS
    fetchTeams();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      const { id } = teams.find((team) => team.name === selectedTeam);
      setFormValues({ ...formValues, team_id: id, position_id: null });
      fetchPositions(id);
    }
  }, [selectedTeam]);

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(formValues));
    window.localStorage.setItem("teamName", teamName);
    window.localStorage.setItem("position", positionName);
    fetchPositions(formValues.team_id);
  }, [formValues, teamName, positionName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleTeamChange = (e) => {
    const { value } = e.target;
    setSelectedTeam(value);
    setPositionName("");
    setTeamName(value);
    const { id } = teams.find((team) => team.name === teamName);
    setFormValues({
      ...formValues,
      team_id: id,
      position_id: null,
    });
    if (id && !formValues.team_id) {
      fetchPositions(id);
    }
    if (formValues.team_id) {
      fetchPositions(formValues.team_id);
    }
  };

  const handlePositionChange = (e) => {
    let positionValue = e.target.value;
    // setSelectedPosition(positionValue);
    setPositionName(positionValue);
    let findPositionId = positions.find((pos) => pos.name === positionValue);
    setFormValues({ ...formValues, position_id: findPositionId.id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(validate(formValues)).length === 0) {
      navigate("/second");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-name">
          <div className={formErrors.name && "errorDiv"}>
            <label htmlFor="name">სახელი</label>
            <input
              onChange={handleChange}
              value={formValues.name}
              name="name"
              placeholder="გრიშა"
              type="text"
            />
            <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
          </div>
          <div className={formErrors.surname && "errorDiv"}>
            <label htmlFor="surname">გვარი</label>
            <input
              onChange={handleChange}
              name="surname"
              value={formValues.surname}
              placeholder="ბაგრატიონი"
              type="text"
              id="surname"
            />
            <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
          </div>
        </div>
        <div className="dropdown-container">
          <select
            className={
              formErrors.team_id ? "error-border full-w-input" : "full-w-input"
            }
            id="teams"
            onChange={handleTeamChange}
            name="teams"
            value={teamName}
          >
            <option value="" hidden disabled>
              თიმი
            </option>
            {teams.map((team) => {
              return (
                <option value={team.name} key={team.id}>
                  {team.name}
                </option>
              );
            })}
          </select>
          <select
            onChange={handlePositionChange}
            value={positionName}
            name="positions"
            className={
              formErrors.position_id
                ? "error-border full-w-input mt-50"
                : "full-w-input mt-50"
            }
            disabled={!teamName}
          >
            <option value="პოზიცია" hidden>
              პოზიცია
            </option>
            {teams
              ? positions.map((pos) => {
                  return (
                    <option
                      value={pos.name}
                      key={pos.id}
                      hidden={pos.id === 0 ? true : false}
                    >
                      {pos.name}
                    </option>
                  );
                })
              : ""}
          </select>
        </div>
        <div className={`mail-container ${formErrors.email && "errorDiv"}`}>
          <label htmlFor="email">მეილი</label>
          <input
            className={formErrors.email && "error-border"}
            onChange={handleChange}
            name="email"
            value={formValues.email || ""}
            type="text"
            id="email"
            placeholder="grish666@redberry.ge"
          />
          <p>უნდა მთავრდებოდეს @redberry.ge-ით</p>
        </div>
        <div
          className={`number-container ${
            formErrors.phone_number && "errorDiv"
          }`}
        >
          <label htmlFor="phone_number">ტელეფონის ნომერი</label>
          <input
            onChange={handleChange}
            name="phone_number"
            value={formValues.phone_number || ""}
            type="text"
            id="phone_number"
            placeholder="+995 598 00 07 01"
          />
          <p>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</p>
        </div>
        <button type="submit" className="submit-btn">
          შემდეგი
        </button>
      </form>
    </div>
  );
};

export default FirstForm;
