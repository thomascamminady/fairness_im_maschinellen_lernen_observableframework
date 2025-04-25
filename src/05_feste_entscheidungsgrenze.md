---
title: Statistische Gütemaße
style: css/custom.css
---

# Statistische Gütemaße

## Ist die Entscheidungsgrenze wirklich gut gewählt?

```js
const data = await FileAttachment("data/user/distribution.csv").csv({
    typed: true,
});
const fixedThreshAlt = 70;

// Calculate grouped data for the confusion matrix
const groupedData = data.reduce((acc, item) => {
    const type = item.type;
    const score = item.score;
    if (!acc[type]) {
        acc[type] = {
            belowThreshAlt: 0,
            aboveThreshAlt: 0,
        };
    }
    if (score < fixedThreshAlt) {
        acc[type].belowThreshAlt += 1;
    } else {
        acc[type].aboveThreshAlt += 1;
    }
    return acc;
}, {});

// Calculate metrics for the validation
const TP = groupedData["Zahlt zurück"].aboveThreshAlt;
const FN = groupedData["Zahlt zurück"].belowThreshAlt;
const FP = groupedData["Zahlt nicht zurück"].aboveThreshAlt;
const TN = groupedData["Zahlt nicht zurück"].belowThreshAlt;

const totalPersons = TP + FN + FP + TN;
const totalCreditReceived = TP + FP;
const nonPayingWithCredit = FP;

// Calculate metrics
const accuracy = Math.round(((TP + TN) / totalPersons) * 100);
const positiveRate = Math.round((totalCreditReceived / totalPersons) * 100);
const truePositiveRate = Math.round((TP / (TP + FN)) * 100);
const profit = TP * 300 - FP * 700;

// Calculate percentages for other questions
const percentCapablePaying = Math.round((TP / (TP + FN)) * 100);
const percentTotalCredit = Math.round(
    (totalCreditReceived / totalPersons) * 100
);
```

Zur Beantwortung dieser Frage und zur Validierung des Kreditvergabesystems werden wir den Gesamtprofit sowie verschiedene statische Gütemaße nutzen.

Die Entscheidungsgrenze nutzen wir zur Vorhersage. Hat eine Person einen Kreditscore größer oder gleich unserer Entscheidungsgrenze, so sagen wir voraus, dass diese Person den Kredit zurückzahlen wird. Bei einem Kreditscore kleiner als unsere Entscheidungsgrenze sagen wir voraus, dass diese Person den Kredit nicht zurückzahlen wird.
Die Entscheidungsgrenze wurde zunächst fest auf 70 gesetzt. Für alle Personen mit einem Score größer oder gleich 70 gehen wir davon aus, dass sie den Kredit zurückzahlen werden (Vorhersage: zahlt zurück). Für alle Personen mit einem Score unter 70 gehen wir davon aus, dass sie den Kredit nicht zurückzahlen werden (Vorhersage: zahlt nicht zurück). Diese Vorhersagen können wir nun mit den vorliegenden Daten vergleichen.

Erinnerung: Wir arbeiten mit Daten von Personen, bei denen bekannt ist, ob sie ihren Kredit in der Vergangenheit zurückgezahlt haben (Daten: zahlt zurück oder Daten: zahlt nicht zurück) und nutzen dies zum Abgleich mit unserer Vorhersage.

```js
display(
    Plot.plot({
        width: 600,
        height: 200,
        style: {
            fontSize: 18,
        },
        x: {
            label: "Score",
            domain: [0, 99],
        },
        color: {
            legend: true,
            scheme: "Paired",
        },
        marks: [
            Plot.dot(
                data,
                Plot.stackY2({
                    x: "score",
                    fill: "type",
                    sort: "type",
                    fillOpacity: (d) => (d.score < fixedThreshAlt ? 0.3 : 1),
                    sort: {
                        value: "type",
                        reverse: false,
                    },
                    reverse: true,
                })
            ),
            Plot.ruleY([0]),
            Plot.ruleX([fixedThreshAlt - 0.5]),
        ],
    })
);
```

## Die Konfusionsmatrix

Die Anzahl der richtigen und falschen Vorhersagen für beide Personengruppen (“zahlt zurück” und “zahlt nicht zurück”) sind in der folgenden Tabelle dargestellt. Diese Tabelle wird auch als Konfusionsmatrix bezeichnet.

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Vorhersage:<br />Zahlt zurück</th>
                <th>
                    Vorhersage:<br />
                    Zahlt nicht zurück
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Daten:<br />Zahlt zurück</th>
                <td
                    contenteditable="false"
                    style="background-color: rgba(0, 128, 0, 0.35); color: black;"
                >
                    ${groupedData['Zahlt zurück']['aboveThreshAlt']}
                </td>
                <td contenteditable="false">
                    ${groupedData['Zahlt zurück']['belowThreshAlt']}
                </td>
            </tr>
            <tr>
                <th>Daten:<br />Zahlt nicht zurück</th>
                <td contenteditable="false">
                    ${groupedData['Zahlt nicht zurück']['aboveThreshAlt']}
                </td>
                <td
                    contenteditable="false"
                    style="background-color: rgba(0, 128, 0, 0.35); color: black;"
                >
                    ${groupedData['Zahlt nicht zurück']['belowThreshAlt']}
                </td>
            </tr>
            <tr></tr>
        </tbody>
    </table>
