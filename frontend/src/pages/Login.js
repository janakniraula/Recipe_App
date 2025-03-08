import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/auth/login", {
                email,
                password
            });

            setCookies("access_token", response.data.token); 
            window.localStorage.setItem("userID", response.data.userID);  
            alert("Login Successful.");
            navigate("/");
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid email or password.");
        }
    };

    return (
        <main>
            <section className="user-containor login-section-display">
                <div className="login">
                    <div className="grid-two--column">
                        <div className="form-text">
                            <h2>Hello Friend</h2>
                            <p>New Here? Start With Register</p>
                            <a href="/register"><button className="registration-btn">Register Here</button></a>
                        </div>

                        <div className="login-form">
                            <h2>Sign In</h2>
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
                            <p>or use your account</p>
                            <form onSubmit={handleSubmit}>
                                <div className="input-field">
                                    <input
                                        type="email"
                                        id="email1"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-field">
                                    <input
                                        type="password"
                                        id="password1"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-field">
                                    <input type="submit" value="Login" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
