---
title: "${texts[lang].title}"
style: css/custom.css
---

```js
const lang = "en"
const texts = FileAttachment("translations/text_03.json").json();
```

# ${texts[lang].heading}

${texts[lang].description}

## ${texts[lang].dataset1.heading}

${texts[lang].dataset1.description}

```js
const names1 = FileAttachment("data/user/random_user_1.csv").csv({
    typed: true
});
const names2 = FileAttachment("data/user/random_user_2.csv").csv({
    typed: true
});
const names3 = FileAttachment("data/user/random_user_3.csv").csv({
    typed: true
});

function createTable(data) {
    return Inputs.table(data, {
        width: {
            name: 200,
            score: 200,
            type: 200
        },
        columns: ["name", "score", "type"],
        header: {
            name: "Name",
            score: "Kreditscore",
            type: "Kreditwürdigkeit"
        },
        align: {
            name: "left",
            score: "left",
            type: "left"
        },
        rows: 10,
        maxWidth: 800,
        multiple: false,
    });
}

function createPlot(data) {
    return Plot.plot({
        height: 200,
        width: 200,
        x: {
            label: "Score"
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
}
```

```js
display(createTable(names1));
```

<div class="tip" label="${texts[lang].task}">
${texts[lang].dataset1Task}
</div>

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>${texts[lang].optionA}</h2>${createPlot(names1)}</div>
  <div class="card" style="max-width: 200px; "><h2>${texts[lang].optionB}</h2>${createPlot(names2)}</div>
  <div class="card" style="max-width: 200px; "><h2>${texts[lang].optionC}</h2>${createPlot(names3)}</div>
</div>

## ${texts[lang].dataset2.heading}

<div class="tip" label="${texts[lang].task}">
${texts[lang].dataset2Task}
</div>

```js
display(createTable(names2));
```

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>${texts[lang].optionA}</h2>${createPlot(names1)}</div>
  <div class="card" style="max-width: 200px; "><h2>${texts[lang].optionB}</h2>${createPlot(names2)}</div>
  <div class="card" style="max-width: 200px; "><h2>${texts[lang].optionC}</h2>${createPlot(names3)}</div>
</div>

## ${texts[lang].dataset3.heading}

<div class="tip" label="${texts[lang].task}">
${texts[lang].dataset3Task}
</div>

```js
display(createTable(names3));
```

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>${texts[lang].optionA}</h2>${createPlot(names1)}</div>
  <div class="card" style="max-width: 200px; "><h2>${texts[lang].optionB}</h2>${createPlot(names2)}</div>
  <div class="card" style="max-width: 200px; "><h2>${texts[lang].optionC}</h2>${createPlot(names3)}</div>
</div>
