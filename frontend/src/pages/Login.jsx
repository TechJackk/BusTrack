import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import circleBg from "../assets/bg-canva.svg";
import signupImg from "../assets/signup.png";
import logo from "../assets/react.svg";
import "./signup.css";


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      //localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);
      console.log(res.data.user);
      console.log(res.data.token);
      alert("Login successful!");

      const role = res.data.user.role.toLowerCase();
      navigate(`/${role}/dashboard`);
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
          <form onSubmit={handleLogin} className="w-full mt-3 lg:mt-0 border lg:border rounded-2xl border-green-300 max-w-md space-y-3 p-4 bg-white">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input name="email" type="email" className="border px-3 py-2 w-full rounded mb-2 input border-green-300" placeholder="Email" onChange={handleChange} />
            <input name="password" className="border px-3 py-2 w-full rounded mb-2 input border-green-300" type="password" placeholder="Password" onChange={handleChange} />
            <button className="bg-green-600 border-0 text-white cursor-pointer px-4 py-2 rounded mt-4 w-full">Login</button>
          </form>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-end">
          <img src={signupImg} alt="Signup Visual" className="signup-image float-slow" />
        </div>
      </div>
    </div>
  );
}

export default Login;
