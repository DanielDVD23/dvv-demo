// Registry of real Volleyball-Bundesliga / DVV club logos, keyed by club name.
// Sourced from volleyball-bundesliga.de uploads CDN.
//
// For clubs not in the registry, ClubLogo falls back to a deterministic
// gradient-coloured circle with the club's initials.

const VBL = "https://www.volleyball-bundesliga.de/uploads";

export interface ClubLogoEntry {
  url: string;
  /** Suggested background brightness for the badge ("light" = use light bg, "dark" = use dark bg) */
  bg?: "light" | "dark";
  /** Primary brand colour as hex, e.g. "#f37021". Used to tint headers, accents, charts. */
  primary?: string;
  /** Optional secondary brand colour. */
  secondary?: string;
}

// Canonical names + aliases for fuzzy lookup. Add more as the prototype grows.
const REGISTRY: Record<string, ClubLogoEntry> = {
  // ─── 1. + 2. Bundesliga Frauen ───
  "rote raben vilsbiburg": { url: `${VBL}/19de3821-7526-4e46-a0b9-9cd60bf0535e-200x200/Vilsbiburg.png`, bg: "light" },
  "vilsbiburg": { url: `${VBL}/19de3821-7526-4e46-a0b9-9cd60bf0535e-200x200/Vilsbiburg.png`, bg: "light" },
  "nawaro straubing": { url: `${VBL}/825c2558-e734-45c0-a93d-261df75fb4c3-200x200/Straubing.png`, bg: "light" },
  "straubing": { url: `${VBL}/825c2558-e734-45c0-a93d-261df75fb4c3-200x200/Straubing.png`, bg: "light" },
  "skurios volleys borken": { url: `${VBL}/10c17d7b-d082-4d7d-a4e0-f1d800544ff8-200x200/oythe.png`, bg: "light" },
  "oythe": { url: `${VBL}/10c17d7b-d082-4d7d-a4e0-f1d800544ff8-200x200/oythe.png`, bg: "light" },
  "fc planegg-krailling": { url: `${VBL}/c44d2e47-3206-4312-ac8e-067faff3ac85-198x200/Planegg-Krailling_Kreis.png`, bg: "light" },
  "planegg-krailling": { url: `${VBL}/c44d2e47-3206-4312-ac8e-067faff3ac85-198x200/Planegg-Krailling_Kreis.png`, bg: "light" },
  "dresdner sc": { url: `${VBL}/33ebca47-ee88-4505-80a3-8f625a651bdc-200x200/Dresden.png`, bg: "light" },
  "dsc dresden": { url: `${VBL}/33ebca47-ee88-4505-80a3-8f625a651bdc-200x200/Dresden.png`, bg: "light" },
  "dshs snowtrex köln": { url: `${VBL}/9d7057ef-e7c8-4d41-9c70-3efce1b653a3-200x200/DSHS+SnowTrex+K%C3%B6ln.png`, bg: "light" },
  "dshs köln": { url: `${VBL}/9d7057ef-e7c8-4d41-9c70-3efce1b653a3-200x200/DSHS+SnowTrex+K%C3%B6ln.png`, bg: "light" },
  "bayer 04 leverkusen": { url: `${VBL}/bb11fe67-9f40-49ed-a42f-1e99316dadf9-200x200/Bayer+Leverkusen.png`, bg: "light" },
  "bayer leverkusen": { url: `${VBL}/bb11fe67-9f40-49ed-a42f-1e99316dadf9-200x200/Bayer+Leverkusen.png`, bg: "light" },
  "tv waldgirmes": { url: `${VBL}/89cb6afe-a0c8-4c30-a4c6-34cbe79176aa-200x200/TV_Waldgirmes_kreis.png`, bg: "light" },
  "esa grimma volleys": { url: `${VBL}/e1c6edbd-64a5-4055-8f01-28c03e70f558-200x200/ESA+Grimma+Volleys_kreis.png`, bg: "light" },
  "grimma": { url: `${VBL}/e1c6edbd-64a5-4055-8f01-28c03e70f558-200x200/ESA+Grimma+Volleys_kreis.png`, bg: "light" },
  "sparkassen wildcats stralsund": { url: `${VBL}/edc53223-6279-497b-8f0c-a3b2bf93eed8-200x200/Sparkassen+Wildcats+Stralsund.png`, bg: "light" },
  "wildcats stralsund": { url: `${VBL}/edc53223-6279-497b-8f0c-a3b2bf93eed8-200x200/Sparkassen+Wildcats+Stralsund.png`, bg: "light" },
  "stralsund": { url: `${VBL}/edc53223-6279-497b-8f0c-a3b2bf93eed8-200x200/Sparkassen+Wildcats+Stralsund.png`, bg: "light" },
  "eintracht spontent": { url: `${VBL}/11eb6af6-6268-4767-8c60-813b6161d2fc-200x200/Eintracht+Spontent_Kreis.png`, bg: "light" },
  "eintracht düsseldorf": { url: `${VBL}/11eb6af6-6268-4767-8c60-813b6161d2fc-200x200/Eintracht+Spontent_Kreis.png`, bg: "light" },
  "neuseenland-volleys markkleeberg": { url: `${VBL}/befce1b4-d568-4ffd-928a-d351be3301eb-200x200/Neuseenland-Volleys+Markkleeberg.png`, bg: "light" },
  "markkleeberg": { url: `${VBL}/befce1b4-d568-4ffd-928a-d351be3301eb-200x200/Neuseenland-Volleys+Markkleeberg.png`, bg: "light" },
  "tv dingolfing": { url: `${VBL}/b87f5e38-7eb4-4966-84a1-be0e4839f151-200x200/TV+Dingolfing.png`, bg: "light" },
  "dingolfing": { url: `${VBL}/b87f5e38-7eb4-4966-84a1-be0e4839f151-200x200/TV+Dingolfing.png`, bg: "light" },
  "tv hörde 1911": { url: `${VBL}/0a049112-a6b6-49b9-8e9d-38f09c907cb7-200x200/TV+H%C3%B6rde.png`, bg: "light" },
  "tv hörde": { url: `${VBL}/0a049112-a6b6-49b9-8e9d-38f09c907cb7-200x200/TV+H%C3%B6rde.png`, bg: "light" },
  "bbsc berlin": { url: `${VBL}/131fc503-06e0-4f69-a475-84adf278b0d9-200x200/BBSC+Berlin.png`, bg: "light" },

  // ─── 1. Bundesliga Männer ───
  "berlin recycling volleys": { url: `${VBL}/3fa39f24-651b-43f2-bf27-43460848fcec-200x200/2023_Logo_BRV_Standard_farbig_rgb_kreis.png`, bg: "light" },
  "br volleys": { url: `${VBL}/3fa39f24-651b-43f2-bf27-43460848fcec-200x200/2023_Logo_BRV_Standard_farbig_rgb_kreis.png`, bg: "light" },
  "berlin recycling": { url: `${VBL}/3fa39f24-651b-43f2-bf27-43460848fcec-200x200/2023_Logo_BRV_Standard_farbig_rgb_kreis.png`, bg: "light" },
  "brv": { url: `${VBL}/3fa39f24-651b-43f2-bf27-43460848fcec-200x200/2023_Logo_BRV_Standard_farbig_rgb_kreis.png`, bg: "light" },
  "vfb friedrichshafen": { url: `${VBL}/5644bbcb-ffb6-4f2e-9b55-12ba3593e60c-200x200/VfB+Friedrichshafen.png`, bg: "light" },
  "friedrichshafen": { url: `${VBL}/5644bbcb-ffb6-4f2e-9b55-12ba3593e60c-200x200/VfB+Friedrichshafen.png`, bg: "light" },

  // ─── 2. Bundesliga Frauen / Männer + Sparda 2. Liga Pro extras ───
  "vc wiesbaden": { url: `${VBL}/da1b1f68-96ed-4397-ad22-4709e0d1881f-200x200/VC+Wiesbaden.png`, bg: "light" },
  "vc wiesbaden ii": { url: `${VBL}/da1b1f68-96ed-4397-ad22-4709e0d1881f-200x200/VC+Wiesbaden.png`, bg: "light" },
  "wiesbaden": { url: `${VBL}/da1b1f68-96ed-4397-ad22-4709e0d1881f-200x200/VC+Wiesbaden.png`, bg: "light" },
  "tv suspa altdorf": { url: `${VBL}/76556029-71c6-464d-91b9-487f3303dc4f-200x200/TV_Altdorf_kreis.png`, bg: "light" },
  "tv altdorf": { url: `${VBL}/76556029-71c6-464d-91b9-487f3303dc4f-200x200/TV_Altdorf_kreis.png`, bg: "light" },
  "altdorf": { url: `${VBL}/76556029-71c6-464d-91b9-487f3303dc4f-200x200/TV_Altdorf_kreis.png`, bg: "light" },
  "schweriner sc": { url: `${VBL}/e1529289-8b7a-4246-aaa4-7059fd6ed3f7-200x200/SSC_Schwerin_2_kreis.jpg.png`, bg: "light" },
  "schweriner sc ii": { url: `${VBL}/e1529289-8b7a-4246-aaa4-7059fd6ed3f7-200x200/SSC_Schwerin_2_kreis.jpg.png`, bg: "light" },
  "ssc palmberg schwerin": { url: `${VBL}/e1529289-8b7a-4246-aaa4-7059fd6ed3f7-200x200/SSC_Schwerin_2_kreis.jpg.png`, bg: "light" },
  "schwerin": { url: `${VBL}/e1529289-8b7a-4246-aaa4-7059fd6ed3f7-200x200/SSC_Schwerin_2_kreis.jpg.png`, bg: "light" },
  "vco münster": { url: `${VBL}/8b1b891c-9dea-49fa-aa8c-f442ab7c4eab-200x200/VCO+M%C3%BCnster_Kreis.png`, bg: "light" },
  "usc münster": { url: `${VBL}/8b1b891c-9dea-49fa-aa8c-f442ab7c4eab-200x200/VCO+M%C3%BCnster_Kreis.png`, bg: "light" },
  "usc münster ii": { url: `${VBL}/8b1b891c-9dea-49fa-aa8c-f442ab7c4eab-200x200/VCO+M%C3%BCnster_Kreis.png`, bg: "light" },
  "münster": { url: `${VBL}/8b1b891c-9dea-49fa-aa8c-f442ab7c4eab-200x200/VCO+M%C3%BCnster_Kreis.png`, bg: "light" },
  "tsv unterhaching": { url: `${VBL}/e71d454a-1bc5-448d-b619-ebe43146ac6d-200x200/TSV-Unterhaching_kreis.jpg.png`, bg: "light" },
  "unterhaching": { url: `${VBL}/e71d454a-1bc5-448d-b619-ebe43146ac6d-200x200/TSV-Unterhaching_kreis.jpg.png`, bg: "light" },
  "sparda bsp stuttgart": { url: `${VBL}/d7c13c15-8afe-4d83-9668-49200df69140-200x200/BSP+Stuttgart.png`, bg: "light" },
  "bsp stuttgart": { url: `${VBL}/d7c13c15-8afe-4d83-9668-49200df69140-200x200/BSP+Stuttgart.png`, bg: "light" },
  "stuttgart": { url: `${VBL}/d7c13c15-8afe-4d83-9668-49200df69140-200x200/BSP+Stuttgart.png`, bg: "light" },
  "tv rottenburg": { url: `${VBL}/700217e2-a3f8-406b-b04e-ee0789fac4f5-200x200/TV+Rottenburg.png`, bg: "light" },
  "rottenburg": { url: `${VBL}/700217e2-a3f8-406b-b04e-ee0789fac4f5-200x200/TV+Rottenburg.png`, bg: "light" },
  "fc schüttorf 09": { url: `${VBL}/d5c72603-3404-45b4-a5c0-9af0d2c227ee-200x200/Sch%C3%BCttorf.png`, bg: "light" },
  "fc schüttorf": { url: `${VBL}/d5c72603-3404-45b4-a5c0-9af0d2c227ee-200x200/Sch%C3%BCttorf.png`, bg: "light" },
  "schüttorf": { url: `${VBL}/d5c72603-3404-45b4-a5c0-9af0d2c227ee-200x200/Sch%C3%BCttorf.png`, bg: "light" },
  "ssc freisen": { url: `${VBL}/60f0c534-0f32-403b-b426-6c42aa869c12-198x200/Freisen_Kreis.png`, bg: "light" },
  "freisen": { url: `${VBL}/60f0c534-0f32-403b-b426-6c42aa869c12-198x200/Freisen_Kreis.png`, bg: "light" },
  "prowin volleys tv holz": { url: `${VBL}/0450ba7d-10b2-405a-a423-095fd3a0bc75-200x200/proWin+Holz.png`, bg: "light" },
  "prowin volleys": { url: `${VBL}/0450ba7d-10b2-405a-a423-095fd3a0bc75-200x200/proWin+Holz.png`, bg: "light" },
  "tv holz": { url: `${VBL}/0450ba7d-10b2-405a-a423-095fd3a0bc75-200x200/proWin+Holz.png`, bg: "light" },
  "holz": { url: `${VBL}/0450ba7d-10b2-405a-a423-095fd3a0bc75-200x200/proWin+Holz.png`, bg: "light" },
  "vco dresden": { url: `${VBL}/33ebca47-ee88-4505-80a3-8f625a651bdc-200x200/Dresden.png`, bg: "light" },
  "dresden": { url: `${VBL}/33ebca47-ee88-4505-80a3-8f625a651bdc-200x200/Dresden.png`, bg: "light" },
  "eintracht spontent düsseldorf": { url: `${VBL}/11eb6af6-6268-4767-8c60-813b6161d2fc-200x200/Eintracht+Spontent_Kreis.png`, bg: "light" },
  "vfl oythe": { url: `${VBL}/10c17d7b-d082-4d7d-a4e0-f1d800544ff8-200x200/oythe.png`, bg: "light" },
};

