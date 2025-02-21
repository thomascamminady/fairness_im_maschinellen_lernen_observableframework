---
title: "${texts[lang].title}"
style: css/custom.css
---

```js
const lang = "en"
const texts = FileAttachment("translations/text_04.json").json();
const data = FileAttachment("data/user/distribution.csv").csv({
    typed: true
});
```

# ${texts[lang].heading}

${texts[lang].description}

<div class="tip" label="${texts[lang].task}">
${texts[lang].tip}
</div>

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
