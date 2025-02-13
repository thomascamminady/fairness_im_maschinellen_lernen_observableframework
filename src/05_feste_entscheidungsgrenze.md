---
title: Feste Entscheidungsgrenze
style: css/custom.css
---

# Feste Entscheidungsgrenze

```js
const data = FileAttachment("data/user/distribution.csv").csv({
    typed: true
});
const fixedThreshAlt = 70;
```

Ist die Entscheidungsgrenze wirklich gut gewählt? Zur Beantwortung dieser Frage und zur Validierung unseres Kreditvergabesystems, d. h. des Klassifikators, werden wir den Gesamtprofit sowie verschiedene statische Gütemaße nutzen. 

Die Entscheidungsgrenze wurde zunächst fix auf 70 gesetzt. Für alle Personen mit einem Score größergleich 70 gehen wir davon aus, dass sie den Kredit zurückzahlen würden (Vorhersage: zahlt zurück). Für alle Personen mit einem Score unter 70 gehen wir davon aus, dass sie den Kredit nicht zurückzahlen würden (Vorhersage: zahlt nicht zurück). 
Diese Vorhersagen können wir nun mit den tatsächlichen Daten vergleichen (Erinnerung: wir arbeiten mit vergangenen Daten, d.h. es ist bekannt, ob ein Kredit zurückgezahlt wurde oder nicht). 

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
                    fillOpacity: (d) => (d.score < fixedThreshAlt ? 0.3 : 1),
                })
            ),
            Plot.ruleY([0]),
            Plot.ruleX([fixedThreshAlt - 0.5]),
        ],
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

## Die Konfusionsmatrix 

Die Anzahl der richtigen und falschen Vorhersagen für beide Personengruppen (zahlt zurück und zahlt nicht zurück) sind in der folgenden Tabelle dargestellt. Diese Tabelle wird auch als Konfusionsmatrix bezeichnet.

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Vorhersage:<br>Zahlt zurück</th>
                <th>Vorhersage:<br> Zahlt nicht zurück</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Daten:<br>Zahlt zurück</th>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['aboveThreshAlt']}
                </td>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['belowThreshAlt']}
                </td>
            </tr>
            <tr>
                <th>Daten:<br>Zahlt nicht zurück</th>
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

## Bewertung des Entscheidungsmodells

Es gibt verschiedene Gütemaße, die dabei helfen, zu bewerten, wie gut unser Modell geeignet ist. 
Wir nutzen die folgenden Gütemaße:

* <b>Genauigkeit:</b> Anteil der richtigen Klassifikationen an der Gesamtzahl aller Datenpunkte
* <b>Positiv Rate:</b> Anteil der positiven Vorhersagen (Vorhersage: zahlt zurück) an der Gesamtzahl aller Datenpunkte
* <b>Richtig-positiv-Rate:</b> Anteil der richtig positiven Vorhersagen an der Anzahl aller tatsächlich positiven Datenpunkte (Daten: zahlt zurück)
* <b>Gewinn:</b> erzielter Gesamtgewinn der Bank

<div class="tip" label="Aufgabe">
Berechne basierend auf der Kofusionsmatrix die Werte für die folgenden vier Gütemaße. Trage deine Ergebnisse in der Tabelle ein. 
</div>

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
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
            </tr>
        </tbody>
    </table>
</div>
```
