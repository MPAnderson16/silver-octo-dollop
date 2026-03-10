export { defaultThemeName } from "./themes";
import { getTheme, defaultThemeName } from "./themes";

export function applyTheme(themeName = defaultThemeName) {
  const theme = getTheme(themeName);
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

export function setThemeVariable(key, value) {
  document.documentElement.style.setProperty(`--${key}`, value);
}
