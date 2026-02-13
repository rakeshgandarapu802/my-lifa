import React, { useState } from "react";
import "../styles.css";

const Register = () => {
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const form = e.target;

    const payload = {
      name: form.name.value,
      phone: form.phone.value,
      address: form.address.value,
      district: form.district.value,
      bloodGroup: form.bloodGroup.value,
      healthIssues: form.healthIssues.value || "No",
    };

    try {
      const res = await fetch("http://localhost:5000/api/donors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setMsg(data.message || "Something went wrong");

      if (res.ok) {
        form.reset();
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMsg("❌ Cannot connect to server");
    }
  };

  return (
    <div className="app-wrap">
      <div className="card">
        <h1 className="main-title">Blood Bank Management</h1>
        <h2 className="form-title">Donor Registration</h2>

        {msg && <p className="msg">{msg}</p>}

        <form onSubmit={handleSubmit} className="form">
          <label>Full Name</label>
          <input type="text" name="name" required />

          <label>Phone Number</label>
          <input type="text" name="phone" required />

          <label>Address</label>
          <input type="text" name="address" />

          <label>District</label>
          <select name="district">
            <option value="">Select District</option>
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

          <label>Blood Group</label>
          <select name="bloodGroup" required>
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <label>Any Health Issues?</label>
          <select name="healthIssues">
            <option>No</option>
            <option>Yes</option>
          </select>

          <button type="submit" className="btn-primary">
            Register Donor
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
