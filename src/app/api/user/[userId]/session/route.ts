import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { climb, session, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest, { params }: { params: { userId: string }}) {
    revalidatePath(req.url);

    try {
        const { userId } = params;
        const {name, type, style, grade, attempts, send } = await req.json();

        const [user] = await db.select().from(users).where(eq(users.userId, userId))

        if (!user) {
            return NextResponse.json({ message: "userId is required"}, { status: 400 });
        }

        let [userSession] = await db.select().from(session).where(eq(session.userId, userId))
        if (!userSession) {
            [userSession] = await db.insert(session).values({
                userId,
                intensity: 5,
                notes: "",
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

        return NextResponse.json({ message: "Climb Added Successfully", climb: newClimb}, { status: 201 })
        
    } catch (error) {
        console.error("Error adding climb: ", error);
        return NextResponse.json({ message: "Failed to add climb", error}, { status: 500 });
    }
}
