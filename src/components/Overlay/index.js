import React from "react";

import "./styles.css";

const Overlay = () => {
  return (
    <div className="overlay-wrapper">
      <div className="overlay"></div>
      <div className="circle-wrapper">
        <div className="circle"></div>
        <div className="scanning">Scanning documents...</div>
      </div>
    </div>
  );
};

export default Overlay;
