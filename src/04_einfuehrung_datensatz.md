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

Ab sofort arbeiten wir mit einem größeren Datensatz. Dieser besteht aus Daten von ${numberOfPersons} Personen. Von diesen sind TODO Personen zahlungsfähig und TODO Personen nicht zahlungsfähig.

<div class="tip" label="Aufgabe">
Ab welchem Kreditscore würdest du einen Kredit vergeben? Notiere den Wert deiner Entscheidungsgrenze und begründe deine Wahl. 
</div>

```js
const data = FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});
```

Hier kannst du die Entscheidungsgrenze variieren und die aus deiner Sicht optimale Entscheidungsgrenze festlegen.


Entscheidungsgrenze:

```js
const threshAlt = view(
  Inputs.range([0, 100], {
    step: 1,
    label: "",
  })
);
```

```js
display(
  Plot.plot({
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
    },
    marks: [
      Plot.dot(
        data,
        Plot.stackY2({
          x: "score",
          fill: "type",
          sort: "type",
          fillOpacity: (d) => (d.score < threshAlt ? 0.3 : 1),
                  sort: {
          value: "type", 
          reverse: false 
        },
        reverse: true
        })
      ),
      Plot.ruleY([0]),
      Plot.ruleX([threshAlt - 0.5]),
    ],
  })
);
```


