---
title: Datensatz
style: css/custom.css
---

# Datensatz

```js
const data = await FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});
const numberOfPersons = data.length;
```

Ab sofort arbeiten wir mit einem größeren Datensatz. Dieser besteht aus Daten von ${numberOfPersons} Personen.

<div class="tip" label="Aufgabe">
Ab welchem Kreditscore würdest du einen Kredit vergeben? 
Begründe deine Antwort basierend auf dem dargestellten Datensatz.
</div>

```js
const fig = Plot.plot({
  width: 600,
  height: 200,
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
    domain: ["Zahlt nicht zurück", "Zahlt zurück", ]
  },
  marks: [
    Plot.dot(
      data,
      Plot.stackY2({
        x: "score",
        fill: "type",
        sort: {
          value: "type", 
          reverse: false 
        },
        reverse: true
      })
    ),
    Plot.ruleY([0]),
  ],
});
display(fig);
