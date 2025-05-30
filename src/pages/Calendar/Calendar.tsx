import React from "react";

function Calendar() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Nepali Calendar</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <iframe
          title="Nepali Patro"
          src="https://www.ashesh.com.np/nepali-calendar/"
          style={{
            width: "100%",
            height: "650px",
            border: "none",
          }}
        ></iframe>
      </div>
    </div>
  );
}

export default Calendar;
