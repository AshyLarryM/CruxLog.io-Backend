import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { users, session, climb } from "@/drizzle/schema";
import { eq, or, desc, and } from "drizzle-orm";
import { boulderGradeMapping, routeGradeMapping } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    revalidatePath(req.url);
    try {
        const { userId } = params;

        if (!userId) {
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        const [user] = await db.select().from(users).where(eq(users.userId, userId));
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const { gradingPreference } = user;


        const highestBoulderGrade = await db
            .select({
                grade: climb.grade,
                type: climb.type,
            })
            .from(climb)
            .innerJoin(session, eq(climb.sessionId, session.id))
            .innerJoin(users, eq(session.userId, users.userId))
            .where(and(eq(users.userId, userId), eq(climb.type, "Boulder")))
            .orderBy(desc(climb.grade))
            .limit(1);

        const highestRouteGrade = await db
            .select({
                grade: climb.grade,
                type: climb.type,
            })
            .from(climb)
            .innerJoin(session, eq(climb.sessionId, session.id))
            .innerJoin(users, eq(session.userId, users.userId))
            .where(and(
                eq(users.userId, userId),
                or(eq(climb.type, "Lead"), eq(climb.type, "Top Rope"))
            ))
            .orderBy(desc(climb.grade))
            .limit(1);

        const transformedGrades = {
            Boulder: highestBoulderGrade[0]
                ? {
                    ...highestBoulderGrade[0],
                    grade: gradingPreference
                        ? boulderGradeMapping[highestBoulderGrade[0].grade] || highestBoulderGrade[0].grade
                        : highestBoulderGrade[0].grade,
                }
                : null,
            Route: highestRouteGrade[0]
                ? {
                    ...highestRouteGrade[0],
                    grade: gradingPreference
                        ? routeGradeMapping[highestRouteGrade[0].grade] || highestRouteGrade[0].grade
                        : highestRouteGrade[0].grade,
                    type: "Route",
                }
                : null,
        };

        return NextResponse.json({ message: `User: ${userId} grades fetched`, userGrades: transformedGrades }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user grades: ", error);
        return NextResponse.json({ message: "An error occurred", error: error }, { status: 500 });
    }
}