import Subscription from "@/models/subscription";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const sub = await Subscription.findById(id);
    if (!sub)
      return NextResponse.json({
        error: "No Subscription found!",
        status: 404,
      });
    return NextResponse.json({ data: sub, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
