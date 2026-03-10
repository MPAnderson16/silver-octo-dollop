export const themes = {
  dark: {
    bg: "#0a0f1f",
    card: "#0f1530",
    text: "#eef2ff",
    muted: "#a6b0cd",
    accent: "#5b9fff",
  },
  light: {
    bg: "#f6f8ff",
    card: "#ffffff",
    text: "#0a0f1f",
    muted: "#6b7280",
    accent: "#3b82f6",
  },
  pink: {
    bg: "#ffe4e6",
    card: "#fff1f2",
    text: "#9d174d",
    muted: "#db2777",
    accent: "#ec4899",
  }
};

export const defaultThemeName = "light";

export function getTheme(name) {
  return themes[name] ?? themes[defaultThemeName];
}
