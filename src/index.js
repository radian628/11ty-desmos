const { encode } = require("html-entities");

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("desmosSupport", async (apiKey) => {
    return `
<script src="https://www.desmos.com/api/v1.8/calculator.js?apiKey=${apiKey}"></script>

<script defer>
window.addEventListener("load", () => {
  for (const e of document.getElementsByClassName("eleventy-desmos-mq-container")) {  
    var staticMath = Desmos.MathQuill.StaticMath(e);
    staticMath.latex(e.dataset.latex);
    e.querySelector(".dcg-mq-root-block").style.display = "inline";

    const settings = JSON.parse(e.dataset.settings);
    if (settings.copyButton) {
      const copyButton = document.createElement("button");
      copyButton.classList.toggle("eleventy-desmos-copy-button", true);
      copyButton.innerText = "Copy to Clipboard"
      e.parentElement.appendChild(copyButton);
      copyButton.onclick = () => {
        navigator.clipboard.writeText(e.dataset.latex);
        copyButton.innerText = "Copied!";
        setTimeout(() => {
          copyButton.innerHTML = "Copy to Clipboard";
        }, 750);
      }
    }
  }

  for (const e of document.getElementsByClassName("eleventy-desmos-dcg-container")) {
    const observer = new IntersectionObserver((entries, observer) => {
      if (!Array.from(entries).some(e => e.isIntersecting)) return;
      const Calc = Desmos.GraphingCalculator(e, JSON.parse(e.dataset.settings));
      Calc.setState(JSON.parse(e.dataset.state))
      observer.disconnect()
    });
    observer.observe(e, { threshold: 0.01 });
  }

})</script>
    `;
  });

  function createMathquillHTML(latex, settings) {
    return `<span class="dcg-calculator-api-container"><span class="eleventy-desmos-mq-container dcg-mq-math-mode" data-latex="${encode(
      latex
    )}" data-settings="${encode(settings ?? "{}")}"></span></span>`;
  }

  eleventyConfig.addShortcode("mq", async (state, settings) => {
    const tm = await import("@desmodder/text-mode-core");

    const cfg = tm.buildConfig({});
    const raw = tm.textToRaw(cfg, state);

    return createMathquillHTML(raw[1].expressions.list[0].latex, settings);
  });

  eleventyConfig.addShortcode("latex", async (state, settings) => {
    return createMathquillHTML(state, settings);
  });

  function createDesmosHTML(state, settings) {
    return `<div class="eleventy-desmos-dcg-container"
      data-state="${encode(state)}"
      data-settings="${encode(settings ?? "{}")}"
    ></div>`;
  }

  eleventyConfig.addPairedShortcode("desmos", async (state, settings) => {
    const tm = await import("@desmodder/text-mode-core");

    const cfg = tm.buildConfig({});
    const raw = tm.textToRaw(cfg, state);

    let lockViewport = true;

    if (settings) {
      lockViewport = JSON.parse(settings).lockViewport ?? true;
    }

    raw[1].graph.userLockedViewport = lockViewport;

    return createDesmosHTML(JSON.stringify(raw[1]), settings);
  });

  eleventyConfig.addPairedShortcode("graphstate", async (state, settings) => {
    return createDesmosHTML(JSON.stringify(state), settings);
  });
};
