import { supabase } from "@/lib/supabase";
import JudgeLoginClient from "@/components/JudgeLoginClient";

export default async function JudgeLogin() {
  const { data: judges } = await supabase
    .from("judges")
    .select("*")
    .order("name");

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950">

      <div className="w-[450px] rounded-2xl bg-zinc-900 p-8">

        <h1 className="text-3xl font-semibold text-white">
          Judge Login
        </h1>

        <p className="mt-2 text-zinc-400">
          Select your name
        </p>

        <JudgeLoginClient judges={judges ?? []} />
      </div>

    </main>
  );
}