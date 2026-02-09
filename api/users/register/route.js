import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("nextjs_app");
  const users = db.collection("users");

  const exist = await users.findOne({ email });
  if (exist) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);
  const result = await users.insertOne({ name, email, password: hash });

  return NextResponse.json({ success: true, user: { id: result.insertedId, name, email } });
}
