import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Passenger",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", formData);
      alert("Registration successful! You can now login.");
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input name="username" placeholder="Username" className="border px-3 py-2 w-full rounded mb-2 input border-3 border-gray-300" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" className="border px-3 py-2 w-full rounded mb-2 input border-3 border-gray-300" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" className="border px-3 py-2 w-full rounded mb-2 input border-3 border-gray-300" onChange={handleChange} required />
        <select name="role" className="input" onChange={handleChange}>
          <option>Passenger</option>
          <option>Driver</option>
          <option>Admin</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">Join Us</button>
      </form>
    </div>
  );
}

export default Register;
