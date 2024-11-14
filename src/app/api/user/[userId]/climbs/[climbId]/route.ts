import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { climb, session, users } from "@/drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function PATCH(req: NextRequest, { params }: { params: { userId: string; climbId: string } }) {
    revalidatePath(req.url)

    const { userId, climbId } = params;

    const climbIdNumber = Number(climbId)

    if (isNaN(climbIdNumber)) {
        return NextResponse.json({ message: "Invalid climbId" }, { status: 400 });
    }

    try {
        const body = await req.json();
        const { name, type, style, grade, attempts, send } = body;

        const updatedClimbFields = {
            ...(name !== undefined && { name }),
            ...(type !== undefined && { type }),
            ...(style !== undefined && { style }),
            ...(grade !== undefined && { grade }),
            ...(attempts !== undefined && { attempts }),
            ...(send !== undefined && { send }),
        };

        console.log("Updating climb with fields: ", updatedClimbFields);

        if (Object.keys(updatedClimbFields).length === 0) {
            return NextResponse.json({ message: "No valid fields provided for updating climb" }, { status: 400 });
        }

        const result = await db.update(climb).set(updatedClimbFields).where(eq(climb.id, climbIdNumber)).returning();

        if (!result.length) {
            return NextResponse.json({ message: "Climb not found or update failed!" }, { status: 404 });
        }

        return NextResponse.json({ climb: result[0], message: "Climb updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating climb data:", error);
        return NextResponse.json({ message: "Server Error Updating Climb Data" }, { status: 500 });
    }
}