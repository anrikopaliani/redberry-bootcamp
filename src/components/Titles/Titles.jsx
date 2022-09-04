import React from "react";
import { useLocation } from "react-router-dom";

import "./Titles.css";

const Titles = () => {
  const { pathname } = useLocation();
  return (
    <div className="titles-container">
      <div>
        <p className={`coworkers ${pathname === "/second" && "dissapear"}`}>
          თანამშრომლის ინფო
        </p>
        {pathname === "/first" && (
          <p style={{ opacity: "0.7" }} className="mobile-page-number">
            1/2
          </p>
        )}
        {pathname === "/first" && <div className="underline"></div>}
      </div>
      <div>
        <p className={pathname === "/first" ? "dissapear" : ""}>
          ლეპტოპის მახასიათებლები
        </p>
        {pathname === "/second" && (
          <p style={{ opacity: "0.7" }} className="mobile-page-number">
            2/2
          </p>
        )}
        {pathname === "/second" && <div className="underline"></div>}
      </div>
    </div>
  );
};

export default Titles;
