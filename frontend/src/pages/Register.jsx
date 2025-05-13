import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import circleBg from "../assets/bg-canva.svg";
import signupImg from "../assets/signup.png";
import logo from "../assets/react.svg";
import "./signup.css";

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
    <div className="relative min-h-screen w-full bg-cover bg-fixed bg-center" style={{ backgroundImage: `url(${circleBg})` }}>
      <div className="absolute top-4 left-4 flex items-center space-x-0">
        <img src={logo} alt="Logo" className="w-8 h-8 border border-green-300 shadow-custom rounded-full object-contain mr-2" />
        <span className="text-lg font-semibold text-green-500 tightly-tracked">BusTrack</span>
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center md:flex-col lg:flex-row text-black lg:pl-8">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-2">
          <form onSubmit={handleSubmit} className="w-full mt-3 lg:mt-0 border lg:border rounded-2xl border-green-300 max-w-md space-y-3 p-4 bg-white">
            <h2 className="text-xl font-bold mb-4">SignUp</h2>
            <input name="username" placeholder="Username" className="border px-3 py-2 w-full rounded mb-2 input border-green-300" onChange={handleChange} required />
            <input name="email" placeholder="Email" type="email" className="border px-3 py-2 w-full rounded mb-2 input border-green-300" onChange={handleChange} required />
            <input name="password" placeholder="Password" type="password" className="border px-3 py-2 w-full rounded mb-2 input border-green-300" onChange={handleChange} required />
            <select name="role" className="input" onChange={handleChange}>
              <option>Passenger</option>
              <option>Driver</option>
              <option>Admin</option>
            </select>
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full">Join Us</button>
          </form>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-end">
            <img src={signupImg} alt="Signup Visual" className="signup-image float-slow" />
        </div>
      </div>
    </div>
  );
}

export default Register;