// Primary brand colors keyed by the same normalized lookup names used in REGISTRY.
// Sources: club crests / official kit colors. Pick the dominant logo color so the
// header and accents read as "this team".
const BRAND_COLORS: Record<string, { primary: string; secondary?: string }> = {
  // 1. + 2. Bundesliga Frauen
  "rote raben vilsbiburg": { primary: "#c8102e" },
  "vilsbiburg":             { primary: "#c8102e" },
  "nawaro straubing":       { primary: "#1a5e3e" },
  "straubing":              { primary: "#1a5e3e" },
  "skurios volleys borken": { primary: "#fe4b13" },
  "oythe":                  { primary: "#fe4b13" },
  "vfl oythe":              { primary: "#fe4b13" },
  "fc planegg-krailling":   { primary: "#0066b3" },
  "planegg-krailling":      { primary: "#0066b3" },
  "dresdner sc":            { primary: "#cf2027" },
  "dsc dresden":            { primary: "#cf2027" },
  "vco dresden":            { primary: "#cf2027" },
  "dresden":                { primary: "#cf2027" },
  "dshs snowtrex köln":     { primary: "#d8232a" },
  "dshs köln":              { primary: "#d8232a" },
  "bayer 04 leverkusen":    { primary: "#e30613" },
  "bayer leverkusen":       { primary: "#e30613" },
  "tv waldgirmes":          { primary: "#003a7c" },
  "esa grimma volleys":     { primary: "#003a7c" },
  "grimma":                 { primary: "#003a7c" },
  "sparkassen wildcats stralsund": { primary: "#e30613" },
  "wildcats stralsund":     { primary: "#e30613" },
  "stralsund":              { primary: "#e30613" },
  "eintracht spontent":     { primary: "#f4001b" },
  "eintracht düsseldorf":   { primary: "#f4001b" },
  "eintracht spontent düsseldorf": { primary: "#f4001b" },
  "neuseenland-volleys markkleeberg": { primary: "#1d8e3a" },
  "markkleeberg":           { primary: "#1d8e3a" },
  "tv dingolfing":          { primary: "#1d4ed8" },
  "dingolfing":             { primary: "#1d4ed8" },
  "tv hörde 1911":          { primary: "#fcc419" },
  "tv hörde":               { primary: "#fcc419" },
  "bbsc berlin":            { primary: "#ee2a3a" },

  // 1. Bundesliga Männer
  "berlin recycling volleys": { primary: "#f37021", secondary: "#000000" },
  "br volleys":               { primary: "#f37021", secondary: "#000000" },
  "berlin recycling":         { primary: "#f37021", secondary: "#000000" },
  "brv":                      { primary: "#f37021", secondary: "#000000" },
  "vfb friedrichshafen":      { primary: "#003c7e", secondary: "#fcc419" },
  "friedrichshafen":          { primary: "#003c7e", secondary: "#fcc419" },

  // 2. BL extras
  "vc wiesbaden":         { primary: "#009ee0" },
  "vc wiesbaden ii":      { primary: "#009ee0" },
  "wiesbaden":            { primary: "#009ee0" },
  "tv suspa altdorf":     { primary: "#005baa" },
  "tv altdorf":           { primary: "#005baa" },
  "altdorf":              { primary: "#005baa" },
  "schweriner sc":        { primary: "#ffd400" },
  "schweriner sc ii":     { primary: "#ffd400" },
  "ssc palmberg schwerin": { primary: "#ffd400" },
  "schwerin":             { primary: "#ffd400" },
  "vco münster":          { primary: "#6e2c8f" },
  "usc münster":          { primary: "#6e2c8f" },
  "usc münster ii":       { primary: "#6e2c8f" },
  "münster":              { primary: "#6e2c8f" },
  "tsv unterhaching":     { primary: "#c8102e" },
  "unterhaching":         { primary: "#c8102e" },
  "sparda bsp stuttgart": { primary: "#009639" },
  "bsp stuttgart":        { primary: "#009639" },
  "stuttgart":            { primary: "#009639" },
  "tv rottenburg":        { primary: "#cd1e29" },
  "rottenburg":           { primary: "#cd1e29" },
  "fc schüttorf 09":      { primary: "#fcc419" },
  "fc schüttorf":         { primary: "#fcc419" },
  "schüttorf":            { primary: "#fcc419" },
  "ssc freisen":          { primary: "#003c7e" },
  "freisen":              { primary: "#003c7e" },
  "prowin volleys tv holz": { primary: "#cf0a2c" },
  "prowin volleys":       { primary: "#cf0a2c" },
  "tv holz":              { primary: "#cf0a2c" },
  "holz":                 { primary: "#cf0a2c" },
  "allianz mtv stuttgart": { primary: "#003781" },
};

