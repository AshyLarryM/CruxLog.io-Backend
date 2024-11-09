import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { climb, session, users } from "@/drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
    revalidatePath(req.url);

    try {
        const { userId } = params;
        const { name, type, style, grade, attempts, send } = await req.json();

        const [user] = await db.select().from(users).where(eq(users.userId, userId))

        if (!user) {
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        let [userSession] = await db.select().from(session).where(and(eq(session.userId, userId), eq(session.completed, false)));
        if (!userSession) {
            [userSession] = await db.insert(session).values({
                userId,
                intensity: 5,
                notes: "",
                completed: false,
            }).returning();
        }

        const newClimb = {
            name,
            sessionId: userSession.id,
            type,
            style,
            grade,
            attempts,
            send,
        };

        await db.insert(climb).values(newClimb)

        return NextResponse.json({ message: "Climb Added Successfully", climb: newClimb }, { status: 201 })

    } catch (error) {
        console.error("Error adding climb: ", error);
        return NextResponse.json({ message: "Failed to add climb", error }, { status: 500 });
    }
}


export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    revalidatePath(req.url);

    try {
        const { userId } = params;

        const [user] = await db.select().from(users).where(eq(users.userId, userId));
        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }

        const [userSession] = await db.select().from(session).where(and(eq(session.userId, userId), eq(session.completed, false))).orderBy(desc(session.createdAt)).limit(1);

        if (!userSession) {
            return NextResponse.json({ message: "No Active Session Found" });
        }

        const climbs = await db.select().from(climb).where(eq(climb.sessionId, userSession.id));
        return NextResponse.json({ message: "Active Session Found", session: userSession, climbs: climbs }, { status: 200 })
    } catch (error) {
        console.error("Error fetching session and Climbs: ", error);
        return NextResponse.json({ message: "failed to fetch session and climbs: ", error}, { status: 500 });
    }
}
