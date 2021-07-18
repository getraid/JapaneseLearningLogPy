// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  outputDir: "../static",
  pwa: {
    name: "Japanese Log",
    themeColor: "#DF7323",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    iconPaths: {
      favicon32: "/public/favicon.png",
      favicon16: "/public/favicon.png",
      appleTouchIcon: "/public//favicon.png",
      maskIcon: "/public/favicon.png",
      msTileImage: "/public/favicon.png"
    }
  }
};
