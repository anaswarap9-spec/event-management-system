import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import { verifyToken } from "@/lib/auth";

export async function GET() {

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

        const events = await Event.find({
            userId
        }).sort({ createdAt: -1 });

        return NextResponse.json(events);

    } catch (error) {

        console.error("Get events error:", error);

        return NextResponse.json(
            { message: "Failed to fetch events" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {

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

        const body = await request.json();

        const event = await Event.create({
            ...body,
            userId
        });

        return NextResponse.json(event, {
            status: 201
        });

    } catch (error) {

        console.error("Create event error:", error);

        return NextResponse.json(
            { message: "Failed to create event" },
            { status: 500 }
        );
    }
}