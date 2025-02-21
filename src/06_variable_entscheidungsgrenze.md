---
title: "${texts[lang].title}"
style: css/custom.css
---

```js
const lang = "en";
const texts = FileAttachment("translations/text_06.json").json();
const data = FileAttachment("data/user/distribution.csv").csv({
    typed: true
});
```

# ${texts[lang].heading}

${texts[lang].description}

<div class="tip" label="${texts[lang].task}">
  ${texts[lang].tip}
</div>

${texts[lang].decisionThresholdLabel}

```js
const threshAlt = view(Inputs.range([0, 100], {
    step: 1,
    label: ""
}));
```

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
                    fillOpacity: d => (d.score < threshAlt ? 0.3 : 1)
                })
            ),
            Plot.ruleY([0]),
            Plot.ruleX([threshAlt - 0.5])
        ]
    })
);
```

${texts[lang].ourPrediction}

```js
import {
    calculateMetrics
} from "./js/calculateMetrics.js";
```

```js
const {
    grp: groupedData,
    n_true_positive,
    n_false_positive,
    n_false_negative,
    n_true_negative,
    total: n_total,
    total_positive: n_total_true,
    precision,
    recall,
    positive_rate,
    true_positive_rate,
    gewinn
} = calculateMetrics(data, "", threshAlt);
```

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>${texts[lang].predictedRepays}</th>
                <th>${texts[lang].predictedDoesNotRepay}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>${texts[lang].actualRepays}</th>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['abovethreshold']}
                </td>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['belowthreshold']}
                </td>
            </tr>
            <tr>
                <th>${texts[lang].actualDoesNotRepay}</th>
                <td contenteditable="false">
                    ${groupedData['Zahlt nicht zurück']['abovethreshold']}
                </td>
                <td contenteditable="false">
                    ${groupedData['Zahlt nicht zurück']['belowthreshold']}
                </td>
            </tr>
            <tr></tr>
        </tbody>
    </table>
</div>
```

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
                <td contenteditable="false">${precision}%</td>
                <td contenteditable="false">${positive_rate}%</td>
                <td contenteditable="false">${true_positive_rate}%</td>
                <td contenteditable="false">${gewinn}€</td>
            </tr>
        </tbody>
    </table>

</div>