</div>
```

<div class="tip" label="Aufgabe 1">
Wie viele Personen erhalten bei einer Entscheidungsgrenze von 70 insgesamt einen Kredit?
</div>

```js
import { eventListenerValidationNumeric } from "./js/validateInput.js";

display(html` <div class="table-container">
    <table id="aufgabe1">
        <thead>
            <tr>
                <th>Deine Antwort zu Aufgabe 1</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td
                    contenteditable="true"
                    data-correct="${totalCreditReceived}"
                ></td>
            </tr>
        </tbody>
    </table>
</div>`);
```

<button id="validateButton1" class="btn btn-primary">Ergebnis überprüfen</button>

```js
eventListenerValidationNumeric(
    "#aufgabe1 td[contenteditable]",
    "validateButton1"
);
```

<div class="tip" label="Aufgabe 2">
Wie viele Personen erhalten bei einer Entscheidungsgrenze von 70 einen Kredit, obwohl sie nicht zahlungsfähig sind? 
</div>

```js
display(html` <div class="table-container">
    <table id="aufgabe2">
        <thead>
            <tr>
                <th>Deine Antwort zu Aufgabe 2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td
                    contenteditable="true"
                    data-correct="${nonPayingWithCredit}"
                ></td>
            </tr>
        </tbody>
    </table>
</div>`);
```

<button id="validateButton2" class="btn btn-primary">Ergebnis überprüfen</button>

```js
eventListenerValidationNumeric(
    "#aufgabe2 td[contenteditable]",
    "validateButton2"
);
```

## Bewertung des Entscheidungsmodells

Es gibt verschiedene Gütemaße, die wir zur Bewertung unseres Modells verwenden können:

-   <b>Genauigkeit:</b> Die Genauigkeit gibt den prozentualen Anteil der richtigen Vorhersagen an der Gesamtzahl aller Datenpunkte an.
-   <b>Positivrate:</b> Die Positivrate gibt den prozentualen Anteil der positiven Vorhersagen (Vorhersage: zahlt zurück) an der Gesamtzahl aller Datenpunkte an.
-   <b>Richtig-positiv-Rate:</b> Die Richtig-positiv-Rate gibt den prozentualen Anteil der richtig positiven Vorhersagen (richtig als "zahlt zurück" vorhergesagt) an der Anzahl aller tatsächlich positiven Datenpunkte (Daten: zahlt zurück) an.
-   <b>Gewinn:</b> Erzielter Gesamtgewinn der Bank (Erinnerung: die Bank erhält 300€ für jeden zurückgezahlten Kredit und verliert 700€ für jeden nicht zurückgezahlten Kredit).

<div class="tip" label="Aufgabe 3">
Berechne die Werte der vier Gütemaße. Nutze dazu die Werte in der Konfusionsmatrix. Trage deine Ergebnisse in der folgenden Tabelle ein. Runde stets auf ganzzahlige Werte!
</div>

```html
<div class="table-container">
    <table id="aufgabe3">
        <thead>
            <tr>
                <th>Genauigkeit</th>
                <th>Positivrate</th>
                <th>Richtig-positiv-Rate</th>
                <th>Gewinn</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="true" data-correct="${accuracy}"></td>
                <td contenteditable="true" data-correct="${positiveRate}"></td>
                <td
                    contenteditable="true"
                    data-correct="${truePositiveRate}"
                ></td>
                <td contenteditable="true" data-correct="${profit}"></td>
            </tr>
        </tbody>
    </table>
</div>
```

<button id="validateButton3" class="btn btn-primary">Ergebnis überprüfen</button>

```js
eventListenerValidationNumeric(
    "#aufgabe3 td[contenteditable]",
    "validateButton3"
);
```

<div class="tip" label="Aufgabe 4">
Wieviel Prozent der Personen, die zahlungsfähig sind, erhalten auch tatsächlich einen Kredit?
</div>

```js
display(html` <div class="table-container">
    <table id="aufgabe4">
        <thead>
            <tr>
                <th>Deine Antwort zu Aufgabe 4</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td
                    contenteditable="true"
                    data-correct="${percentCapablePaying}"
                ></td>
            </tr>
        </tbody>
    </table>
</div>`);
```

<button id="validateButton4" class="btn btn-primary">Ergebnis überprüfen</button>

```js
eventListenerValidationNumeric(
    "#aufgabe4 td[contenteditable]",
    "validateButton4"
);
```

<div class="tip" label="Aufgabe 5">
Wieviel Prozent der Personen im Datensatz erhalten einen Kredit? 
</div>

```js
display(html` <div class="table-container">
    <table id="aufgabe5">
        <thead>
            <tr>
                <th>Deine Antwort zu Aufgabe 5</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td
                    contenteditable="true"
                    data-correct="${percentTotalCredit}"
                ></td>
            </tr>
        </tbody>
    </table>
</div>`);
```

<button id="validateButton5" class="btn btn-primary">Ergebnis überprüfen</button>

```js
eventListenerValidationNumeric(
    "#aufgabe5 td[contenteditable]",
    "validateButton5"
);
```
