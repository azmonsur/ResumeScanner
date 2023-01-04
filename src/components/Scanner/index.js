import React from "react";
import LoadFolder from "../LoadFolder";
import Header from "../Header";

import "./styles.css";

const Scanner = () => {
  return (
    <div className="scanner-container">
      <div className="header">
        <Header />
      </div>
      <div className="load-folder">
        <LoadFolder />
      </div>
    </div>
  );
};

export default Scanner;
