import { useColorScheme } from "react-native";

// Portainer-inspired color palette
const tintColorLight = "#0db7ed"; // Docker blue
const tintColorDark = "#0db7ed";
export const brandColor = "#BE2044"; // Portainer pink/magenta

export const Colors = {
  light: {
    text: "#333333",
    background: "#ffffff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    primary: "#BE2044", // Portainer pink
    secondary: "#666666",
    surface: "#f5f5f5",
    border: "#e0e0e0",
    card: "#ffffff",
    notification: "#ff3b30",
    success: "#23ae89", // Portainer green
    warning: "#ff9500",
    error: "#ff3b30",
    // Button colors - dark like Portainer's "Live connect"
    buttonBackground: "#333333",
    buttonText: "#ffffff",
    // Input colors
    inputBackground: "#f9f9f9",
    inputBorder: "#ddd",
    inputText: "#333333",
    inputPlaceholder: "#999",
    // Link colors
    link: "#0db7ed", // Blue for interactive elements
    // Portainer-specific
    sidebar: "#2c3e50", // Dark sidebar
    sidebarText: "#ecf0f1",
    banner: "#e8e0f0", // Lavender news banner
    dockerBlue: "#0db7ed",
    statusGreen: "#23ae89",
  },
  dark: {
    text: "#ecf0f1",
    background: "#1a1c20",
    tint: "#0db7ed",
    tabIconDefault: "#cccccc",
    tabIconSelected: "#0db7ed",
    primary: "#BE2044",
    secondary: "#aaaaaa",
    surface: "#2c3e50",
    border: "#3d4f5f",
    card: "#2c3e50",
    notification: "#ff453a",
    success: "#23ae89",
    warning: "#ff9f0a",
    error: "#ff453a",
    // Button colors
    buttonBackground: "#BE2044",
    buttonText: "#ffffff",
    // Input colors
    inputBackground: "#2c3e50",
    inputBorder: "#3d4f5f",
    inputText: "#ecf0f1",
    inputPlaceholder: "#888888",
    // Link colors
    link: "#0db7ed",
    // Portainer-specific
    sidebar: "#1a1c20",
    sidebarText: "#ecf0f1",
    banner: "#3d2f5f",
    dockerBlue: "#0db7ed",
    statusGreen: "#23ae89",
  },
};

// Type definitions
export type ColorScheme = "light" | "dark";
export type ThemeColors = typeof Colors.light;
export type ColorKey = keyof ThemeColors;

// Simple hook to get current color scheme - forced to light mode for development
// @deprecated Use useCurrentTheme()  from context/CentralTheme instead
export function useCurrentColorScheme(): ColorScheme {
  return "light"; // Force light mode - ignore system theme
}

// Hook to get theme colors based on current scheme
export function useThemeColors(): ThemeColors {
  const colorScheme = useCurrentColorScheme();
  return Colors[colorScheme];
}

// Hook to get specific theme color with optional overrides
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorKey
): string {
  const colorScheme = useCurrentColorScheme();
  const colors = Colors[colorScheme];
  const colorFromProps = props[colorScheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[colorName];
  }
}

// Hook for adaptive colors (automatically switches based on theme)
// @deprecated Use useCurrentTheme()  from context/CentralTheme instead
export function useAdaptiveColors() {
  const colorScheme = useCurrentColorScheme();
  const colors = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  return {
    // Basic colors
    text: colors.text,
    background: colors.background,
    primary: colors.primary,
    secondary: colors.secondary,

    // Semantic colors
    surface: colors.surface,
    border: colors.border,
    card: colors.card,

    // Status colors
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    notification: colors.notification,

    // Interactive colors
    buttonBackground: colors.buttonBackground,
    buttonText: colors.buttonText,

    // Input colors
    inputBackground: colors.inputBackground,
    inputBorder: colors.inputBorder,
    inputText: colors.inputText,
    inputPlaceholder: colors.inputPlaceholder,

    // Utility
    isDark,
    isLight: !isDark,
    colorScheme,
    tint: colors.tint,

    // Custom adaptive colors
    inversePrimary: isDark ? Colors.light.primary : Colors.dark.primary,
    inverseBackground: isDark
      ? Colors.light.background
      : Colors.dark.background,
    subtleText: isDark ? "#cccccc" : "#666666",
    mutedText: isDark ? "#999999" : "#888888",
    accent: "#98a75e",
  };
}

// Helper function to get colors without hooks (for use in StyleSheet.create)
export function getThemeColors(
  colorScheme: ColorScheme = "light"
): ThemeColors {
  return Colors[colorScheme];
}

// Helper function to create theme-aware styles
export function createThemedStyles<T extends Record<string, any>>(
  styleCreator: (colors: ThemeColors, isDark: boolean) => T
) {
  return (colorScheme: ColorScheme = "light") => {
    const colors = getThemeColors(colorScheme);
    const isDark = colorScheme === "dark";
    return styleCreator(colors, isDark);
  };
}

// Utility function to get adaptive color value
export function getAdaptiveColor(
  lightColor: string,
  darkColor: string,
  colorScheme?: ColorScheme
): string {
  const scheme = colorScheme ?? useColorScheme() ?? "light";
  return scheme === "dark" ? darkColor : lightColor;
}

// Export default for backward compatibility
export default Colors;
