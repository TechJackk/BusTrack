import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/auth/login", formData);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input name="email" type="email" className="border px-3 py-2 w-full rounded mb-2 input border-3 border-gray-300" placeholder="Email" onChange={handleChange} />
        <input name="password" className="border px-3 py-2 w-full rounded mb-2 input border-3 border-gray-300" type="password" placeholder="Password" onChange={handleChange} />
        <button className="bg-green-600 border-0 text-white cursor-pointer px-4 py-2 rounded mt-4 w-full">Login</button>
      </form>
    </div>
  );
}

export default Login;
