import Overlay from "./Overlay";
import ReactDOM from "react-dom";
import React from "react";

export const showWorkingOverlay = (delay = 500) => {
  if (document.getElementById("working-overlay")) return;
  window.overlay = setTimeout(() => {
    const overlay = document.createElement("div");
    ReactDOM.render(<Overlay />, overlay);
    overlay.id = "working-overlay";
    document.body.appendChild(overlay);
  }, delay);
};

export const hideWorkingOverlay = () => {
  clearTimeout(window.overlay);
  if (document.getElementById("working-overlay")) {
    document.getElementById("working-overlay").remove();
  }
};
