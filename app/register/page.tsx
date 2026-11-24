"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            setMessage("Registration successful");

            setTimeout(() => {
                router.push("/");
            }, 1000);
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
                            Register
                        </h2>

                        <form onSubmit={registerUser}>

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

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
                                Register
                            </button>

                        </form>

                        {message && (
                            <p className="text-center mt-3">
                                {message}
                            </p>
                        )}

                        <p className="text-center mt-3">
                            Already have an account?{" "}
                            <a href="/">Login</a>
                        </p>

                    </div>

                </div>
            </div>
        </div>
    );
}