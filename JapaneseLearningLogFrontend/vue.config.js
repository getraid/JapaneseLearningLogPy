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
      favicon32: "favicon.png",
      favicon16: "favicon.png",
      appleTouchIcon: "favicon.png",
      maskIcon: "favicon.png",
      msTileImage: "favicon.png"
    }
  }
};
