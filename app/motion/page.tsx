import { supabase } from "@/lib/supabase";
import MotionDeskClient from "@/components/MotionDeskClient";

export default async function MotionPage() {
  const { data: sessions } = await supabase
    .from("sessions")
    .select(`
        *,
        participants (
          id,
          name,
          roll_number
        )
      `)
    .eq("status", "assigned");

  return (
    <main className="min-h-screen bg-[var(--bg)] p-8">
      <h1 className="text-4xl font-bold text-[var(--text)]">
        Motion Desk
      </h1>

      <MotionDeskClient
        sessions={sessions ?? []}
      />
    </main>
  );
}