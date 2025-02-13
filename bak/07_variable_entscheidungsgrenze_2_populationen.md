---
title: Variable Entscheidungsgrenze, zwei Populationen
style: css/custom.css
---

# Variable Entscheidungsgrenze, zwei Populationen

Haha, gotcha, this was actually two populations

```js
const data = FileAttachment("data/user/distribution.csv").csv({
    typed: true
});
```

```js
const threshAlt_Alt = view(
    Inputs.range([10, 100], {
        step: 1,
        label: "Cutoff Alt:"
    })
);
const threshAlt_Jung = view(
    Inputs.range([10, 100], {
        step: 1,
        label: "Cutoff Jung:"
    })
);
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
        height: 500,
        width: 1000,
        x: {
            label: "Score"
        },
        color: {
            legend: true
        },
        marks: [
            Plot.dot(
                data,
                Plot.stackY2({
                    x: "score",
                    fill: (d) => scale1(d.type),
                    sort: "type",
                    fillOpacity: (d) => (d.score < threshAlt_Alt ? 0.3 : 1),
                })
            ),
            Plot.ruleY([0]),
            Plot.ruleX([threshAlt_Alt - 0.5]),
        ],
    })
);

display(
    Plot.plot({
        height: 500,
        width: 1000,
        x: {
            label: "Score"
        },
        color: {
            legend: true
        },
        marks: [
            Plot.dot(
                data,
                Plot.stackY2({
                    x: "score",
                    fill: (d) => scale2(d.type),
                    sort: "type",
                    fillOpacity: (d) => (d.score < threshAlt_Jung ? 0.3 : 1),
                })
            ),
            Plot.ruleY([0]),
            Plot.ruleX([threshAlt_Jung - 0.5]),
        ],
    })
);
```

## Für alt

Unsere Vorhersage:

```js
const grp_Alt = data
    .filter((d) => d.age === "Alt")
    .reduce((acc, item) => {
        const type = item.type;
        const score = item.score;
        if (!acc[type]) {
            acc[type] = {
                belowThreshAlt: 0,
                aboveThreshAlt: 0
            };
        }
        if (score < threshAlt_Alt) {
            acc[type].belowThreshAlt += 1;
        } else {
            acc[type].aboveThreshAlt += 1;
        }
        return acc;
    }, {});
const n_true_positive_Alt = grp_Alt["Zahlt zurück"]["aboveThreshAlt"];
const n_false_positive_Alt = grp_Alt["Zahlt nicht zurück"]["aboveThreshAlt"];
const n_false_negative_Alt = grp_Alt["Zahlt zurück"]["belowThreshAlt"];
const n_true_negative_Alt = grp_Alt["Zahlt nicht zurück"]["belowThreshAlt"];

const precision_Alt = (
    (100 * n_true_positive_Alt) /
    (n_true_positive_Alt + n_false_positive_Alt)
).toFixed(2);
const recall_Alt = (
    (100 * n_true_positive_Alt) /
    (n_true_positive_Alt + n_false_negative_Alt)
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
                    ${grp_Alt['Zahlt zurück']['aboveThreshAlt']}
                </td>
                <td contenteditable="false">
                    ${grp_Alt['Zahlt zurück']['belowThreshAlt']}
                </td>
            </tr>
            <tr>
                <th>Daten: zahlt nicht zurück</th>
                <td contenteditable="false">
                    ${grp_Alt['Zahlt nicht zurück']['aboveThreshAlt']}
                </td>
                <td contenteditable="false">
                    ${grp_Alt['Zahlt nicht zurück']['belowThreshAlt']}
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
                <td contenteditable="false">n=${n_true_positive_Alt}</td>
                <td contenteditable="false">
                    n= ${n_true_positive_Alt+n_false_positive_Alt}
                </td>
                <td contenteditable="false">${precision_Alt}%</td>
                <td contenteditable="false">${recall_Alt}%</td>
                <td contenteditable="false">
                    ${100 * grp_Alt["Zahlt zurück"]["aboveThreshAlt"] - 1000 *
                    grp_Alt["Zahlt nicht zurück"]["aboveThreshAlt"]}
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

## Für jung

Unsere Vorhersage:

```js
const grp_Jung = data
    .filter((d) => d.age === "Jung")
    .reduce((acc, item) => {
        const type = item.type;
        const score = item.score;
        if (!acc[type]) {
            acc[type] = {
                belowThreshAlt: 0,
                aboveThreshAlt: 0
            };
        }
        if (score < threshAlt_Jung) {
            acc[type].belowThreshAlt += 1;
        } else {
            acc[type].aboveThreshAlt += 1;
        }
        return acc;
    }, {});
const n_true_positive_Jung = grp_Jung["Zahlt zurück"]["aboveThreshAlt"];
const n_false_positive_Jung =
    grp_Jung["Zahlt nicht zurück"]["aboveThreshAlt"];
const n_false_negative_Jung = grp_Jung["Zahlt zurück"]["belowThreshAlt"];
const n_true_negative_Jung = grp_Jung["Zahlt nicht zurück"]["belowThreshAlt"];

const precision_Jung = (
    (100 * n_true_positive_Jung) /
    (n_true_positive_Jung + n_false_positive_Jung)
).toFixed(2);
const recall_Jung = (
    (100 * n_true_positive_Jung) /
    (n_true_positive_Jung + n_false_negative_Jung)
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
                    ${grp_Jung['Zahlt zurück']['aboveThreshAlt']}
                </td>
                <td contenteditable="false">
                    ${grp_Jung['Zahlt zurück']['belowThreshAlt']}
                </td>
            </tr>
            <tr>
                <th>Daten: zahlt nicht zurück</th>
                <td contenteditable="false">
                    ${grp_Jung['Zahlt nicht zurück']['aboveThreshAlt']}
                </td>
                <td contenteditable="false">
                    ${grp_Jung['Zahlt nicht zurück']['belowThreshAlt']}
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
                <td contenteditable="false">n=${n_true_positive_Jung}</td>
                <td contenteditable="false">
                    n= ${n_true_positive_Jung+n_false_positive_Jung}
                </td>
                <td contenteditable="false">${precision_Jung}%</td>
                <td contenteditable="false">${recall_Jung}%</td>
                <td contenteditable="false">
                    ${100 * grp_Jung["Zahlt zurück"]["aboveThreshAlt"] - 1000 *
                    grp_Jung["Zahlt nicht zurück"]["aboveThreshAlt"]}
                </td>
            </tr>
        </tbody>
    </table>
</div>
```
