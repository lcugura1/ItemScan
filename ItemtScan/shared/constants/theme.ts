export const colors = {
  // Pozadine
  bg: "#0f0f0f",
  bgCard: "#1a1a1a",
  bgInput: "#1a1a1a",
  bgBanner: "#2a1f00",

  // Borders
  border: "#333",

  // Tekst
  textPrimary: "#ffffff",
  textSecondary: "#aaa",
  textDim: "#888",
  textError: "#EF4444",
  textWarning: "#F59E0B",

  // Akcent
  accent: "#4f9eff",
  accentDim: "#4f9eff33",

  // Placeholder
  placeholder: "#666",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 10,
  lg: 12,
} as const;

// Za TabLayout i komponente koje trebaju light/dark support
export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: colors.accent,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: colors.accent,
  },
  dark: {
    text: colors.textPrimary,
    background: colors.bg,
    tint: colors.accent,
    icon: colors.textSecondary,
    tabIconDefault: colors.textSecondary,
    tabIconSelected: colors.accent,
  },
} as const;
