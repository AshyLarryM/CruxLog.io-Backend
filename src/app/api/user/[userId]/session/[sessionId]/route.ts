import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { climb, session, users } from "@/drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { boulderGradeMapping, routeGradeMapping } from "@/lib/types";

export async function GET(req: NextRequest, { params }: { params: { userId: string; sessionId: string } }) {
    revalidatePath(req.url);
    const { userId, sessionId } = params;

    const sessionIdNumber = Number(sessionId);
    if (isNaN(sessionIdNumber)) {
        return NextResponse.json({ message: "Invalid sessionId" }, { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.userId, userId));
    if (!user) {
        return NextResponse.json({ message: "User does not exist" }, { status: 400 });
    }

    const { gradingPreference } = user;

    const [userSessionRecord] = await db
        .select()
        .from(session)
        .where(eq(session.id, sessionIdNumber))

        if (!userSessionRecord) {
            return NextResponse.json({ message: "No user Session Found" }, { status: 400 });
        }

        const climbs = await db.select().from(climb).where(eq(climb.sessionId, sessionIdNumber));

        const transformedClimbs = climbs.map(climb => {
            const gradeMapping = climb.type === "Boulder" ? boulderGradeMapping : routeGradeMapping;
            const grade = gradingPreference ? gradeMapping[climb.grade] : climb.grade;

            return {
                ...climb,
                grade,
            };
        });

        return NextResponse.json({ 
            message: `Climbs successfully fetched for sessionId: ${sessionIdNumber}`, 
            climbs: transformedClimbs 
        });
}