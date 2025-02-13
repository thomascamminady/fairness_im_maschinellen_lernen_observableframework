---
title: Datensatz aufgeteilt 
style: css/custom.css
---

# Was finden wir wirklich in unseren Daten?

```js
const data = FileAttachment("data/user/distribution.csv").csv({
    typed: true
});
```

Bisher haben wir unseren Datensatz eingefärbt basierend auf der Frage, ob eine Person den beantragten Kredit zurückzahlen wird.

```js
const fig = Plot.plot({
    width: 1000,
    height: 500,
    style: {
        fontSize: 18
    },
    x: {
        label: "Score",
        domain: [0, 99]
    },
    color: {
        legend: true,
        scheme: "Paired"
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

Was wir allerdings verschwiegen haben: In unserem Datensatz waren zwei diskrete Klassen von Bewerben vertreten. Zum einen haben wir Bewerber im jungen Alter (grün), zum anderen sehen wir Bewerber im hohen Alter (lila).

```js
const fig = Plot.plot({
    width: 1000,
    height: 500,
    style: {
        fontSize: 18
    },

    x: {
        label: "Score",
        domain: [0, 99]
    },
    color: {
        legend: true,
        domain: ["Jung", "Alt"],
        range: ["#33a02c", "#6a3d9a"]
    },
    marks: [
        Plot.dot(
            data,
            Plot.stackY2({
                x: "score",
                fill: "age",
                sort: "type",
                fillOpacity: (d) => (d.type == "Zahlt zurück" ? 1 : 0.3),

            })
        ),
        Plot.ruleY([0]),
    ],
});
display(fig);
```

Wir können die beiden Verteilungen auch separat betrachten. Hier ist die Verteilung der jungen Bewerber.

```js
const fig = Plot.plot({
    width: 1000,
    height: 250,
    style: {
        fontSize: 18
    },

    x: {
        label: "Score",
        domain: [0, 99]
    },

    color: {
        legend: true,
        domain: ["Zahlt zurück", "Zahlt nicht zurück"],
        range: ["#33a02c", "#b2df8a"]
    },
    marks: [
        Plot.dot(
            data.filter((d) => d.age == "Jung"),
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

Und hier sehen wir die Verteilung der alten Bewerber.

```js
const fig = Plot.plot({
    width: 1000,
    height: 250,
    style: {
        fontSize: 18
    },

    x: {
        label: "Score",
        domain: [0, 99]
    },

    color: {
        legend: true,
        domain: ["Zahlt zurück", "Zahlt nicht zurück"],
        range: ["#6a3d9a", "#cab2d6"]

    },
    marks: [
        Plot.dot(
            data.filter((d) => d.age == "Alt"),
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
