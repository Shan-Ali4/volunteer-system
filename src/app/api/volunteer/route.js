import { connectDB } from "@/lib/db";
import Volunteer from "@/models/Volunteer";

export async function GET() {
  try {
    await connectDB();

    const volunteers = await Volunteer.find().sort({ createdAt: -1 });

    return Response.json(volunteers);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch volunteers", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    const volunteer = await Volunteer.create({
      ...data,
      skills:
        typeof data.skills === "string"
          ? data.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
          : data.skills,
    });

    return Response.json(volunteer, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Failed to register volunteer", error: error.message },
      { status: 500 }
    );
  }
}
