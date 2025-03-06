---
title: Datensatz aufgeteilt
style: css/custom.css
---

# Was finden wir wirklich in unseren Daten?

```js
const data = FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});
```

Bisher sind wir davon ausgegangen, dass unser Datensatz aus einer Bevölkerungsgruppe bestand. 
Die Datenpunkte innerhalb dieser Gruppe haben wir nach Zahlungsfähigkeit eingefärbt.

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

Was wir allerdings bisher verschwiegen haben: Unser Datensatz waren zwei Gruppen von Bewerber/innen vertreten. Zum einen haben wir Bewerber der Population grün, zum anderen  Bewerber/innen der Population lila.
Wir können die beiden Verteilungen nun separat betrachten. Hier ist die Verteilung der grünen Bewerber/innen:

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
display(fig);
```

Hier sehen wir 100 Bewerber/innen, die ihren Kredit zurück zahlen würden (mittlerer Kreditscore von 55), sowie 100 Bewerber/innen, die ihren Kredit nicht zurück zahlen würden (mittlerer Kreditscore von 40).

Als nächstes sehen wir die Verteilung der violetten Population.

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
display(fig);
```

Auch hier sehen wir 100 Bewerber/innen, die ihren Kredit zurück zahlen würden, sowie 100 Bewerber/innen, die ihren Kredit nicht zurück zahlen würden. Allerdings liegen die mittleren Kreditscores hier bei 65 (zahlt zurück) und 50 (zahlt nicht zurück).
Wir stellen fest: Obwohl die Wahrscheinlichkeit, dass ein Kredit zurück gezahlt wird, in beiden Gruppen bei 50% liegt, hat die violette Gruppe einen höheren mittleren Kreditscore als die grüne Gruppe.

Wie sollten wir die Entscheidungsgrenze nun wählen, damit sie für beide Personengruppen möglichst fair ist?
