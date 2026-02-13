import React from "react";
import "../styles.css";

const Success = () => (
  <div className="app-wrap">
    <div className="card">
      <h2 className="form-title">Thank you!</h2>
      <p>Your donation form has been submitted successfully. We appreciate your willingness to help.</p>
      <a className="btn btn-ghost" href="/">Back to Home</a>
      <a className="btn btn-primary" href="/donors" style={{ marginLeft: 12 }}>View Donors</a>
    </div>
  </div>
);

export default Success;
