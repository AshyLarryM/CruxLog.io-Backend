import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { climb, session, users } from "@/drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { boulderGradeMapping, routeGradeMapping } from "@/lib/types";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    revalidatePath(req.url);

    try {
        const { userId } = params;

        // Check if the user exists
        const [user] = await db.select().from(users).where(eq(users.userId, userId));
        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }

        const { gradingPreference } = user;

        const userSessions = await db.select()
            .from(session)
            .where(and(eq(session.userId, userId), eq(session.completed, true)))
            .orderBy(desc(session.createdAt));

        if (userSessions.length === 0) {
            return NextResponse.json({ message: "User has not recorded any sessions yet!" }, { status: 200 })
        }

        const sessionsWithStats = await Promise.all(
            userSessions.map(async (userSession) => {
                const climbs = await db.select()
                    .from(climb)
                    .where(eq(climb.sessionId, userSession.id));

                const completedBoulders = climbs
                    .filter(climb => climb.send === true && climb.type === "Boulder")
                    .map(climb => climb.grade);

                const highestBoulderGrade = completedBoulders.length > 0 ? completedBoulders.reduce((max, grade) => {
                    return boulderGradeMapping[grade] > boulderGradeMapping[max] ? grade : max;
                }, completedBoulders[0]) : null;

                const completedRoutes = climbs
                    .filter(climb => climb.send === true && (climb.type === "Top Rope" || climb.type === "Lead"))
                    .map(climb => climb.grade);

                const highestRouteGrade = completedRoutes.length > 0 ? completedBoulders.reduce((max, grade) => {
                    return routeGradeMapping[grade] > routeGradeMapping[max] ? grade : max;
                }, completedRoutes[0]) : null;

                const displayedBoulderGrade = gradingPreference && highestBoulderGrade ? boulderGradeMapping[highestBoulderGrade] : highestBoulderGrade;
                const displayedRouteGrade = gradingPreference && highestRouteGrade ? routeGradeMapping[highestRouteGrade] : highestRouteGrade;


                const totalBouldersCompleted = climbs.filter(climb => climb.send === true && climb.type === "Boulder").length;
                const totalRoutesCompleted = climbs.filter(climb => climb.send === true && (climb.type === "Top Rope" || "Lead")).length;
                const totalSends = climbs.filter(climb => climb.send === true).length;
                const totalAttempts = climbs.filter(climb => climb.attempts).length;
                const totalFlashes = climbs.filter(climb => climb.attempts === 1 && climb.send === true).length;

                return {
                    ...userSession,
                    climbs,
                    stats: {
                        highestBoulderGrade: displayedBoulderGrade,
                        highestRouteGrade: displayedRouteGrade,
                        totalClimbs: climbs.length,
                        totalAttempts: totalAttempts,
                        completedBoulders: totalBouldersCompleted,
                        completedRoutes: totalRoutesCompleted,
                        totalSends: totalSends,
                        totalFlashes: totalFlashes,
                    },
                };
            })
        );

        return NextResponse.json({ message: "Sessions Retrieved", sessions: sessionsWithStats }, { status: 200 });
    } catch (error) {
        console.error("Error fetching sessions and climbs: ", error);
        return NextResponse.json({ message: "Failed to fetch sessions and climbs", error }, { status: 500 });
    }
}
