import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    await params; // Ensure params is accessed to avoid unused variable warning
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    const body = await req.json();
    const { id } = params;
    delete body._id;

    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { product_id: id };
    await db.collection("products").updateOne(filter, { $set: body });
    
    return NextResponse.json({ message: "Product updated" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    const { id } = params;
    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { product_id: id };
    await db.collection("products").deleteOne(filter);
    return NextResponse.json({ message: "Product deleted" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}