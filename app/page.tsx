"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            router.push("/dashboard");
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card p-4 shadow">

                        <h2 className="text-center mb-4">
                            Event Management System
                        </h2>

                        <form onSubmit={loginUser}>

                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button className="btn btn-primary w-100">
                                Login
                            </button>

                        </form>

                        {message && (
                            <p className="text-danger text-center mt-3">
                                {message}
                            </p>
                        )}

                        <p className="text-center mt-3">
                            Don't have an account?{" "}
                            <a href="/register">Register</a>
                        </p>

                    </div>

                </div>
            </div>
        </div>
    );
}