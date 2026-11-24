import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import { verifyToken } from "@/lib/auth";


export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { userId } = verifyToken(token);
        const { id } = await params;

        const event = await Event.findOne({
            _id: id,
            userId
        });

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(event);

    } catch (error) {

        console.error("Get event error:", error);

        return NextResponse.json(
            { message: "Failed to fetch event" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { userId } = verifyToken(token);

        const { id } = await params;

        const body = await request.json();

        const event = await Event.findOneAndUpdate(
            {
                _id: id,
                userId
            },
            body,
            {
                new: true
            }
        );

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(event);

    } catch (error) {

        console.error("Update event error:", error);

        return NextResponse.json(
            { message: "Failed to update event" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { userId } = verifyToken(token);

        const { id } = await params;

        const event = await Event.findOneAndDelete({
            _id: id,
            userId
        });

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Event deleted successfully"
        });

    } catch (error) {

        console.error("Delete event error:", error);

        return NextResponse.json(
            { message: "Failed to delete event" },
            { status: 500 }
        );
    }
}