import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./Profile.css";

const Card = ({ title, topColor, children }) => {
  return (
    <div className="card">
      <div className="card-top" style={{ backgroundColor: topColor }}>
        <h4 className="card-title">{title}</h4>
        <h4>
          <FontAwesomeIcon icon={faEdit} />
        </h4>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;