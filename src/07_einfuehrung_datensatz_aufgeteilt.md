---
title: "${texts[lang].title}"
style: css/custom.css
---

```js
const lang = "en";
const texts = FileAttachment("translations/text_07.json").json();
const data = FileAttachment("data/user/distribution.csv").csv({
    typed: true
});
```

# ${texts[lang].heading}

${texts[lang].intro}

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
                sort: "type"
            })
        ),
        Plot.ruleY([0])
    ]
});
display(fig);
```

${texts[lang].applicantClasses}

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
                fillOpacity: d => (d.type == "Zahlt zurück" ? 1 : 0.3)
            })
        ),
        Plot.ruleY([0])
    ]
});
display(fig);
```

${texts[lang].youngDistributionHeading}

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
            data.filter(d => d.age == "Jung"),
            Plot.stackY2({
                x: "score",
                fill: "type",
                sort: "type"
            })
        ),
        Plot.ruleY([0])
    ]
});
display(fig);
```

${texts[lang].youngDistributionDescription}

${texts[lang].oldDistributionHeading}

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
            data.filter(d => d.age == "Alt"),
            Plot.stackY2({
                x: "score",
                fill: "type",
                sort: "type"
            })
        ),
        Plot.ruleY([0])
    ]
});
display(fig);
```

${texts[lang].oldDistributionDescription}

${texts[lang].conclusion}
