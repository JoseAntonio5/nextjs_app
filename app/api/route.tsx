import { NextResponse } from "next/server";

let data = [];

export async function GET() {
    return NextResponse.json({ message: 'API is working' });
}