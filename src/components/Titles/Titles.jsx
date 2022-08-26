import React from "react";
import { useLocation } from "react-router-dom";

import "./Titles.css";

const Titles = () => {
  const { pathname } = useLocation();
  return (
    <div className="titles-container">
      <div>
        <p>თანამშრომლის ინფო</p>
        {pathname === "/first" && <div className="underline"></div>}
      </div>
      <div>
        <p>ლეპტოპის მახასიათებლები</p>
        {pathname === "/second" && <div className="underline"></div>}
      </div>
    </div>
  );
};

export default Titles;
