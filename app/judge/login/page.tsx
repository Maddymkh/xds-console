import { supabase } from "@/lib/supabase";
import JudgeLoginClient from "@/components/JudgeLoginClient";

export default async function JudgeLogin() {
  const [{ data: judges }, { data: stations }] =
  await Promise.all([
    supabase
      .from("judges")
      .select("*")
      .order("name"),

    supabase
      .from("stations")
      .select("*")
      .order("id"),
  ]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">

      <div className="w-[450px] rounded-2xl bg-black/45 p-8">

      <h1 className="display text-4xl text-[var(--text)]">
  Judge Console
</h1>

<p className="subtitle mt-2">
  Select your name and station to begin evaluation
</p>

        <JudgeLoginClient
  judges={judges ?? []}
  stations={stations ?? []}
/>
      </div>

    </main>
  );
}