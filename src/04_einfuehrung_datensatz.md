---
title: Datensatz
style: css/custom.css
---

# Datensatz

```js
const data = FileAttachment("data/user/distribution.csv").csv({ typed: true });
```

So sieht unser datensatz aus.

Manche leute haben einen guten score

manche einen schlechten

manche zahlen

manche nicht

Hier der Plot

```js
display(
    Plot.plot({
        aspectRatio: 1,
        x: { label: "Score" },
        color: { legend: true, scheme: "Paired" },
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
    })
);
```

TODO: Das hier kommt weg. In der Wirklichkeit ist das hier der Datensatz

```js
display(
    Plot.plot({
        aspectRatio: 1,
        x: { label: "Score" },
        color: { legend: true, scheme: "Paired" },
        marks: [
            Plot.dot(
                data,
                Plot.stackY2({
                    x: "score",
                    fill: "type",
                    sort: "type",
                    fy: "age",
                })
            ),
            Plot.ruleY([0]),
        ],
    })
);
```
