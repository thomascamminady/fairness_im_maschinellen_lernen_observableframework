---
title: Feste Entscheidungsgrenze
style: css/custom.css
---

# Feste Entscheidungsgrenze

```js
const data = FileAttachment("data/user/distribution.csv").csv({ typed: true });
const fixedThreshold = 70;
```

Ist die Entscheidungsgrenze wirklich gut gewählt? Zur Beantwortung dieser Frage und zur Validierung unseres Kreditvergabesystems, d. h. des Klassifikators, werden wir den Gesamtprofit sowie verschiedene statische Gütemaße nutzen. 

Die Entscheidungsgrenze wurde zunächst fix auf 70 gesetzt. Für alle Personen mit einem Score größergleich 70 gehen wir davon aus, dass sie den Kredit zurückzahlen würden (Vorhersage: zahlt zurück). Für alle Personen mit einem Score unter 70 gehen wir davon aus, dass sie den Kredit nicht zurückzahlen würden (Vorhersage: zahlt nicht zurück). 
Diese Vorhersagen können wir nun mit den tatsächlichen Daten vergleichen (Erinnerung: wir arbeiten mit vergangenen Daten, d.h. es ist bekannt, ob ein Kredit zurückgezahlt wurde oder nicht). 

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
## Bewertung des Entscheidungsmodells
Die Anzahl der richtigen und falschen Vorhersagen für beide Personengruppen (zahlt zurück und zahlt nicht zurück) sind in der folgenden Tabelle dargestellt. Diese Tabelle wird auch als Konfusionsmatrix bezeichnet.


### Die Konfusionsmatrix 

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
                    ${groupedData['Zahlt zurück']['aboveThreshold']}
                </td>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['belowThreshold']}
                </td>
            </tr>
            <tr>
                <th>Daten:<br>Zahlt nicht zurück</th>
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

Es gibt verschiedene Gütemaße, die dabei helfen, zu bewerten, wie gut unser Modell geeignet ist. 
Wir nutzen die folgenden Gütemaße:

- Genauigkeit: Anteil der richtigen Klassifikationen an der Gesamtzahl aller Datenpunkte
- Positiv Rate: Anteil der positiven Vorhersagen (Vorhersage: zahlt zurück) an der Gesamtzahl aller Datenpunkte
- Richtig positiv Rate: Anteil der richtig positiven Vorhersagen an der Anzahl aller tatsächlich positiven Datenpunkte (Daten: zahlt zurück)
- Erzielter Gesamtgewinn der Bank.


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
                <th>Richtig positiv</th>
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
