import { supabase } from "./supabase";

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export async function drawMotion(sessionId: number) {
  // Fetch all themes
  const { data: themes, error: themeError } = await supabase
    .from("themes")
    .select("*");

  if (themeError) throw themeError;

  if (!themes || themes.length === 0) {
    throw new Error("No themes found.");
  }

  // Pick a random theme
  const theme = randomItem(themes);

  // Fetch motions from that theme
  const { data: motions, error: motionError } = await supabase
    .from("motions")
    .select("*")
    .eq("theme_id", theme.id);

  if (motionError) throw motionError;

  if (!motions || motions.length === 0) {
    throw new Error("No motions found for this theme.");
  }

  // Pick a random motion
  const motion = randomItem(motions);

  // Pick random stance
  const stance =
    Math.random() < 0.5
      ? "government"
      : "opposition";

  // Save to session
  const { error: updateError } = await supabase
    .from("sessions")
    .update({
      theme_id: theme.id,
      motion_id: motion.id,
      stance,
      status: "motion_revealed",
    })
    .eq("id", sessionId);

  if (updateError) throw updateError;

  return {
    sessionId,
    theme,
    motion,
    stance,
  };
}