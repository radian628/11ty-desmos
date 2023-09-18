const desmosPlugin = require("../src/index");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(desmosPlugin);
  eleventyConfig.addWatchTarget("./src");

  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
