<!DOCTYPE html>

{% desmosSupport "dcb31709b452b1cf9dc26972add0fda6" %}

<style>

.eleventy-desmos-dcg-container {
  height: 30vh;
}
</style>

# Text Mode test:

{% mq "y=x" %}

The equations can be inline too: {% mq "y=x" %} &lt;-- See?

# LaTeX test:

{% latex "f\\left(x\\right)=3" %}

# Text Mode Desmos Embed

{% desmos "{}" %}
{ y > x: 1, 0 } > 0.5;
a + b = 2
{% enddesmos%}

# Text Mode Graphstate Embed

{% graphstate %}
{"version":10,"randomSeed":"a4de9b56314e126dc047a1e3754ed355","graph":{"viewport":{"xmin":-10,"ymin":-11.705358976677651,"xmax":10,"ymax":11.705358976677651}},"expressions":{"list":[{"type":"expression","id":"9","color":"#c74440","latex":"y=x"},{"type":"expression","id":"10","color":"#2d70b3"}]}}
{% endgraphstate %}
