const { encode } = require("html-entities");

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("desmosSupport", async (apiKey) => {
    return `
<script src="https://www.desmos.com/api/v1.8/calculator.js?apiKey=${apiKey}"></script>

<script defer>
window.addEventListener("load", () => {
  for (const e of document.getElementsByClassName("eleventy-desmos-mq-container")) {  
    console.log("found staticmath", e);    
    const staticMath = Desmos.MathQuill.StaticMath(e);
    staticMath.latex(e.dataset.latex);
    e.querySelector(".dcg-mq-root-block").style.display = "inline";

    const settings = JSON.parse(e.dataset.settings);
    if (settings.copyButton) {
      const copyButton = document.createElement("button");
      copyButton.classList.toggle("eleventy-desmos-copy-button", true);
      copyButton.innerText = "Copy to Clipboard"
      rootblock.appendChild(copyButton);
      copyButton.onclick = () => {
        navigator.clipboard.writeText(content);
        copyButton.innerText = "Copied!";
        setTimeout(() => {
          copyButton.innerHTML = "Copy to Clipboard";
        }, 750);
      }
    }
  }

  for (const e of document.getElementsByClassName("eleventy-desmos-dcg-container")) {
    const observer = new IntersectionObserver(() => {
      const Calc = Desmos.GraphingCalculator(e, JSON.parse(e.dataset.settings));
      Calc.setState(JSON.parse(e.dataset.state))
      observer.disconnect()
    });
    observer.observe(e);
  }

})</script>
    `;
  });

  eleventyConfig.addShortcode("mq", async (state, settings) => {
    const tm = await import("@desmodder/text-mode-core");

    const cfg = tm.buildConfig({});
    const raw = tm.textToRaw(cfg, state);

    return `<span class="dcg-calculator-api-container"><span class="eleventy-desmos-mq-container dcg-mq-math-mode" data-latex="${encode(
      raw[1].expressions.list[0].latex
    )}" data-settings="${encode(
      JSON.stringify(settings ?? {})
    )}"></span></span>`;
  });

  eleventyConfig.addShortcode("latex", async (state, settings) => {
    return `<span class="dcg-calculator-api-container"><span class="eleventy-desmos-mq-container dcg-mq-math-mode" data-latex="${encode(
      state
    )}" data-settings="${encode(
      JSON.stringify(settings ?? {})
    )}"></span></span>`;
  });

  eleventyConfig.addPairedShortcode("desmos", async (state, settings) => {
    const tm = await import("@desmodder/text-mode-core");

    const cfg = tm.buildConfig({});
    const raw = tm.textToRaw(cfg, state);

    return `<div class="eleventy-desmos-dcg-container"
      data-state="${encode(JSON.stringify(raw[1]))}"
      data-settings="${encode(JSON.stringify(settings ?? {}))}"
    ></div>`;
  });

  eleventyConfig.addPairedShortcode("graphstate", async (state, settings) => {
    return `<div class="eleventy-desmos-dcg-container"
      data-state="${encode(JSON.stringify(state ?? {}))}"
      data-settings="${encode(JSON.stringify(settings ?? {}))}"
    ></div>`;
  });
};
