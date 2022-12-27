import React from "react";

// import "./KoFi.css";

export default function KoFi(props) {
  const { color, id, label } = props;
  return (
    <div class="btn-container">
      <a
        title={label}
        class="kofi-button"
        style={{ backgroundColor: color }}
        href={"https://ko-fi.com/" + id}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="kofitext">
          <img
            src="https://ko-fi.com/img/cup-border.png"
            class="kofiimg"
            alt="Ko-Fi button"
          />
          {label}
        </span>
      </a>
    </div>
  );
}
