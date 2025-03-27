---
title: Datensatz
style: css/custom.css
---

# Der Datensatz

<!-- Include Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

```js
const data = await FileAttachment("data/user/distribution.csv").csv({
    typed: true,
});
const numberOfPersons = data.length;

// Count the number of people who repay and don't repay
const repayCount = data.filter((d) => d.type === "Zahlt zurück").length;
const noRepayCount = data.filter((d) => d.type === "Zahlt nicht zurück").length;
```

Ab sofort arbeiten wir mit einem größeren Datensatz. Dieser besteht aus Daten von ${numberOfPersons} Personen. Davon sind ${repayCount} Personen zahlungsfähig ("zahlt zurück") und ${noRepayCount} Personen nicht zahlungsfähig ("zahlt nicht zurück").

```js
const threshAlt = view(
    Inputs.range([0, 100], {
        step: 1,
        label: "",
    })
);
```

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
        y: {
            label: "Anzahl",
        },
        color: {
            legend: true,
            scheme: "Paired",
            domain: ["Zahlt nicht zurück", "Zahlt zurück"],
        },
        marks: [
            Plot.dot(
                data,
                Plot.stackY2({
                    x: "score",
                    fill: "type",
                    fillOpacity: (d) => (d.score < threshAlt ? 0.3 : 1),
                    sort: {
                        value: "type",
                        reverse: false,
                    },
                    reverse: true,
                })
            ),
            Plot.ruleY([0]),
            Plot.ruleX([threshAlt - 0.5]),
        ],
    })
);
```

<div class="tip" label="Aufgabe 1">
Wie muss die Entscheidungsgrenze gewählt werden, damit ausschließlich Personen einen Kredit erhalten, die auch zurückzahlen können?
</div>

```js
display(html` <div class="table-container">
    <table id="aufgabe1">
        <thead>
            <tr>
                <th>Deine Antwort zu Aufgabe 1</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="true" data-correct="88"></td>
            </tr>
        </tbody>
    </table>
</div>`);
```

<button id="validateButton1" class="btn btn-primary">Ergebnis überprüfen</button>

```js
import { eventListenerValidationNumeric } from "./js/validateInput.js";

eventListenerValidationNumeric(
    "#aufgabe1 td[contenteditable]",
    "validateButton1"
);
```

<div class="tip" label="Aufgabe 2">
Wie muss die Entscheidungsgrenze gewählt werden, damit alle Personen einen Kredit erhalten, die auch zurückzahlen können?
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
                <td contenteditable="true" data-correct="70"></td>
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

<div class="tip" label="Aufgabe 3">
   <i class="fas fa-pencil-alt"></i>
Ab welchem Kreditscore würdest du einen Kredit vergeben? Begründe deine Antwort basierend auf dem dargestellten Datensatz. 
</div>
