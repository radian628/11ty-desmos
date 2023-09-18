<!DOCTYPE html>

Make sure to include the desmosSupport shortcode in any page that uses this plugin. You can put this in a template if a bunch of pages need it. Remember to include an API key! The API key below is the Development key, so don't use it in production unless you have permission!

{% desmosSupport "dcb31709b452b1cf9dc26972add0fda6" %}

<style>

.eleventy-desmos-dcg-container {
  height: 30vh;
}
</style>

# Text Mode Desmos Embed

Uses [Text Mode](https://www.desmodder.com/text-mode/) syntax for easy editing in plaintext.

{% desmos "{}" %}
{ y > x: 1, 0 } > 0.5;
a + b = 2
{% enddesmos%}

# Graphstate Embed

Embed an entire Desmos graph state JSON object. This object is returned by [Calc.getState](https://www.desmos.com/api/v1.8/docs/index.html#document-saving-and-loading).

{% graphstate %}
{"version":10,"randomSeed":"a4de9b56314e126dc047a1e3754ed355","graph":{"viewport":{"xmin":-10,"ymin":-11.705358976677651,"xmax":10,"ymax":11.705358976677651}},"expressions":{"list":[{"type":"expression","id":"9","color":"#c74440","latex":"y=x"},{"type":"expression","id":"10","color":"#2d70b3"}]}}
{% endgraphstate %}

# Text Mode MathQuill:

Uses [Text Mode](https://www.desmodder.com/text-mode/) syntax for easy editing in plaintext.

{% mq "y=x" %}

The equations can be inline too: {% mq "y=x" %} &lt;-- See?

# LaTeX MathQuill:

Text Mode not flexible enough? You can write raw LaTeX

{% latex "f\\left(x\\right)=3" %}
