import { supabase } from "@/lib/supabase";
import MotionDeskClient from "@/components/MotionDeskClient";

export default async function MotionPage() {
  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("status", "assigned");

  return (
    <main className="min-h-screen bg-zinc-950 p-8">
      <h1 className="text-4xl font-bold text-white">
        Motion Desk
      </h1>

      <MotionDeskClient
        sessions={sessions ?? []}
      />
    </main>
  );
}