// Splice colours into the registry entries so they propagate via lookupClubLogo.
for (const key of Object.keys(BRAND_COLORS)) {
  if (REGISTRY[key]) {
    REGISTRY[key] = { ...REGISTRY[key], ...BRAND_COLORS[key] };
  }
}

/** Normalise a club name for registry lookup: lowercase, strip punctuation/whitespace runs. */
function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/[._]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Look up a real logo for the given club name, if known. */
export function lookupClubLogo(name: string): ClubLogoEntry | null {
  if (!name) return null;
  const n = normalize(name);
  if (REGISTRY[n]) return REGISTRY[n];
  // Try removing common prefixes ("1. ", "VC ", etc.)
  const stripped = n
    .replace(/^\d+\.\s+/, "")
    .replace(/^(tsv|tv|vc|sc|sv|sg|tg|tus|vfl|vfb|vfr|mtv|usc|ssc|svc|svg|svh|fc)\s+/, "")
    .trim();
  if (REGISTRY[stripped]) return REGISTRY[stripped];
  return null;
}

/** Deterministic 0..1 hash of a string (FNV-1a-ish, good enough for picking colours). */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

const GRADIENT_PALETTE = [
  ["#794dff", "#4c1d95"], // accent purple
  ["#22c55e", "#15803d"], // green
  ["#3b82f6", "#1e40af"], // blue
  ["#f97316", "#9a3412"], // orange
  ["#ef4444", "#991b1b"], // red
  ["#eab308", "#854d0e"], // yellow
  ["#06b6d4", "#155e75"], // cyan
  ["#ec4899", "#9d174d"], // pink
  ["#14b8a6", "#115e59"], // teal
  ["#8b5cf6", "#5b21b6"], // violet
];

