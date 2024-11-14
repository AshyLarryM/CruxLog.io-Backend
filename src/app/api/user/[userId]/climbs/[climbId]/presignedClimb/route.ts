import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    }
});

export async function POST(req: NextRequest, { params }: { params: { userId: string; climbId: string } }) {
    try {
        const { userId, climbId } = params;

        if (!userId && climbId) {
            return NextResponse.json({ message: "userId and climbId is required" }, { status: 400 });
        }

        const profileImageKey = `climb-images/${userId}/${climbId}-${Date.now()}.jpg`;
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            Key: profileImageKey,
            ContentType: "image/jpeg",
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        return NextResponse.json({ url, key: profileImageKey }, { status: 200 });
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        return NextResponse.json({ message: "Error generating pre-signed URL" }, { status: 500 });
    }
}
