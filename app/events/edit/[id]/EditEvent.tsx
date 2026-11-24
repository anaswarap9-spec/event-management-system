"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditEvent() {

    const params = useParams();
    const router = useRouter();

    const id = params.id;

    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [venue, setVenue] = useState("");
    const [eventType, setEventType] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {

        const loadEvent = async () => {

            const response = await fetch(`/api/events/${id}`);

            if (response.status === 401) {
                router.push("/");
                return;
            }

            const data = await response.json();

            if (response.ok) {

                setEventName(data.eventName);
                setDescription(data.description);

                setEventDate(
                    new Date(data.eventDate)
                        .toISOString()
                        .split("T")[0]
                );

                setVenue(data.venue);
                setEventType(data.eventType);
                setStatus(data.status);
            }
        };

        loadEvent();

    }, [id, router]);

    const updateEvent = async (e: React.FormEvent) => {

        e.preventDefault();

        const response = await fetch(`/api/events/${id}`, {
            method: "PUT",
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
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-7">

                    <div className="card p-4 shadow">

                        <h2 className="mb-4">
                            Edit Event
                        </h2>

                        <form onSubmit={updateEvent}>

                            <input
                                className="form-control mb-3"
                                value={eventName}
                                onChange={(e) =>
                                    setEventName(e.target.value)
                                }
                                required
                            />

                            <textarea
                                className="form-control mb-3"
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

                            <button className="btn btn-primary">
                                Update Event
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