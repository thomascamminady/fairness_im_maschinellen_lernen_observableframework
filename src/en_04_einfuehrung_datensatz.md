---
title: Dataset
style: css/custom.css
---

# The Dataset

<!-- Include Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

```js
import { translateData } from "./js/translateData.js";

var data = await FileAttachment("data/user/distribution.csv").csv({
    typed: true,
});
const numberOfPersons = data.length;

// Count the number of people who repay and don't repay
const repayCount = data.filter((d) => d.type === "Zahlt zurück").length;
const noRepayCount = data.filter((d) => d.type === "Zahlt nicht zurück").length;

// Calculate the correct thresholds for the validation
const nonPayingScores = data
    .filter((d) => d.type === "Zahlt nicht zurück")
    .map((d) => d.score);
const payingScores = data
    .filter((d) => d.type === "Zahlt zurück")
    .map((d) => d.score);

// Task 1: Threshold where only paying customers get credit
// This is the score right above the highest non-paying score
const maxNonPayingScore = Math.max(...nonPayingScores);
const threshold1 = maxNonPayingScore + 1;

// Task 2: Threshold where all paying customers get credit
// This is the minimum score of anyone who repays
const minPayingScore = Math.min(...payingScores);
const threshold2 = minPayingScore;

data = translateData(data);
```

From now on, we are working with a larger dataset. It consists of data from ${numberOfPersons} individuals. Of these, ${repayCount} are creditworthy ("repays") and ${noRepayCount} are not creditworthy ("does not repay").

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
            label: "Count",
        },
        color: {
            legend: true,
            scheme: "Paired",
            domain: ["Does not repay", "Repays"],
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

<div class="tip" label="Task 1">
What should the decision threshold be so that only individuals who will repay the loan receive it?
</div>

```js
display(html` <div class="table-container">
    <table id="aufgabe1">
        <thead>
            <tr>
                <th>Your answer to Task 1</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="true" data-correct="${threshold1}"></td>
            </tr>
        </tbody>
    </table>
</div>`);
```

<button id="validateButton1" class="btn btn-primary">Check result</button>

```js
import { eventListenerValidationNumeric } from "./js/validateInput.js";

eventListenerValidationNumeric(
    "#aufgabe1 td[contenteditable]",
    "validateButton1"
);
```

<div class="tip" label="Task 2">
What should the decision threshold be so that all individuals who will repay the loan receive it?
</div>

```js
display(html` <div class="table-container">
    <table id="aufgabe2">
        <thead>
            <tr>
                <th>Your answer to Task 2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="true" data-correct="${threshold2}"></td>
            </tr>
        </tbody>
    </table>
</div>`);
```

<button id="validateButton2" class="btn btn-primary">Check result</button>

```js
eventListenerValidationNumeric(
    "#aufgabe2 td[contenteditable]",
    "validateButton2"
);
```

<div class="tip" label="Task 3">
   <i class="fas fa-pencil-alt"></i>
At what credit score would you grant a loan? Justify your answer based on the dataset shown.
</div>
