---
title: "${texts[lang].title}"
style: css/custom.css
---

```js
const lang = "en";
const texts = FileAttachment("translations/text_05.json").json();
const data = FileAttachment("data/user/distribution.csv").csv({
    typed: true
});
const fixedThreshAlt = 70;
```

# ${texts[lang].heading}

${texts[lang].description}

```js
display(
    Plot.plot({
        height: 500,
        width: 1000,
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
                    fillOpacity: d => (d.score < fixedThreshAlt ? 0.3 : 1)
                })
            ),
            Plot.ruleY([0]),
            Plot.ruleX([fixedThreshAlt - 0.5])
        ]
    })
);
```

```js
const groupedData = data.reduce((acc, item) => {
    const type = item.type;
    const score = item.score;
    if (!acc[type]) {
        acc[type] = {
            belowThreshAlt: 0,
            aboveThreshAlt: 0
        };
    }
    if (score < fixedThreshAlt) {
        acc[type].belowThreshAlt += 1;
    } else {
        acc[type].aboveThreshAlt += 1;
    }
    return acc;
}, {});
```

## ${texts[lang].confusionMatrixHeading}

${texts[lang].confusionMatrixDescription}

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>${texts[lang].predictedPaidLabel}</th>
                <th>${texts[lang].predictedNotPaidLabel}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>${texts[lang].actualPaidLabel}</th>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['aboveThreshAlt']}
                </td>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['belowThreshAlt']}
                </td>
            </tr>
            <tr>
                <th>${texts[lang].actualNotPaidLabel}</th>
                <td contenteditable="false">
                    ${groupedData['Zahlt nicht zurück']['aboveThreshAlt']}
                </td>
                <td contenteditable="false">
                    ${groupedData['Zahlt nicht zurück']['belowThreshAlt']}
                </td>
            </tr>
            <tr></tr>
        </tbody>
    </table>
</div>
```

## ${texts[lang].evaluationHeading}

${texts[lang].evaluationDescription}

<ul>
  ${texts[lang].metrics.map(metric => `<li>${metric}</li>` ).join('')}
</ul>

<div class="tip" label="${texts[lang].task}">
${texts[lang].evaluationTask}
</div>

```html
<div class="table-container">
  <table>

    <thead>
      <tr>
        <th>${texts[lang].evaluationTableHeaders.accuracy}</th>
        <th>${texts[lang].evaluationTableHeaders.positiveRate}</th>
        <th>${texts[lang].evaluationTableHeaders.truePositiveRate}</th>
        <th>${texts[lang].evaluationTableHeaders.profit}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
      </tr>
    </tbody>

  </table>
</div>
