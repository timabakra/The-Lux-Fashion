import { NextRequest, NextResponse } from "next/server"; // Added NextRequest for standard signature
import { getDb } from "../../../lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection("products");

    // Using Promise.all to run both queries in parallel (faster performance)
    const [trending, newArrivals] = await Promise.all([
      collection.aggregate([
        { $match: { images: { $exists: true, $ne: [] } } },
        { $sample: { size: 8 } }
      ]).toArray(),
      collection.aggregate([
        { $match: { images: { $exists: true, $ne: [] } } },
        { $sample: { size: 8 } }
      ]).toArray()
    ]);

    return NextResponse.json({ trending, newArrivals });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}