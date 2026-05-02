import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "32");
    const skip = (page - 1) * limit;
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    const query: any = {};
    if (category && category !== "All") query["category.name"] = category;
    if (brand && brand !== "All") query["designer.name"] = brand;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { "designer.name": { $regex: search, $options: "i" } },
        { "category.name": { $regex: search, $options: "i" } }
      ];
    }

    let sortQuery: any = { created_at: -1 };
    if (sort === "price-low") sortQuery = { price: 1 };
    else if (sort === "price-high") sortQuery = { price: -1 };

    const collection = db.collection("products");
    const total = await collection.countDocuments(query);
    const items = await collection.find(query).sort(sortQuery).skip(skip).limit(limit).toArray();

    return NextResponse.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
      hasMore: skip + items.length < total
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const body = await req.json();
    const result = await db.collection("products").insertOne(body);
    return NextResponse.json({ ...body, _id: result.insertedId }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}