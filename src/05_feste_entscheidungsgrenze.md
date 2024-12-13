---
title: Feste Entscheidungsgrenze
style: css/custom.css
---

# Feste Entscheidungsgrenze

```js
const data = FileAttachment("data/user/distribution.csv").csv({ typed: true });
const fixedThreshold = 70;
```

Jetzt setzen wir eine fixe Grenze bei 70

```js
display(
    Plot.plot({
        height: 500,
        width: 1000,
        x: { label: "Score" },
        color: { legend: true, scheme: "Paired" },
        marks: [
            Plot.dot(
                data,
                Plot.stackY2({
                    x: "score",
                    fill: "type",
                    sort: "type",
                    fillOpacity: (d) => (d.score < fixedThreshold ? 0.3 : 1),
                })
            ),
            Plot.ruleY([0]),
            Plot.ruleX([fixedThreshold - 0.5]),
        ],
    })
);
```

Unsere Vorhersage:

```js
const groupedData = data.reduce((acc, item) => {
    const type = item.type;
    const score = item.score;
    if (!acc[type]) {
        acc[type] = { belowThreshold: 0, aboveThreshold: 0 };
    }
    if (score < fixedThreshold) {
        acc[type].belowThreshold += 1;
    } else {
        acc[type].aboveThreshold += 1;
    }
    return acc;
}, {});
```

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Vorhersage: Zahlt zurück</th>
                <th>Vorhersage: Zahlt nicht zurück</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Daten: Zahlt zurück</th>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['aboveThreshold']}
                </td>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['belowThreshold']}
                </td>
            </tr>
            <tr>
                <th>Daten: Zahlt nicht zurück</th>
                <td contenteditable="false">
                    ${groupedData['Zahlt nicht zurück']['aboveThreshold']}
                </td>
                <td contenteditable="false">
                    ${groupedData['Zahlt nicht zurück']['belowThreshold']}
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
                <th>Genauigkeit</th>
                <th>Gewinn</th>
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
```
