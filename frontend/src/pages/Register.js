import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("https://recipe-sharing-react-app.onrender.com/auth/register", {
                username,
                email,
                password
            });

            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            console.error("Registration failed", error);
            alert("Failed to register. Please try again.");
        }
    };

    return (
        <main>
            <section className="user-containor login-section-display">
                <div className="registration">
                    <div className="grid-two--column">
                        <div className="form-text">
                            <h2>Welcome Back</h2>
                            <p>Please Login To Continue</p>
                            <a href="/login"><button className="login-btn">Login Here</button></a>
                        </div>

                        <div className="registration-form">
                            <h2>Create Account</h2>
                            <div className="social-icons">
                                <a href="#"></a>
                                <i className="fa-brands fa-instagram"></i>
                                <a href="#"></a>
                                <i className="fa-brands fa-facebook"></i>
                                <a href="#"></a>
                                <i className="fa-brands fa-discord"></i>
                                <a href="#"></a>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </div>
                            <p>or use your emails for registration</p>
                            <form onSubmit={handleSubmit}>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="Name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-field">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-field">
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-field">
                                    <input type="submit" value="Register" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
