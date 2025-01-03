import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { climb, session, users } from "@/drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { boulderGradeMapping, routeGradeMapping } from "@/lib/types";

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
    revalidatePath(req.url);

    try {
        const { userId } = params;
        const { name, type, style, grade, attempts, send, climbImage } = await req.json();

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
            climbImage,
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

        const { gradingPreference } = user;

        const [userSession] = await db.select()
            .from(session)
            .where(and(eq(session.userId, userId), eq(session.completed, false)))
            .orderBy(desc(session.createdAt))
            .limit(1);

        if (!userSession) {
            return NextResponse.json({ message: "No Active Session Found" });
        }
        const climbs = await db.select().from(climb).where(eq(climb.sessionId, userSession.id));

        const completedBoulders = climbs.filter(climb => climb.send && climb.type === "Boulder");
        const completedRoutes = climbs.filter(climb => climb.send && ["Top Rope", "Lead"].includes(climb.type));

        const highestBoulderGrade = completedBoulders.length > 0
            ? completedBoulders.reduce((max, climb) => (boulderGradeMapping[climb.grade] > boulderGradeMapping[max.grade] ? climb : max)).grade
            : null;

        const highestRouteGrade = completedRoutes.length > 0
            ? completedRoutes.reduce((max, climb) => (routeGradeMapping[climb.grade] > routeGradeMapping[max.grade] ? climb : max)).grade
            : null;

        const displayedBoulderGrade = gradingPreference && highestBoulderGrade
            ? boulderGradeMapping[highestBoulderGrade]
            : highestBoulderGrade;

        const displayedRouteGrade = gradingPreference && highestRouteGrade
            ? routeGradeMapping[highestRouteGrade]
            : highestRouteGrade;

        const totalBouldersCompleted = completedBoulders.length;
        const totalRoutesCompleted = completedRoutes.length;
        const totalSends = climbs.filter(climb => climb.send).length;
        const totalAttempts = climbs.reduce((acc, climb) => acc + (climb.attempts || 0), 0);
        const totalFlashes = climbs.filter(climb => climb.send && climb.attempts === 1).length;

        const sessionStats = {
            highestBoulderGrade: displayedBoulderGrade,
            highestRouteGrade: displayedRouteGrade,
            totalClimbs: climbs.length,
            totalAttempts,
            completedBoulders: totalBouldersCompleted,
            completedRoutes: totalRoutesCompleted,
            totalSends,
            totalFlashes,
        };

        const transformedClimbs = climbs.map(climb => {
            const gradeMapping = climb.type === "Boulder" ? boulderGradeMapping : routeGradeMapping;
            const grade = gradingPreference ? gradeMapping[climb.grade] : climb.grade;

            return {
                ...climb,
                grade,
            };
        });

        return NextResponse.json({
            message: "Active Session Found",
            session: {
                ...userSession,
                sessionStats,
            },
            climbs: transformedClimbs,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching session and climbs: ", error);
        return NextResponse.json({ message: "Failed to fetch session and climbs", error }, { status: 500 });
    }
}


export async function PATCH(req: NextRequest, { params }: { params: { userId: string } }) {
    revalidatePath(req.url);

    try {
        const { userId } = params;

        const { sessionName, intensity, notes, completed } = await req.json();

        const [user] = await db.select().from(users).where(eq(users.userId, userId));
        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }

        const [userSession] = await db.select().from(session).where(and(eq(session.userId, userId), eq(session.completed, false))).orderBy(desc(session.createdAt)).limit(1);

        if (!userSession) {
            return NextResponse.json({ message: "No Active Session Found" });
        }

        const updatedSession = await db.update(session).set({ sessionName, intensity, notes, completed }).where(eq(session.id, userSession.id)).returning();
        return NextResponse.json({ message: "Session Updated Successfully", session: updatedSession }, { status: 200 });
    } catch (error) {
        console.error("Error updating session: ", error);
        return NextResponse.json({ message: "Failed to update session", error }, { status: 500 })
    }
}
