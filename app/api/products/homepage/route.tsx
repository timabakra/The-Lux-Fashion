import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("products");

    const trending = await collection.aggregate([
      { $match: { images: { $exists: true, $ne: [] } } },
      { $sample: { size: 8 } }
    ]).toArray();

    const newArrivals = await collection.aggregate([
      { $match: { images: { $exists: true, $ne: [] } } },
      { $sample: { size: 8 } }
    ]).toArray();

    return NextResponse.json({ trending, newArrivals });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}