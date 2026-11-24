"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const router = useRouter();

    const [events, setEvents] = useState<any[]>([]);

    const loadEvents = async () => {

        const response = await fetch("/api/events");

        if (response.status === 401) {
            router.push("/");
            return;
        }

        const data = await response.json();

        setEvents(data);
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const logout = async () => {

        await fetch("/api/auth/logout", {
            method: "POST"
        });

        router.push("/");
    };

    const deleteEvent = async (id: string) => {

        const confirmDelete = confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) return;

        await fetch(`/api/events/${id}`, {
            method: "DELETE"
        });

        loadEvents();
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Event Dashboard</h2>

                <div>
                    <button
                        className="btn btn-success me-2"
                        onClick={() => router.push("/events/add")}
                    >
                        + Add Event
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>

            </div>

            <div className="row">

                {events.map((event) => (

                    <div className="col-md-4 mb-4" key={event._id}>

                        <div className="card shadow h-100">

                            <div className="card-body">

                                <h4>{event.eventName}</h4>

                                <p>
                                    {event.description}
                                </p>

                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(event.eventDate)
                                        .toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>Venue:</strong>{" "}
                                    {event.venue}
                                </p>

                                <p>
                                    <strong>Type:</strong>{" "}
                                    {event.eventType}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {event.status}
                                </p>

                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() =>
                                        router.push(
                                            `/events/edit/${event._id}`
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        deleteEvent(event._id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}