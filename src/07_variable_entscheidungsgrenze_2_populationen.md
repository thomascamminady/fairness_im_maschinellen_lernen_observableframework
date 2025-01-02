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
const data = FileAttachment("data/user/distribution.csv").csv({ typed: true });
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
  <div class="card" style="max-width: 700px;">
    <h2>Entscheidungsgrenze Alte Menschen</h2>
    
```js
const threshold_old = view(
    Inputs.range([10, 100], { step: 1, label: "" ,value:70})
);
```

${Plot.plot({
height: 500,
width: 500,
x: { label: "Score" },
color: { legend: true },
marks: [
Plot.dot(
data,
Plot.stackY2({
x: "score",
fill: (d) => scale1(d.type),
sort: "type",
fillOpacity: (d) => (d.score < threshold_old ? 0.3 : 1),
})
),
Plot.ruleY([0]),
Plot.ruleX([threshold_old - 0.5]),
],
})}

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
        if (score < threshold_old) {
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
                <th>Vorhersage:<br>zahlt zurück</th>
                <th>Vorhersage:<br>zahlt nicht zurück</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Daten:<br>zahlt zurück</th>
                <td contenteditable="false">
                    ${grp_old['Zahlt zurück']['aboveThreshold']}
                </td>
                <td contenteditable="false">
                    ${grp_old['Zahlt zurück']['belowThreshold']}
                </td>
            </tr>
            <tr>
                <th>Daten:<br>zahlt nicht zurück</th>
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



```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th>Genauigkeit</th>
                <th>Positiv Rate</th>
                <th>Richtig positiv</th>
                <th>Gewinn</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="false">${precision_old}%</td>
                <td contenteditable="false">
                    ${n_true_positive_old+n_false_positive_old}
                </td>
                <td contenteditable="false">${n_true_positive_old}</td>
                <td contenteditable="false">
                    ${200 * grp_old["Zahlt zurück"]["aboveThreshold"] - 1000 *
                    grp_old["Zahlt nicht zurück"]["aboveThreshold"]}
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

</div>

  <div class="card" style="max-width: 500px;">
    <h2>Entscheidungsgrenze Junge Menschen</h2>

```js
const threshold_young = view(
    Inputs.range([10, 100], { step: 1, label: "",value:70 })
);
```

${Plot.plot({
height: 500,
width: 500,
x: { label: "Score" },
color: { legend: true },
marks: [
Plot.dot(
data,
Plot.stackY2({
x: "score",
fill: (d) => scale2(d.type),
sort: "type",
fillOpacity: (d) => (d.score < threshold_young ? 0.3 : 1),
})
),
Plot.ruleY([0]),
Plot.ruleX([threshold_young - 0.5]),
],
})}

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
        if (score < threshold_young) {
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
                <th>Vorhersage:<br>zahlt zurück</th>
                <th>Vorhersage:<br>zahlt nicht zurück</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Daten:<br>zahlt zurück</th>
                <td contenteditable="false">
                    ${grp_young['Zahlt zurück']['aboveThreshold']}
                </td>
                <td contenteditable="false">
                    ${grp_young['Zahlt zurück']['belowThreshold']}
                </td>
            </tr>
            <tr>
                <th>Daten:<br>zahlt nicht zurück</th>
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



```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th>Genauigkeit</th>
                <th>Positiv Rate</th>
                <th>Richtig positiv</th>
                <th>Gewinn</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="false">${precision_young}%</td>
                <td contenteditable="false">
                    ${n_true_positive_young+n_false_positive_young}
                </td>
                <td contenteditable="false">${n_true_positive_young}</td>
                <td contenteditable="false">
                    ${200 * grp_young["Zahlt zurück"]["aboveThreshold"] - 1000 *
                    grp_young["Zahlt nicht zurück"]["aboveThreshold"]}
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

  </div>
</div>
