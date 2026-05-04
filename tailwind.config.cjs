/** @type {import('tailwindcss').Config} */

/**
 * Generates a color set for various states (light, hover, active, etc.) using CSS variable notation.
 *
 * @param {string} colorCode - The base code for the color, used to construct the CSS variables.
 *    For example, if the input is 'primary', the function will generate a set of colors like:
 *    - var(--color-primary-light)
 *    - var(--color-primary-hover)
 *    - var(--color-primary-dark), etc.
 *
 * @returns {object} An object representing different shades and states of the color,
 *    where the keys are the color states (e.g., light, hover, dark), and the values
 *    are the corresponding CSS variable for that state.
 *
 * Example output for input 'primary':
 * ```js
 *  return {
 *      light: 'var(--color-primary-light)',
 *      light-hover: 'var(--color-primary-light-hover)',
 *      light-active: 'var(--color-primary-light-active)',
 *      DEFAULT: 'var(--color-primary)',
 *      hover: 'var(--color-primary-hover)',
 *      active: 'var(--color-primary-active)',
 *      dark: 'var(--color-primary-dark)',
 *      dark-hover: 'var(--color-primary-dark-hover)',
 *      dark-active: 'var(--color-primary-dark-active)',
 *      darker: 'var(--color-primary-darker)'
 * }
 * ```
 */
const createColorSet = (colorCode) => {
  // Construct an object with color states using the provided base color code.
  return {
    // Lighter shade of the color
    light: `var(--color-${colorCode}-light)`,

    // Lighter shade when hovered
    "light-hover": `var(--color-${colorCode}-light-hover)`,

    // Lighter shade when active (e.g., pressed or selected)
    "light-active": `var(--color-${colorCode}-light-active)`,

    // Default color (base color)
    DEFAULT: `var(--color-${colorCode})`,

    // Default color when hovered
    hover: `var(--color-${colorCode}-hover)`,

    // Default color when active (e.g., pressed or selected)
    active: `var(--color-${colorCode}-active)`,

    // Darker shade of the color
    dark: `var(--color-${colorCode}-dark)`,

    // Darker shade when hovered
    "dark-hover": `var(--color-${colorCode}-dark-hover)`,

    // Darker shade when active (e.g., pressed or selected)
    "dark-active": `var(--color-${colorCode}-dark-active)`,

    // Darkest shade of the color (e.g., for shadows or emphasis)
    darker: `var(--color-${colorCode}-darker)`,
  };
};

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Configuration for box shadows
      boxShadow: {
        xs: `0 4px 8px var(--box-shadow-color)`,
        sm: `0 0 30px var(--box-shadow-color)`, // Box Shadow 1
        lg: `0 6px 8px var(--box-shadow-color)`, // Box Shadow 2
      },

      dropShadow: {
        right: ["3px 0px 2px rgb(0 0 0 / 0.05)"],
        left: ["-3px 0px 2px rgb(0 0 0 / 0.05)"],
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      // Configuration for font sizes
      fontSize: {
        xxs: "10px", // Extra extra small font size
        xs: "12px", // Extra small font size
        sm: "14px", // Small font size
        base: "16px", // Base font size (default)
        lg: "18px", // Large font size
        xl: "24px", // Extra large font size
      },
      // Configuration for line heights
      lineHeight: {
        xxs: "15px", // Extra extra small line height
        xs: "18px", // Extra small line height
        sm: "21px", // Small line height
        base: "24px", // Base line height (default)
        lg: "27px", // Large line height
        xl: "27px", // Extra large line height (same as large)
      },
      // Configuration for font weights
      fontWeight: {
        normal: 400, // Normal font weight
        semibold: 600, // Semi-bold font weight
        bold: 700, // Bold font weight
      },
      // Configuration for spacing (margins, paddings, etc.)
      spacing: {
        1: "4px", // 4 pixels spacing
        2: "8px", // 8 pixels spacing
        3: "12px", // 12 pixels spacing
        4: "16px", // 16 pixels spacing
        6: "24px", // 24 pixels spacing
        8: "32px", // 32 pixels spacing
        10: "40px", // 40 pixels spacing
        12: "48px", // 48 pixels spacing
        14: "56px", // 56 pixels spacing
        16: "64px", // 64 pixels spacing
        18: "72px", // 72 pixels spacing
        20: "80px", // 80 pixels spacing
      },
      // Configuration for colors
      colors: {
        primary: createColorSet("primary"), // Primary color set
        grey: createColorSet("grey"), // Grey color set
        grey1: createColorSet("grey1"), // Grey1 color set
        grey2: createColorSet("grey2"), // Grey2 color set
        green: createColorSet("green"), // Green color set
        yellow: createColorSet("yellow"), // Yellow color set
        orange: createColorSet("orange"), // Orange color set
        red: createColorSet("red"), // Red color set
        stroke: {
          DEFAULT: "var(--stroke)", // Default stroke color
        },
        background: {
          DEFAULT: "var(--background)", // Default background color
        },
        keyboardTab: {
          DEFAULT: "var(--keyboard-tab)", // Default keyboard tab color
        },

        // TODO: remove these unwanted after repo cleansing
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
