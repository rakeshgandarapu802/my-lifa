import React, { useEffect, useState } from "react";
import "../styles.css";

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donors");

        if (!res.ok) {
          throw new Error("Failed to fetch donors");
        }

        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          setDonors(result.data);
        } else {
          setDonors([]);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("❌ Failed to load donors");
        setDonors([]);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div className="page-wrap">
      <h1 className="main-title">Blood Bank Management</h1>
      <h2 className="form-title">Registered Donors</h2>

      {error && <p className="msg">{error}</p>}

      {donors.length === 0 ? (
        <p className="empty">No donors found</p>
      ) : (
        <div className="card-grid">
          {donors.map((donor) => (
            <div className="donor-card" key={donor._id}>
              <div className="card-header">
                <h3>{donor.name}</h3>
                <span className="blood-badge">{donor.bloodGroup}</span>
              </div>

              <p><strong>📞 Phone:</strong> {donor.phone}</p>
              <p><strong>📍 District:</strong> {donor.district || "-"}</p>
              <p><strong>🏥 Health:</strong> {donor.healthIssues}</p>
              <p className="date">
                Registered:{" "}
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

export default Donors;
