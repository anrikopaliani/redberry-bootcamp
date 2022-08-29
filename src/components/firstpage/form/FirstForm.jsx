import React, { useState, useEffect, useContext } from "react";
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

  // useEffect(() => {
  //   // EVERYTIME THE USER CHANGES THE TEAM, VARIABLE "findTeamId" CHANGES
  //   setSelectedPosition("პოზიცია");
  //   let findTeamId = formValues.teams
  //     ? teams.find((team) => team.name === formValues.teams)
  //     : 0;
  //   setFormValues({
  //     ...formValues,
  //     team_id: findTeamId.id,
  //     position_id: null,
  //   });
  //   fetchPositions(findTeamId.id);
  // }, [formValues.teams]);

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

    // if (!formValues.team_id) {
    //   setSelectedTeams(e.target.value);
    //   // let { id } = teams.find((team) => team.name === selectedTeam);
    //   // setFormValues({ ...formValues, teams: teamValue, team_id: id });
    //   if (teamValue) {
    //     // fetchPositions(id);
    //   }
    // } else {
    //   setSelectedTeams(e.target.value);
    //   setFormValues({ ...formValues, teams: teamValue });
    //   let { id } = teams.find((team) => team.name === setSelectedTeams);
    //   fetchPositions(id);
    // }
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
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-name">
          <div>
            <label htmlFor="name">სახელი</label>
            <input
              className={formErrors.name && "error-border"}
              onChange={handleChange}
              value={formValues.name}
              name="name"
              placeholder="გრიშა"
              type="text"
            />
            {formErrors.name && formErrors.name !== "required" ? (
              <p style={errorMessageStyle}>{formErrors.name}</p>
            ) : (
              <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
            )}
          </div>
          <div>
            <label htmlFor="surname">გვარი</label>
            <input
              className={formErrors.surname && "error-border"}
              onChange={handleChange}
              name="surname"
              value={formValues.surname}
              placeholder="ბაგრატიონი"
              type="text"
              id="surname"
            />
            {formErrors.surname && formErrors.surname !== "required" ? (
              <p style={errorMessageStyle}>{formErrors.surname}</p>
            ) : (
              <p>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
            )}
          </div>
        </div>
        <div className="dropdown-container">
          <select
            // onChange={(e) => setSelected(e.target.value)}
            className={
              formErrors.team_id ? "error-border full-w-input" : "full-w-input"
            }
            id="teams"
            onChange={handleTeamChange}
            name="teams"
            // defaultValue={formValues.teams || ""}
            // value={formValues.teams || selectedTeam}
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
            // value={selectedPosition}
            // value={formValues.positions}
            // defaultValue={}
            value={positionName}
            name="positions"
            className={
              formErrors.position_id
                ? "error-border full-w-input mt-50"
                : "full-w-input mt-50"
            }
          >
            <option
              value="პოზიცია"
              hidden
              // selected={selectedPosition === "პოზიცია" ? true : false}
            >
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
        <div className="mail-container">
          <label htmlFor="email">მეილი</label>
          <input
            className={formErrors.email && "error-border"}
            onChange={handleChange}
            name="email"
            value={formValues.email}
            type="text"
            id="email"
            placeholder="grish666@redberry.ge"
          />
          {formErrors.email && formErrors.email !== "required" ? (
            <p style={errorMessageStyle}>{formErrors.email}</p>
          ) : (
            <p>უნდა მთავრდებოდეს @redberry.ge-ით</p>
          )}
        </div>
        <div className="number-container">
          <label htmlFor="number">ტელეფონის ნომერი</label>
          <input
            className={formErrors.phone && "error-border"}
            onChange={handleChange}
            name="phone"
            value={formValues.phone}
            type="text"
            id="number"
            placeholder="+995 598 00 07 01"
          />
          {formErrors.phone !== "required" && formErrors.phone ? (
            <p style={errorMessageStyle}>{formErrors.phone}</p>
          ) : (
            <p>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</p>
          )}
        </div>
        <button type="submit" className="submit-btn">
          შემდეგი
        </button>
      </form>
    </div>
  );
};

export default FirstForm;
