import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { climb, session, users } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";


export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {

    revalidatePath(req.url) // TODO: Best way to fix auto cache?

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

        return NextResponse.json({ user: user[0], message: "User Found" }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ message: "Server Error Fetching User Data" }, { status: 500 });
    }
}


export async function PATCH(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const { userId } = params;

        if (!userId) {
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        const body = await req.json();


        const { fullName, age, height, weight, apeIndex, gradingPreference, measurementSystem, profileImage } = body;


        const updatedProfileFields = {
            ...(fullName !== undefined && { fullName }),
            ...(age !== undefined && { age }),
            ...(height !== undefined && { height }),
            ...(weight !== undefined && { weight }),
            ...(apeIndex !== undefined && { apeIndex }),
            ...(gradingPreference !== undefined && { gradingPreference }),
            ...(measurementSystem !== undefined && { measurementSystem }),
            ...(profileImage !== undefined && { profileImage }),
        };

        console.log("Updating user profile with fields:", updatedProfileFields);

        if (Object.keys(updatedProfileFields).length === 0) {
            return NextResponse.json({ message: "No valid fields provided for update" }, { status: 400 });
        }

        const result = await db
            .update(users)
            .set(updatedProfileFields)
            .where(eq(users.userId, userId))
            .returning();

        if (!result.length) {
            return NextResponse.json({ message: "User not found or update failed" }, { status: 404 });
        }

        return NextResponse.json({ user: result[0], message: "User updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error updating user data:", error);
        return NextResponse.json({ message: "Server Error Updating User Data" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    if (!userId) {
        return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }

    try {
        const userSessions = await db
            .select({ id: session.id })
            .from(session)
            .where(eq(session.userId, userId));

        const sessionIds = userSessions.map((s) => s.id);

        if (sessionIds.length > 0) {
            await db.delete(climb).where(inArray(climb.sessionId, sessionIds));
        }

        await db.delete(session).where(eq(session.userId, userId));

        const deletedUsers = await db.delete(users).where(eq(users.userId, userId)).returning();
        if (deletedUsers.length === 0) {
            return NextResponse.json({ message: "User not found in the database" }, { status: 404 });
        }

        try {
            const client = await clerkClient()
            await client.users.deleteUser(userId)
            return NextResponse.json({ message: 'User deleted' })
        } catch (clerkError) {
            console.error("Failed to delete Clerk user:", clerkError);
        }

        return NextResponse.json({ message: "User and all related data deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Failed to delete user", error: error }, { status: 500 });
    }
}
