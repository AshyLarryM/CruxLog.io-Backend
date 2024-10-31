import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const { userId } = params;

        if (!userId) {
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        const user = await db
            .select()
            .from(users)
            .where(eq(users.userId, userId));

        if (!user.length) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        console.log(user[0]);
        return NextResponse.json({ user: user[0], message: "User Found"}, { status: 200 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ message: "Server Error Fetching User Data" }, { status: 500 });
    }
}