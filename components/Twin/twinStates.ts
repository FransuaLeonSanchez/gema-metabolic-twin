import type { Mood } from "@/lib/types";

export interface TwinPalette {
  color: string;     // accent / aura
  glow: string;      // aura glow stop
  cheek: string;
  label: string;
}

export const palettes: Record<Mood, TwinPalette> = {
  happy:   { color: "#0D9488", glow: "#0D9488", cheek: "#FF9AB3", label: "Saludable" },
  neutral: { color: "#D97706", glow: "#D97706", cheek: "#FFB7A0", label: "Regular" },
  tired:   { color: "#E11D48", glow: "#E11D48", cheek: "#B97581", label: "En riesgo" },
};

export function getTwinState(icm: number): { mood: Mood; palette: TwinPalette } {
  const mood: Mood = icm < 40 ? "happy" : icm < 70 ? "neutral" : "tired";
  return { mood, palette: palettes[mood] };
}