/** Pick a stable gradient (from→to) for a given club name. */
export function clubGradient(name: string): { from: string; to: string } {
  const idx = Math.floor(hash(normalize(name)) * GRADIENT_PALETTE.length);
  const [from, to] = GRADIENT_PALETTE[idx];
  return { from, to };
}

/**
 * Primary brand colour for a club as a hex string.
 * Returns the registry entry's `primary` when known, otherwise a
 * deterministic fallback derived from the gradient palette.
 */
export function clubColor(name: string): string {
  const entry = lookupClubLogo(name);
  if (entry?.primary) return entry.primary;
  return clubGradient(name).from;
}

/** Same as clubColor but returns a darker shade of the primary for gradients/hover states. */
export function clubColorDark(name: string): string {
  return shade(clubColor(name), -0.45);
}

/** Mix a hex colour toward black (amount < 0) or white (amount > 0). */
function shade(hex: string, amount: number): string {
  const m = hex.replace("#", "").match(/.{2}/g);
  if (!m) return hex;
  const [r, g, b] = m.map(c => parseInt(c, 16));
  const adjust = (v: number) => {
    const n = amount < 0 ? v * (1 + amount) : v + (255 - v) * amount;
    return Math.max(0, Math.min(255, Math.round(n)));
  };
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(adjust(r))}${toHex(adjust(g))}${toHex(adjust(b))}`;
}

/** Two-letter initials extracted from a club name. */
export function clubInitials(name: string): string {
  const cleaned = name
    .replace(/^\d+\.\s+/, "")
    .replace(/\b(damen|herren|mixed|u\d+|jugend|senioren)\b/gi, "")
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  // Skip leading vereinsform abbreviations if there's a meaningful name after.
  const skip = /^(tsv|tv|vc|sc|sv|sg|tg|tus|vfl|vfb|vfr|mtv|usc|ssc|svc|svg|svh|fc|1\.)$/i;
  let first = words[0];
  let second = words[1];
  if (skip.test(first) && words[2]) {
    first = words[1];
    second = words[2];
  }
  return (first[0] + second[0]).toUpperCase();
}
