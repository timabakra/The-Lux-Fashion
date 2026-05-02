import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// Define the type for the context to reuse it
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const db = await getDb();
    // Await the params to get the id
    const { id } = await params;

    let product = null;
    if (ObjectId.isValid(id)) {
      product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    }
    if (!product) {
      product = await db.collection("products").findOne({ product_id: id });
    }

    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const db = await getDb();
    const body = await req.json();
    // Await the params to get the id
    const { id } = await params;
    
    delete body._id;

    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { product_id: id };
    await db.collection("products").updateOne(filter, { $set: body });
    
    return NextResponse.json({ message: "Product updated" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const db = await getDb();
    // Await the params to get the id
    const { id } = await params;
    
    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { product_id: id };
    await db.collection("products").deleteOne(filter);
    return NextResponse.json({ message: "Product deleted" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}