import { auth } from "@clerk/nextjs/server";
import { VolunteerRegistration } from "@/components/VolunteerRegistration";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <VolunteerRegistration />;
}
