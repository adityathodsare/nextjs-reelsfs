import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";
import { error } from "console";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email, password and phone number are required",
        },
        {
          status: 400,
          statusText: "Bad Request",
        }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email already register with us",
        },
        {
          status: 400,
          statusText: "Bad Request",
        }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      {
        message: "user registered sucessfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: " failed to register ",
      },
      {
        status: 500,
      }
    );
  }
}
