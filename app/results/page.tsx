import { supabase } from "@/lib/supabase";
import ResultsClient from "@/components/ResultsClient";

export const dynamic = "force-dynamic";

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
    ),
    evaluation_judges (
      judges (
        id,
        name
      )
    )
  `);

  console.log("RESULTS:", results);
  console.log("ERROR:", error);

  return <ResultsClient results={results ?? []} />;
}