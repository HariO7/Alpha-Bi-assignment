import React from "react";
import "./LoadingSpinner.css";
function LoadingSpinner() {
  return (
    <div className="loader">
      <i className="fa-solid fa-circle-notch fa-4x fa-spin"></i>
    </div>
  );
}

export default LoadingSpinner;
