import { supabase } from "@/lib/supabase";

export default async function ResultsPage() {
  const { data: results, error } = await supabase
    .from("evaluations")
    .select(`
      *,
      sessions (
        id,
        participant_id,
        participants (
          name,
          roll_number
        )
      )
    `);

  console.log("RESULTS:", results);
  console.log("ERROR:", error);

  return (
    <pre className="p-10 text-white whitespace-pre-wrap">
      {JSON.stringify(results, null, 2)}
    </pre>
  );
}