import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
    return new Response(JSON.stringify({ message: "Test API is working!" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
