import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { verifyAuth } from "@/lib/auth";

export async function GET(req) {
  const client = await clientPromise;
  const db = client.db("nextjs_app");
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    return NextResponse.json(product);
  }
  const products = await db.collection("products").find({}).toArray();
  return NextResponse.json(products);
}

export async function POST(req) {
  const client = await clientPromise;
    const user = await verifyAuth(req);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  const db = client.db("nextjs_app");
  const { title, description,fullDescription, price, image } = await req.json();
  if (!title || !price) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const result = await db.collection("products").insertOne({ title, description, fullDescription, price, image, createdAt: new Date() });
  return NextResponse.json({ success: true, product: result.insertedId });
}

export async function DELETE(req) {
  const client = await clientPromise;
    const user = await verifyAuth(req);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  const db = client.db("nextjs_app");
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await db.collection("products").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
