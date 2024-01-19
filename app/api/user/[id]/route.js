import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export default async function GET(req, res) {
  try {
    const session = getServerSession();
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
