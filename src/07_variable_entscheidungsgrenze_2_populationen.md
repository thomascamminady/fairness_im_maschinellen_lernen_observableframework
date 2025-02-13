---
title: Variable Entscheidungsgrenze, zwei Personengruppen
style: css/custom.css
---

# Variable Entscheidungsgrenzen für zwei Personengruppen

Der bisher verwendete Datensatz besteht aus den Daten von zwei Personengruppen. Der Personengruppe alt (älter als 30 Jahre) und der Gruppe jung (jünger als 30 Jahre). 

In den folgenden beiden Histogrammen werden die Daten der beiden Personengruppen getrennt dargestellt. Die Bank kann für beide Personengruppen unterschiedliche Entscheidungsgrenzen wählen – muss sie aber nicht.

<div class="tip" label="Aufgabe">
Diskutiert in Gruppen, wie ihr die beiden Entscheidungsgrenzen wählen würdet, sodass sie aus eurer Sicht möglichst fair sind. Notiert die Werte für eure Entscheidungsgrenzen und begründet eure Wahl. Beschreibt zudem, was ihr unter “fair” versteht. 
</div>

```js
const data = FileAttachment("data/user/distribution.csv").csv({
    typed: true
});
const scale1 = d3.scaleOrdinal(
    ["Zahlt zurück", "Zahlt nicht zurück"],
    ["#6a3d9a", "#cab2d6"]
); // outside of Plot
const scale2 = d3.scaleOrdinal(
    ["Zahlt zurück", "Zahlt nicht zurück"],
    ["#33a02c", "#b2df8a"]
);
```

<div class="grid grid-cols-2">
  <div class="card" style="max-width: 700px; ">

<h2>Entscheidungsgrenze Alte Menschen</h2>

    

```js
const threshAlt_Alt = view(
    Inputs.range([10, 100], {
        step: 1,
        label: "",
        value: 70
    })
);
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
        legend: true
    },
    opacity: {
        legend: true
    },
    marks: [
        Plot.dot(
            data.filter((d) => d.age === "Alt"),
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
```

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
const total_Alt = n_true_positive_Alt + n_false_positive_Alt + n_false_negative_Alt + n_true_negative_Alt;
const total_positive_Alt = n_true_positive_Alt + n_false_negative_Alt;
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
                <th>Vorhersage:<br>zahlt zurück</th>
                <th>Vorhersage:<br>zahlt nicht zurück</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Daten:<br>zahlt zurück</th>
                <td contenteditable="false">
                    ${grp_Alt['Zahlt zurück']['aboveThreshAlt']}
                </td>
                <td contenteditable="false">
                    ${grp_Alt['Zahlt zurück']['belowThreshAlt']}
                </td>
            </tr>
            <tr>
                <th>Daten:<br>zahlt nicht zurück</th>
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
                <td contenteditable="false">${precision_Alt}%</td>
                <td contenteditable="false">
                    ${( ((n_true_positive_Alt + n_false_positive_Alt) / total_Alt).toFixed(3) )}
                </td>
                <td contenteditable="false">${(n_true_positive_Alt/total_positive_Alt).toFixed(3)}</td>
                <td contenteditable="false">
                    ${250 * grp_Alt["Zahlt zurück"]["aboveThreshAlt"] - 1000 *
                    grp_Alt["Zahlt nicht zurück"]["aboveThreshAlt"]}
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

</div>

  <div class="card" style="max-width: 500px; ">

<h2>Entscheidungsgrenze Junge Menschen</h2>

```js
const threshAlt_Jung = view(
    Inputs.range([10, 100], {
        step: 1,
        label: "",
        value: 70
    })
);
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
        legend: true
    },
    marks: [
        Plot.dot(
            data.filter((d) => d.age === "Jung"),
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
```

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

const total_Jung = n_true_positive_Jung + n_false_positive_Jung + n_false_negative_Jung + n_true_negative_Jung;
const total_positive_Jung = n_true_positive_Jung + n_false_negative_Jung;

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
                <th>Vorhersage:<br>zahlt zurück</th>
                <th>Vorhersage:<br>zahlt nicht zurück</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Daten:<br>zahlt zurück</th>
                <td contenteditable="false">
                    ${grp_Jung['Zahlt zurück']['aboveThreshAlt']}
                </td>
                <td contenteditable="false">
                    ${grp_Jung['Zahlt zurück']['belowThreshAlt']}
                </td>
            </tr>
            <tr>
                <th>Daten:<br>zahlt nicht zurück</th>
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
                <td contenteditable="false">${precision_Jung}%</td>
                <td contenteditable="false">
                    ${( ((n_true_positive_Jung + n_false_positive_Jung) / total_Jung).toFixed(3) )}
                </td>
                <td contenteditable="false">${(n_true_positive_Jung/total_positive_Jung).toFixed(3)}</td>
                <td contenteditable="false">
                    ${250 * grp_Jung["Zahlt zurück"]["aboveThreshAlt"] - 1000 *
                    grp_Jung["Zahlt nicht zurück"]["aboveThreshAlt"]}
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

  </div>
</div>
