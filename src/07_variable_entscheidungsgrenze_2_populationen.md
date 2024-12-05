---
title: Variable Entscheidungsgrenze, zwei Populationen
style: css/custom.css
---

# Variable Entscheidungsgrenze, zwei Populationen

Haha, gotcha, this was actually two populations

```js
const data = FileAttachment("data/user/distribution.csv").csv({ typed: true });
```

```js
const threshold = view(Inputs.range([10, 100], { step: 1, label: "Cutoff:" }));
```

```js
const scale1 = d3.scaleOrdinal(
    ["Zahlt zurück", "Zahlt nicht zurück"],
    ["#6a3d9a", "#cab2d6"]
); // outside of Plot
const scale2 = d3.scaleOrdinal(
    ["Zahlt zurück", "Zahlt nicht zurück"],
    ["#33a02c", "#b2df8a"]
);
display(
    Plot.plot({
        height: 800,
        width: 1000,
        x: { label: "Score" },
        color: { legend: true, scheme: "Paired" },
        marks: [
            Plot.dot(
                data,
                Plot.stackY2({
                    x: "score",
                    fill: (d) =>
                        d.age === "young" ? scale1(d.type) : scale2(d.type),
                    sort: "type",
                    fy: "age",
                    fillOpacity: (d) => (d.score < threshold ? 0.3 : 1),
                })
            ),
            Plot.ruleY([0]),
            Plot.ruleX([threshold - 0.5]),
        ],
    })
);
```

## Für alt

Unsere Vorhersage:

```js
const grp_old = data
    .filter((d) => d.age === "old")
    .reduce((acc, item) => {
        const type = item.type;
        const score = item.score;
        if (!acc[type]) {
            acc[type] = { belowThreshold: 0, aboveThreshold: 0 };
        }
        if (score < threshold) {
            acc[type].belowThreshold += 1;
        } else {
            acc[type].aboveThreshold += 1;
        }
        return acc;
    }, {});
const n_true_positive_old = grp_old["Zahlt zurück"]["aboveThreshold"];
const n_false_positive_old = grp_old["Zahlt nicht zurück"]["aboveThreshold"];
const n_false_negative_old = grp_old["Zahlt zurück"]["belowThreshold"];
const n_true_negative_old = grp_old["Zahlt nicht zurück"]["belowThreshold"];

const precision_old = (
    (100 * n_true_positive_old) /
    (n_true_positive_old + n_false_positive_old)
).toFixed(2);
const recall_old = (
    (100 * n_true_positive_old) /
    (n_true_positive_old + n_false_negative_old)
).toFixed(2);
```

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Vorhersage: zahlt zurück</th>
                <th>Vorhersage: zahlt nicht zurück</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Daten: zahlt zurück</th>
                <td contenteditable="false">
                    ${grp_old['Zahlt zurück']['aboveThreshold']}
                </td>
                <td contenteditable="false">
                    ${grp_old['Zahlt zurück']['belowThreshold']}
                </td>
            </tr>
            <tr>
                <th>Daten: zahlt nicht zurück</th>
                <td contenteditable="false">
                    ${grp_old['Zahlt nicht zurück']['aboveThreshold']}
                </td>
                <td contenteditable="false">
                    ${grp_old['Zahlt nicht zurück']['belowThreshold']}
                </td>
            </tr>
            <tr></tr>
        </tbody>
    </table>
</div>
```

Bla Bla, true positive ist das, positive ist das Genauigkeit ist das,
Lohn war das, default ist das, ...
Fülle jetzt aus:

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th>True positive Rate</th>
                <th>Positive Rate</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>Gewinn</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="false">n=${n_true_positive_old}</td>
                <td contenteditable="false">
                    n= ${n_true_positive_old+n_false_positive_old}
                </td>
                <td contenteditable="false">${precision_old}%</td>
                <td contenteditable="false">${recall_old}%</td>
                <td contenteditable="false">
                    ${100 * grp_old["Zahlt zurück"]["aboveThreshold"] - 1000 *
                    grp_old["Zahlt nicht zurück"]["aboveThreshold"]}
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

## Für jung

Unsere Vorhersage:

```js
const grp_young = data
    .filter((d) => d.age === "young")
    .reduce((acc, item) => {
        const type = item.type;
        const score = item.score;
        if (!acc[type]) {
            acc[type] = { belowThreshold: 0, aboveThreshold: 0 };
        }
        if (score < threshold) {
            acc[type].belowThreshold += 1;
        } else {
            acc[type].aboveThreshold += 1;
        }
        return acc;
    }, {});
const n_true_positive_young = grp_young["Zahlt zurück"]["aboveThreshold"];
const n_false_positive_young =
    grp_young["Zahlt nicht zurück"]["aboveThreshold"];
const n_false_negative_young = grp_young["Zahlt zurück"]["belowThreshold"];
const n_true_negative_young = grp_young["Zahlt nicht zurück"]["belowThreshold"];

const precision_young = (
    (100 * n_true_positive_young) /
    (n_true_positive_young + n_false_positive_young)
).toFixed(2);
const recall_young = (
    (100 * n_true_positive_young) /
    (n_true_positive_young + n_false_negative_young)
).toFixed(2);
```

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Vorhersage: zahlt zurück</th>
                <th>Vorhersage: zahlt nicht zurück</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Daten: zahlt zurück</th>
                <td contenteditable="false">
                    ${grp_young['Zahlt zurück']['aboveThreshold']}
                </td>
                <td contenteditable="false">
                    ${grp_young['Zahlt zurück']['belowThreshold']}
                </td>
            </tr>
            <tr>
                <th>Daten: zahlt nicht zurück</th>
                <td contenteditable="false">
                    ${grp_young['Zahlt nicht zurück']['aboveThreshold']}
                </td>
                <td contenteditable="false">
                    ${grp_young['Zahlt nicht zurück']['belowThreshold']}
                </td>
            </tr>
            <tr></tr>
        </tbody>
    </table>
</div>
```

Bla Bla, true positive ist das, positive ist das Genauigkeit ist das,
Lohn war das, default ist das, ...
Fülle jetzt aus:

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th>True positive Rate</th>
                <th>Positive Rate</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>Gewinn</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="false">n=${n_true_positive_young}</td>
                <td contenteditable="false">
                    n= ${n_true_positive_young+n_false_positive_young}
                </td>
                <td contenteditable="false">${precision_young}%</td>
                <td contenteditable="false">${recall_young}%</td>
                <td contenteditable="false">
                    ${100 * grp_young["Zahlt zurück"]["aboveThreshold"] - 1000 *
                    grp_young["Zahlt nicht zurück"]["aboveThreshold"]}
                </td>
            </tr>
        </tbody>
    </table>
</div>
```
