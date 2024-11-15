import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { users, session, climb } from "@/drizzle/schema";
import { eq, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    revalidatePath(req.url);
    try {
        const { userId } = params;

        if (!userId) {
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        const userExists = await db
            .select()
            .from(users)
            .where(eq(users.userId, userId));

        if (!userExists.length) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const climbsByTypeAndStyle = await db
            .select({
                type: climb.type,
                style: climb.style,
                count: count(climb.id)
            })
            .from(climb)
            .innerJoin(session, eq(climb.sessionId, session.id))
            .innerJoin(users, eq(session.userId, users.userId))
            .where(eq(users.userId, userId))
            .groupBy(climb.type, climb.style);

        return NextResponse.json({ message: `User: ${userId} stats fetched`, userStats: climbsByTypeAndStyle }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred", error: error }, { status: 500 });
    }
}
