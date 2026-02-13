import React from "react";
import "../styles.css";

export default function Info() {
  return (
    <div className="content">
      <h1>Welcome to the Online Blood Bank</h1>
      <p>
        Our Online Blood Bank connects donors with patients in need, ensuring
        timely access to life-saving blood. Whether you're looking to donate,
        find a specific blood group, or respond to an emergency, we've got you
        covered.
      </p>

      <div className="info-cards">
        <div className="card">
          <h2>Donor Registration</h2>
          <p>
            Sign up as a donor to help save lives. Once registered, your
            information will be securely stored and used to match patients in
            need.
          </p>
        </div>

        <div className="card">
          <h2>Blood Availability</h2>
          <p>
            Check the availability of different blood groups in real-time. Our
            platform keeps you updated about blood stocks across hospitals and
            local blood banks.
          </p>
        </div>

        <div className="card">
          <h2>Emergency Requests</h2>
          <p>
            In urgent situations, request blood immediately and connect with
            nearby donors and hospitals. Quick access can save lives.
          </p>
        </div>
      </div>
    </div>
  );
}
