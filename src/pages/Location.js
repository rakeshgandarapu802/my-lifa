import React, { useEffect, useState } from "react";
import "../styles.css";

export default function Location() {
  const [donors, setDonors] = useState([]);
  const [district, setDistrict] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");

  // ✅ Fetch all donors
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donors");

        if (!res.ok) {
          throw new Error("Failed to fetch donors");
        }

        const result = await res.json();

        // IMPORTANT FIX 👇
        const donorArray = Array.isArray(result.data)
          ? result.data
          : Array.isArray(result)
          ? result
          : [];

        setDonors(donorArray);
        setFiltered(donorArray);
      } catch (err) {
        console.error("Failed to fetch donors:", err);
        setError("❌ Failed to load donors");
        setDonors([]);
        setFiltered([]);
      }
    };

    fetchDonors();
  }, []);

  // ✅ Filter donors whenever district changes
  useEffect(() => {
    if (!district) {
      setFiltered(donors);
    } else {
      const filteredList = donors.filter(
        (d) => d.district === district
      );
      setFiltered(filteredList);
    }
  }, [district, donors]);

  return (
    <div className="page-wrap">
      <h1 className="main-title">Donors by Location</h1>

      {error && <p className="msg">{error}</p>}

      <div className="filter">
        <label>Select District:</label>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">All Districts</option>
          <option>Adilabad</option>
          <option>Bhadradri Kothagudem</option>
          <option>Hanumakonda</option>
          <option>Hyderabad</option>
          <option>Jagtial</option>
          <option>Jangaon</option>
          <option>Jayashankar Bhupalpally</option>
          <option>Jogulamba Gadwal</option>
          <option>Kamareddy</option>
          <option>Karimnagar</option>
          <option>Khammam</option>
          <option>Kumuram Bheem Asifabad</option>
          <option>Mahabubabad</option>
          <option>Mahabubnagar</option>
          <option>Mancherial</option>
          <option>Medak</option>
          <option>Medchal–Malkajgiri</option>
          <option>Mulugu</option>
          <option>Nagarkurnool</option>
          <option>Nalgonda</option>
          <option>Narayanpet</option>
          <option>Nirmal</option>
          <option>Nizamabad</option>
          <option>Peddapalli</option>
          <option>Rajanna Sircilla</option>
          <option>Rangareddy</option>
          <option>Sangareddy</option>
          <option>Siddipet</option>
          <option>Suryapet</option>
          <option>Vikarabad</option>
          <option>Wanaparthy</option>
          <option>Warangal</option>
          <option>Yadadri Bhuvanagiri</option>
        </select>
      </div>

      <div className="table-card">
        <table className="donor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood Group</th>
              <th>Phone</th>
              <th>District</th>
              <th>Health Issues</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No donors found
                </td>
              </tr>
            ) : (
              filtered.map((donor) => (
                <tr key={donor._id}>
                  <td>{donor.name}</td>
                  <td className="blood">{donor.bloodGroup}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.district || "-"}</td>
                  <td>{donor.healthIssues}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
