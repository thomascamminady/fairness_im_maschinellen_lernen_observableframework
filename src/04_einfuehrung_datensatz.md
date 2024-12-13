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
const fig = Plot.plot({
    width: 1000,
    height: 500,
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
});
display(fig);
```
