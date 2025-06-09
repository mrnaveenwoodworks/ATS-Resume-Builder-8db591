const resumeThemes = {
  modern: {
    name: "modern",
    styles: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif"
      },
      colors: {
        primary: "#0891b2", // cyan.600
        secondary: "#0e7490", // cyan.700
        text: {
          primary: "#1F2937", // slate.800
          secondary: "#4B5563", // slate.600
          accent: "#0891b2" // cyan.600
        },
        background: {
          primary: "#ffffff", // white
          secondary: "#F4F5F7", // slate.100
          accent: "#0284c7" // primary.600 - Updated
        },
        border: "#D2D6DC" // slate.300
      },
      spacing: {
        section: "2rem",
        item: "1.5rem"
      },
      fontSize: {
        name: "2.25rem",
        title: "1.5rem",
        subtitle: "1.25rem",
        body: "1rem",
        small: "0.875rem"
      }
    }
  },

  classic: {
    name: "classic",
    styles: {
      fontFamily: {
        heading: "Merriweather, serif",
        body: "Inter, sans-serif"
      },
      colors: {
        primary: "#1b3bbb", // navy.500
        secondary: "#1B254B", // navy.700
        text: {
          primary: "#1B2559", // gray.900
          secondary: "#707eae", // gray.700
          accent: "#1b3bbb" // navy.500
        },
        background: {
          primary: "#ffffff", // white
          secondary: "#EEF0F6", // gray.100
          accent: "#0284c7" // primary.600 - Updated
        },
        border: "#C9D0E3" // gray.300
      },
      spacing: {
        section: "2.5rem",
        item: "1.75rem"
      },
      fontSize: {
        name: "2.5rem",
        title: "1.75rem",
        subtitle: "1.375rem",
        body: "1rem",
        small: "0.875rem"
      }
    }
  },

  minimal: {
    name: "minimal",
    styles: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif"
      },
      colors: {
        primary: "#1B2559", // gray.900
        secondary: "#707eae", // gray.700
        text: {
          primary: "#1B2559", // gray.900
          secondary: "#A3AED0", // gray.600
          accent: "#1B2559" // gray.900
        },
        background: {
          primary: "#ffffff", // white
          secondary: "#F9FAFB", // slate.50
          accent: "#0284c7" // primary.600 - Updated
        },
        border: "#E5E7EB" // slate.200
      },
      spacing: {
        section: "2rem",
        item: "1.5rem"
      },
      fontSize: {
        name: "2rem",
        title: "1.5rem",
        subtitle: "1.25rem",
        body: "1rem",
        small: "0.875rem"
      }
    }
  },

  creative: {
    name: "creative",
    styles: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif"
      },
      colors: {
        primary: "#9333ea", // purple.600
        secondary: "#7928ca", // purple.700
        text: {
          primary: "#1F2937", // slate.800
          secondary: "#4B5563", // slate.600
          accent: "#9333ea" // purple.600
        },
        background: {
          primary: "#ffffff", // white
          secondary: "#f3e8ff", // purple.100
          accent: "#0284c7" // primary.600 - Updated
        },
        border: "#d8b4fe" // purple.300
      },
      spacing: {
        section: "2.25rem",
        item: "1.5rem"
      },
      fontSize: {
        name: "2.25rem",
        title: "1.625rem",
        subtitle: "1.25rem",
        body: "1rem",
        small: "0.875rem"
      }
    }
  },

  professional: {
    name: "professional",
    styles: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif"
      },
      colors: {
        primary: "#01B574", // horizonGreen.500
        secondary: "#016B44", // horizonGreen.700
        text: {
          primary: "#111c44", // navy.800
          secondary: "#24388a", // navy.600
          accent: "#01B574" // horizonGreen.500
        },
        background: {
          primary: "#ffffff", // white
          secondary: "#E1FFF4", // horizonGreen.50
          accent: "#0284c7" // primary.600 - Updated
        },
        border: "#39FEB6" // horizonGreen.300
      },
      spacing: {
        section: "2.25rem",
        item: "1.5rem"
      },
      fontSize: {
        name: "2.25rem",
        title: "1.5rem",
        subtitle: "1.25rem",
        body: "1rem",
        small: "0.875rem"
      }
    }
  }
};

// Helper function to get theme by name
export const getThemeByName = (themeName) => {
  return resumeThemes[themeName] || resumeThemes.modern;
};

// Helper function to get all theme names
export const getAllThemeNames = () => {
  return Object.keys(resumeThemes);
};

// Helper function to get theme preview colors
export const getThemePreviewColors = (themeName) => {
  const theme = resumeThemes[themeName] || resumeThemes.modern;
  return {
    primary: theme.styles.colors.primary,
    secondary: theme.styles.colors.secondary,
    background: theme.styles.colors.background.primary,
    accent: theme.styles.colors.background.accent
  };
};

// Helper function to generate CSS variables for a theme
export const generateThemeVariables = (themeName) => {
  const theme = resumeThemes[themeName] || resumeThemes.modern;
  return {
    "--theme-primary": theme.styles.colors.primary,
    "--theme-secondary": theme.styles.colors.secondary,
    "--theme-text-primary": theme.styles.colors.text.primary,
    "--theme-text-secondary": theme.styles.colors.text.secondary,
    "--theme-text-accent": theme.styles.colors.text.accent,
    "--theme-bg-primary": theme.styles.colors.background.primary,
    "--theme-bg-secondary": theme.styles.colors.background.secondary,
    "--theme-bg-accent": theme.styles.colors.background.accent,
    "--theme-border": theme.styles.colors.border,
    "--theme-spacing-section": theme.styles.spacing.section,
    "--theme-spacing-item": theme.styles.spacing.item,
    "--theme-font-heading": theme.styles.fontFamily.heading,
    "--theme-font-body": theme.styles.fontFamily.body,
    "--theme-font-size-name": theme.styles.fontSize.name,
    "--theme-font-size-title": theme.styles.fontSize.title,
    "--theme-font-size-subtitle": theme.styles.fontSize.subtitle,
    "--theme-font-size-body": theme.styles.fontSize.body,
    "--theme-font-size-small": theme.styles.fontSize.small
  };
};

export default resumeThemes;
