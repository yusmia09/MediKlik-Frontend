import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({ 
  username: "", password: "", email: "", repassword: "", gender: "", dateOfBirth: "", address: "", city: "", });
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cities");
        setCities(res.data);
      } catch(err) {
        console.error("Gagal ambil data kota:", err);
      }
    };
    fetchCities();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (isLoginMode){
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          username: formData.username,
          password: formData.password,
        });
        
        localStorage.setItem("token", res.data.token);
        alert("Login berhasil")

        if (res.data.user.role === "admin"){
        navigate("/admin");
        } else {
        navigate("/home");
        }
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/register", formData);
        alert(res.data.message || "Registrasi Berhasil!")
        setIsLoginMode(true)
      }
      
    } catch (error) {
      alert(error.response?.data?.message|| "Gagal");
    }
  };
  return (
    <div className="w-[420px] bg-white p-8 rounded-2xl shadow-lg relative">
      {/* Logo */}
      <div className="flex justify-center mb-2 mt-[5px]">
        <img src={logo} alt="Logo MediKlik" className="w-25 object-contain" />
      </div>

      {/* Tab Controls */}
      <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
        <button onClick={()=> setIsLoginMode(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ?  "text-white" : "text-black" }`}>
          Login
        </button>
        <button onClick={()=> setIsLoginMode(false)} className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLoginMode ?  "text-white" : "text-black" }`}>
          Register
        </button>
        <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-[#A8E6CF] via-[#BFE9F5] to-[#A0E9FF] ${isLoginMode ? "left-0" : "left-1/2"} `}></div>
      </div>

      {/* Form Section  */}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input 
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
        className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-[#A0E9FF] placeholder-gray-400"/>

       <div className="relative">
        <input 
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-[#A0E9FF]"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-gray-500 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

        {!isLoginMode && (
          <>
          <div className="relative">
          <input 
          type={showRepassword ? "text" : "password"}
          name="repassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
          className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-[#A0E9FF]"
          />
          <span
          onClick={() => setShowRepassword(!showRepassword)}
          className="absolute right-2 top-2 text-gray-500 cursor-pointer"
          >
          {showRepassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

          <input 
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-[#A0E9FF] placeholder-gray-400"/>

          <input 
            type="date"
            name="dateOfBirth"
            placeholder="Date Of Birth"
            onChange={handleChange}
            required
            className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-[#A0E9FF] placeholder-gray-400 text-gray-400" />

          <select
            name="gender"
            onChange={handleChange}
            required
            className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-[#A0E9FF] placeholder-gray-400 text-gray-400">
              <option value="" disabled selected hidden>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option> 
          </select>

          <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
              className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-[#A0E9FF] placeholder-gray-400"
            />

            <select 
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-[#A0E9FF] text-gray-600">
              <option value="" disabled hidden>Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>

          </>
        )}
        
        {/* Forget pw */}
        {isLoginMode && (
          <div className="text-right">
            <p className="text-cyan-400 hover:underline">Forget Password</p>
          </div>
        )}

        {/* Shared button */}
        <button type="submit" className='w-full p-3 bg-gradient-to-r from-[#A8E6CF] via-[#BFE9F5] to-[#A0E9FF] text-white text-lg font-medium hover:opacity-90 transition rounded-4xl '>
          {isLoginMode ? "Login " : "Regrister "}
        </button>

        {/* Switch link */}
        <p>
          {isLoginMode ? "Don't have any account?" : "Already have an account?" }
           <button
      type="button"
      onClick={() => setIsLoginMode(!isLoginMode)}
      className={`ml-1 font-medium transition-all duration-200 
        ${isLoginMode 
          ? "text-gray-400 hover:text-cyan-500 active:text-gray-400 hover:underline" 
          : "text-gray-400 hover:text-cyan-500 active:text-gray-400 hover:underline"
        }`} >
        {isLoginMode ? "Create account" : "Login"}
          </button>
        </p>

        </form>
    
    </div>
  ) 
}