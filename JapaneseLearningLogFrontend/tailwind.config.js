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
    }),
    color: (colors) => ({
      ...colors("colors"),
      jLDark: "#2E2E2E",
    }),
  },
  variants: {},
  plugins: [],
};
