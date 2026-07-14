import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export default async function JudgeDashboard() {
  const cookieStore = await cookies();
  const judgeId = Number(cookieStore.get("judgeId")?.value);

  const { data: judge } = await supabase
    .from("judges")
    .select("*")
    .eq("id", judgeId)
    .single();

  return (
    <main className="min-h-screen bg-zinc-950 p-8">

      <h1 className="text-4xl font-bold text-white">
        Welcome {judge?.name ?? "Judge"}
      </h1>

      <p className="mt-3 text-zinc-400">
        Waiting for participant...
      </p>

    </main>
  );
}