module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {},

    backgroundColor: theme => ({
      ...theme("colors"),
      jlOrange: "#DF7323"
    }),
    colors: {
      jLDark: "#2E2E2E"
    }
  },
  variants: {},
  plugins: []
};
