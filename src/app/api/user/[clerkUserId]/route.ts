import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: { clerkUserId: string } }) {
    try {
        const { clerkUserId } = params;

        if (!clerkUserId) {
            return NextResponse.json({ message: "clerkUserId is required" }, { status: 400 });
        }

        const user = await db
            .select()
            .from(users)
            .where(eq(users.clerkUserId, clerkUserId));

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        console.log("User Data: ", user);
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ message: "Server Error Fetching User Data" }, { status: 500 });
    }
}