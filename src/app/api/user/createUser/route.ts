import { NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, email } = body;

        if (!userId || !email) {
            return NextResponse.json({ message: "Missing Required Fields to Create User" }, { status: 400 });
        }

        const newUser = await db.insert(users).values({
            userId,
            email,
        });

        console.log("Database insert result:", newUser);

        return NextResponse.json({ message: "User Created", user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}