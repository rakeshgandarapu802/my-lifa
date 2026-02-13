import React, { useEffect, useState } from "react";
import "../styles.css";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaTint,
  FaHeartbeat,
  FaCalendarAlt,
} from "react-icons/fa";

const Home = () => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donors");

        if (!res.ok) throw new Error("Failed to fetch donors");

        const data = await res.json();

        setDonors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to load donors");
        setDonors([]);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-header">🩸 Blood Donor Directory</h1>

      {error && <p className="error-msg">{error}</p>}

      {donors.length === 0 ? (
        <p className="empty-msg">No donors found</p>
      ) : (
        <div className="card-grid">
          {donors.map((donor) => (
            <div className="donor-card" key={donor._id}>
              <h3 className="donor-name">
                <FaUser /> {donor.name}
              </h3>

              <p><FaPhone /> {donor.phone}</p>
              <p><FaMapMarkerAlt /> {donor.address || "Not provided"}</p>
              <p><FaBuilding /> {donor.district || "Not provided"}</p>

              <p className="blood-group">
                <FaTint /> {donor.bloodGroup}
              </p>

              <p><FaHeartbeat /> {donor.healthIssues}</p>

              <p className="date">
                <FaCalendarAlt />{" "}
                {donor.createdAt
                  ? new Date(donor.createdAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
