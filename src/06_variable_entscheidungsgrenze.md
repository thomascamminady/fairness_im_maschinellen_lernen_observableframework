---
title: Variable Entscheidungsgrenze
style: css/custom.css
---

# Variable Entscheidungsgrenze

```js
const data = FileAttachment("data/user/distribution.csv").csv({
    typed: true
});
```

Hier kannst du die Entscheidungsgrenze variieren und die aus deiner Sicht optimale Entscheidungsgrenze festlegen. 

<div class="tip" label="Aufgabe">
Notiere den Wert deiner Entscheidungsgrenze und begründe deine Wahl. 
</div>

Entscheidungsgrenze:

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
                    fillOpacity: (d) => (d.score < threshAlt ? 0.3 : 1),
                })
            ),
            Plot.ruleY([0]),
            Plot.ruleX([threshAlt - 0.5]),
        ],
    })
);
```

Unsere Vorhersage bei einer Entscheidungsgrenze von  ${threshAlt}:

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
    if (score < threshAlt) {
        acc[type].belowThreshAlt += 1;
    } else {
        acc[type].aboveThreshAlt += 1;
    }
    return acc;
}, {});
const n_true_positive = groupedData["Zahlt zurück"]["aboveThreshAlt"];
const n_false_positive = groupedData["Zahlt nicht zurück"]["aboveThreshAlt"];
const n_false_negative = groupedData["Zahlt zurück"]["belowThreshAlt"];
const n_true_negative = groupedData["Zahlt nicht zurück"]["belowThreshAlt"];
const n_total = n_true_positive + n_false_positive + n_false_negative + n_true_negative
const n_total_true = n_true_positive + n_false_negative
const precision = (
    (100 * n_true_positive) /
    (n_true_positive + n_false_positive)
).toFixed(2);
const recall = (
    (100 * n_true_positive) /
    (n_true_positive + n_false_negative)
).toFixed(2);
```

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Vorhersage:<br> zahlt zurück</th>
                <th>Vorhersage:<br> zahlt nicht zurück</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Daten:<br>zahlt zurück</th>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['aboveThreshAlt']}
                </td>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['belowThreshAlt']}
                </td>
            </tr>
            <tr>
                <th>Daten:<br>zahlt nicht zurück</th>
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

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th>Genauigkeit</th>
                <th>Positiv Rate</th>
                <th>Richtig-positiv-Rate</th>
                <th>Gewinn</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="false">${precision}%</td>
                <td contenteditable="false">
                    ${(((n_true_positive+n_false_positive)/n_total)*100).toFixed(0)}%
                </td>
                <td contenteditable="false">${(((n_true_positive)/n_total_true)*100).toFixed(0)}%</td>
                <td contenteditable="false">
                    ${250 * groupedData["Zahlt zurück"]["aboveThreshAlt"] - 1000
                    * groupedData["Zahlt nicht zurück"]["aboveThreshAlt"]}
                </td>
            </tr>
        </tbody>
    </table>
</div>
```
