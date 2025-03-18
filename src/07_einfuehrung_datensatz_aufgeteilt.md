---
title: Zwei Personengruppen
style: css/custom.css
---

# Zwei Personengruppen

## Was finden wir wirklich in unseren Daten?

<!-- Include Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">


```js
const data = FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});
```

Bisher haben wir die 400 Personen in unserem Datensatz lediglich danach unterschieden, ob sie zahlungsfähig sind (dunkelblau) oder nicht (hellblau).

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
  },
  marks: [
    Plot.dot(
      data,
      Plot.stackY2({
        x: "score",
        fill: "type",
        sort: "type",
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
```

Wir wissen allerdings noch mehr. Unser Datensatz besteht tatsächlich aus zwei Bevölkerungsgruppen, die sich in einem wesentlichen Merkmal unterscheiden. Dieses Merkmal könnte beispielsweise das Geschlecht, die ethnische Herkunft oder das Alter (alt vs. jung) sein. In unserem Datenbeispiel unterscheiden wir die Personen nach ihrer fiktiven Herkunft aus “Grünhausen” und “Pinklandia”.

In beiden Bevölkerungsgruppen gibt es je 100 Personen, die zahlungsfähig sind, und 100 Personen, die nicht zahlungsfähig sind. Damit ist es in beiden Populationen gleichwahrscheinlich, dass eine Person zahlungsfähig ist. 

Die Anwendung des Kreditscore-Modells liefert jedoch deutlich unterschiedliche Verteilungen für die beiden Personengruppen. Dies wird in den folgenden Grafiken ersichtlich. 


```js
const fig_left = Plot.plot({
  width: 600,
  height: 200,
  style: {
    fontSize: 18,
  },

  x: {
    label: "Score",
    domain: [10, 99],
  },
  y : {
    domain: [0, 10]
  },
  color: {
    legend: true,
    domain: ["Zahlt zurück", "Zahlt nicht zurück"],
    range: ["#33a02c", "#b2df8a"],
  },
  marks: [
    Plot.dot(
      data.filter((d) => d.age == "Jung"),
      Plot.stackY2({
        x: "score",
        fill: "type",
        sort: "type",
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

const fig_right = Plot.plot({
  width: 600,
  height: 200,
  style: {
    fontSize: 18,
  },

  x: {
    label: "Score",
    domain: [10, 99],
  },
  y : {
    domain: [0, 10]
  },

  color: {
    legend: true,
    domain: ["Zahlt zurück", "Zahlt nicht zurück"],
    range: ["#6a3d9a", "#cab2d6"],
  },
  marks: [
    Plot.dot(
      data.filter((d) => d.age == "Alt"),
      Plot.stackY2({
        x: "score",
        fill: "type",
        sort: "type",
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
```


<img src="img/fairness_grafik.png" alt="Verteilung der beiden Personengruppen" />
<div class="grid grid-cols-2">
  <div class="card" style="max-width: 700px; ">

```js
display(fig_left);
```
  </div>
  <div class="card" style="max-width: 700px; ">

```js
display(fig_right);
```

  </div>
</div>


<div class="tip" label="Aufgabe">
 <i class="fas fa-pencil-alt"></i>
  Die Bank entscheidet sich, deine "optimale" Entscheidungsgrenze aus der vorherigen Aufgabe für beide Personengruppen zu verwenden. 
<ol type="a">
  <li>Finde möglichst viele Kritikpunkte an diesem Modell.</li>
  <li>Argumentiere aus Sicht der Bank, wieso das ein gutes Modell ist.</li>
</ol>
</div>



