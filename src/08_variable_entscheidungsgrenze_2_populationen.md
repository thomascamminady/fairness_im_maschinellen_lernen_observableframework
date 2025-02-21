---
title: "${texts[lang].title}"
style: css/custom.css
---

```js
import {
    calculateMetrics
} from "./js/calculateMetrics.js";
```

# ${texts[lang].heading}

${texts[lang].explanation}

${texts[lang].explanation2}

<div class="tip" label="${texts[lang].task}">
  ${texts[lang].tip}
</div>

```js
const data = FileAttachment("data/user/distribution.csv").csv({
    typed: true
});
```

```js
const connected = view(Inputs.radio(texts[lang].radioOptions, {
    label: texts[lang].youngRadioLabel,
    value: texts[lang].radioDefault
}));
```

<div class="grid grid-cols-2">
  <div class="card" style="max-width: 700px; ">

<h2>${texts[lang].altHeading}</h2>

```js
const threshold_Alt = view(
    Inputs.range([10, 100], {
        step: 1,
        label: "",
        value: 70
    })
);
```

```js
// Compute metrics for "Alt" group first
const {
    grp: grp_Alt,
    n_true_positive: n_true_positive_Alt,
    n_false_positive: n_false_positive_Alt,
    n_false_negative: n_false_negative_Alt,
    n_true_negative: n_true_negative_Alt,
    total: total_Alt,
    total_positive: total_positive_Alt,
    precision: precision_Alt,
    recall: recall_Alt,
    positive_rate: positive_rate_Alt,
    true_positive_rate: true_positive_rate_Alt,
    gewinn: gewinn_Alt
} = calculateMetrics(data, "Alt", threshold_Alt);
```

```js
Plot.plot({
    height: 500,
    width: 500,
    style: {
        fontSize: 16
    },
    x: {
        label: "Score",
        domain: [15, 89]
    },
    y: {
        domain: [0, 47]
    },
    color: {
        legend: true,
        domain: ["Zahlt zurück", "Zahlt nicht zurück"],
        range: ["#6a3d9a", "#cab2d6"]
    },
    opacity: {
        legend: true
    },
    marks: [
        Plot.dot(
            data.filter((d) => d.age === "Alt"),
            Plot.stackY2({
                x: "score",
                fill: "type",
                sort: "type",
                fillOpacity: (d) => (d.score < threshold_Alt ? 0.3 : 1)
            })
        ),
        Plot.ruleY([0]),
        Plot.ruleX([threshold_Alt - 0.5])
    ]
})
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
                    ${grp_Alt['Zahlt zurück']['abovethreshold']}
                </td>
                <td contenteditable="false">
                    ${grp_Alt['Zahlt zurück']['belowthreshold']}
                </td>
            </tr>
            <tr>
                <th>${texts[lang].actualDoesNotRepay}</th>
                <td contenteditable="false">
                    ${grp_Alt['Zahlt nicht zurück']['abovethreshold']}
                </td>
                <td contenteditable="false">
                    ${grp_Alt['Zahlt nicht zurück']['belowthreshold']}
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
                <td contenteditable="false">${precision_Alt}%</td>
                <td contenteditable="false">${positive_rate_Alt}%</td>
                <td contenteditable="false">${true_positive_rate_Alt}%</td>
                <td contenteditable="false">${gewinn_Alt}€</td>
            </tr>
        </tbody>
    </table>
</div>

</div>

<div class="card" style="max-width: 500px; ">

    <h2>${texts[lang].jungHeading}</h2>

    ```js
    // Determine threshold for "Jung"
    let value = 70;
    if (connected === texts[lang].radioSame) {
    value = threshold_Alt;
    } else if (connected === texts[lang].radioSimilarTPR) {
    // Reference value from "Alt" group
    const ref = true_positive_rate_Alt;
    let bestThreshold = 0;
    let minDiff = Infinity;
    for (let t = 0; t <= 100; t++) { const { true_positive_rate }=calculateMetrics(data, "Jung" , t); const diff=Math.abs(true_positive_rate - ref); if (diff < minDiff) { minDiff=diff; bestThreshold=t; } } value=bestThreshold; } else if (connected===texts[lang].radioSimilarPR) { // Reference value from "Alt" group const ref=positive_rate_Alt; let bestThreshold=0; let minDiff=Infinity; for (let t=0; t <=100; t++) { const { positive_rate }=calculateMetrics(data, "Jung" , t); const diff=Math.abs(positive_rate - ref); if (diff < minDiff) { minDiff=diff; bestThreshold=t; } } value=bestThreshold; } const threshold_Jung=view( Inputs.range([10, 100], { step: 1, label: "" , value: value }) );
```

```js
// Compute metrics for "Jung" using the determined threshold
const {
    grp: grp_Jung,
    n_true_positive: n_true_positive_Jung,
    n_false_positive: n_false_positive_Jung,
    n_false_negative: n_false_negative_Jung,
    n_true_negative: n_true_negative_Jung,
    total: total_Jung,
    total_positive: total_positive_Jung,
    precision: precision_Jung,
    recall: recall_Jung,
    positive_rate: positive_rate_Jung,
    true_positive_rate: true_positive_rate_Jung,
    gewinn: gewinn_Jung
} = calculateMetrics(data, "Jung", threshold_Jung);
```

```js
Plot.plot({
    height: 500,
    width: 500,
    style: {
        fontSize: 16
    },
    x: {
        label: "Score",
        domain: [15, 89]
    },
    y: {
        domain: [0, 47]
    },
    color: {
        legend: true,
        domain: ["Zahlt zurück", "Zahlt nicht zurück"],
        range: ["#33a02c", "#b2df8a"]
    },
    marks: [
        Plot.dot(
            data.filter((d) => d.age === "Jung"),
            Plot.stackY2({
                x: "score",
                fill: "type",
                sort: "type",
                fillOpacity: d => (d.score < threshold_Jung ? 0.3 : 1)
            })
        ),
        Plot.ruleY([0]),
        Plot.ruleX([threshold_Jung - 0.5])
    ]
})
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
                    ${grp_Jung['Zahlt zurück']['abovethreshold']}
                </td>
                <td contenteditable="false">
                    ${grp_Jung['Zahlt zurück']['belowthreshold']}
                </td>
            </tr>
            <tr>
                <th>${texts[lang].actualDoesNotRepay}</th>
                <td contenteditable="false">
                    ${grp_Jung['Zahlt nicht zurück']['abovethreshold']}
                </td>
                <td contenteditable="false">
                    ${grp_Jung['Zahlt nicht zurück']['belowthreshold']}
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
                <td contenteditable="false">${precision_Jung}%</td>
                <td contenteditable="false">${positive_rate_Jung}%</td>
                <td contenteditable="false">${true_positive_rate_Jung}%</td>
                <td contenteditable="false">${gewinn_Jung}€</td>
            </tr>
        </tbody>
    </table>
</div>
```

  </div>
</div>

${texts[lang].conclusion} ${gewinn_Alt + gewinn_Jung}€
