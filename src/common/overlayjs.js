import Overlay from "./Overlay";
import Notification from "./Notification";
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

export const showPageNotice = (
  message = "Sorry, we can't complete your request right now",
  type = "error",
  dismiss_timeout = 3000,
  class_name
) => {
  hidePageNotice(class_name);
  const newNotice = document.createElement("div");
  const transitionTime = 600; // milliseconds

  newNotice.classList.add(class_name || "page-notice");
  newNotice.style.top = "-80px";
  newNotice.style.transition = "top 600ms ease-in-out";
  if (type) newNotice.classList.add(type);

  ReactDOM.render(
    <Notification
      noBorderRadius={true}
      type={type}
      notifications={[message]}
      onClose={() => hidePageNotice(class_name)}
    />,
    newNotice
  );

  // newNotice.addEventListener("click", () => hidePageNotice(class_name));
  document.body.appendChild(newNotice);
  setTimeout(() => {
    newNotice.style.transition = `top ${transitionTime}ms ease-in-out`;
    newNotice.style.top = "0px";
  });

  if (type !== "error" || dismiss_timeout) {
    window.pageNoticeTimeout = setTimeout(() => {
      newNotice.style.transition = "top 600ms ease-in-out";
      newNotice.style.top = "-80px";
      setTimeout(() => {
        newNotice.remove();
        window.pageNoticeTimeout = null;
      }, transitionTime);
    }, dismiss_timeout);
  }
};

export const hidePageNotice = (className) => {
  let notice = document.querySelectorAll(
    className ? `.${className}` : ".page-notice"
  );
  if (notice.length) {
    document.body.removeEventListener("click", () => hidePageNotice(className));

    if (window.pageNoticeTimeout) {
      clearTimeout(window.pageNoticeTimeout);
    }
    notice = notice[0];

    notice.style.transition = "opacity 400ms ease-in-out";
    notice.style.opacity = "0";
    setTimeout(() => {
      notice.remove();
    }, 300);
  }
};
