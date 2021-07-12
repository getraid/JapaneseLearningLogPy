module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {},

    backgroundColor: (theme) => ({
      ...theme("colors"),
      jlOrange: "#DF7323",
      jlGrey: "#2E2E2E",
      jlBase: "#D6D6D6",
      jlStackBg: "#E0E0E0",
      jlStackBehind: "#CACACA",
      jlItemBg: "#A19892",
    }),
    color: (colors) => ({
      ...colors("colors"),
      jLDark: "#2E2E2E",
    }),
  },
  variants: {},
  plugins: [],
};
