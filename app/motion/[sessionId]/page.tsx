import { supabase } from "@/lib/supabase";
import MotionRevealFlow from "@/components/MotionRevealFlow";

export default async function MotionRevealPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const { data: session } = await supabase
    .from("sessions")
    .select(`
      *,
      participants (
        name,
        roll_number
      )
    `)
    .eq("id", Number(sessionId))
    .single();
    

  if (!session) {
    return <div>Session not found.</div>;
  }
  

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <div className="text-center">

        

        <MotionRevealFlow
  sessionId={session.id}
  name={session.participants.name}
  rollNumber={session.participants.roll_number}
/>

      </div>
    </main>
  );
  
}