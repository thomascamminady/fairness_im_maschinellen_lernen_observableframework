---
title: Datensatz
style: css/custom.css
---

# Datensatz

```js
const data = FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});
```

Ab sofort arbeiten wir mit einem größeren Datensatz. Dieser besteht aus Daten von 2000 Personen.
Der Datensatz ist in dem folgenden Histrogramm dargestellt.

<div class="tip" label="Aufgabe">
Ab welchem Kreditscore würdest du einen Kredit vergeben? 
Begründe deine Antwort basierend auf dem dargestellten Datensatz.
</div>

```js
const fig = Plot.plot({
  width: 1000,
  height: 500,
  style: {
    fontSize: 18,
  },

  x: {
    label: "Score",
    domain: [0, 99],
  },
  color: {
    legend: true,
    scheme: "Paired",
  },
  marks: [
    Plot.dot(
      data,
      Plot.stackY2({
        x: "score",
        fill: "type",
        sort: "type",
      })
    ),
    Plot.ruleY([0]),
  ],
});
display(fig);
```
