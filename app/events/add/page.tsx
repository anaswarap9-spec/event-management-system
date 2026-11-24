"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEvent() {

    const router = useRouter();

    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [venue, setVenue] = useState("");
    const [eventType, setEventType] = useState("");
    const [status, setStatus] = useState("Upcoming");

    const addEvent = async (e: React.FormEvent) => {

        e.preventDefault();

        const response = await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                eventName,
                description,
                eventDate,
                venue,
                eventType,
                status
            })
        });

        if (response.ok) {
            router.push("/dashboard");
        } else if (response.status === 401) {
            router.push("/");
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-7">

                    <div className="card p-4 shadow">

                        <h2 className="mb-4">
                            Add Event
                        </h2>

                        <form onSubmit={addEvent}>

                            <input
                                className="form-control mb-3"
                                placeholder="Event Name"
                                value={eventName}
                                onChange={(e) =>
                                    setEventName(e.target.value)
                                }
                                required
                            />

                            <textarea
                                className="form-control mb-3"
                                placeholder="Description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                required
                            />

                            <input
                                type="date"
                                className="form-control mb-3"
                                value={eventDate}
                                onChange={(e) =>
                                    setEventDate(e.target.value)
                                }
                                required
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Venue"
                                value={venue}
                                onChange={(e) =>
                                    setVenue(e.target.value)
                                }
                                required
                            />

                            <select
                                className="form-control mb-3"
                                value={eventType}
                                onChange={(e) =>
                                    setEventType(e.target.value)
                                }
                                required
                            >
                                <option value="">
                                    Select Event Type
                                </option>
                                <option value="Conference">
                                    Conference
                                </option>
                                <option value="Workshop">
                                    Workshop
                                </option>
                                <option value="Seminar">
                                    Seminar
                                </option>
                                <option value="Meeting">
                                    Meeting
                                </option>
                                <option value="Other">
                                    Other
                                </option>
                            </select>

                            <select
                                className="form-control mb-3"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >
                                <option value="Upcoming">
                                    Upcoming
                                </option>
                                <option value="Ongoing">
                                    Ongoing
                                </option>
                                <option value="Completed">
                                    Completed
                                </option>
                                <option value="Cancelled">
                                    Cancelled
                                </option>
                            </select>

                            <button className="btn btn-success">
                                Add Event
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() =>
                                    router.push("/dashboard")
                                }
                            >
                                Cancel
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}