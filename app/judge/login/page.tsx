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
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)]">

      <div className="w-[450px] rounded-2xl bg-zinc-900 p-8">

        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Judge Login
        </h1>

        <p className="mt-2 text-[var(--muted)]">
          Select your name
        </p>

        <JudgeLoginClient
  judges={judges ?? []}
  stations={stations ?? []}
/>
      </div>

    </main>
  );
}