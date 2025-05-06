---
title: Understanding Data
style: css/custom.css
---

# Understanding the Data

For banks, it's important to accurately predict whether a new customer is likely to repay a loan. In finance, mathematical models are often used to assign each person a credit score (e.g., the Schufa score). We assume that reliable data was used to calculate the credit score, and we treat the credit score as a meaningful measure of a person's creditworthiness.

In this learning module, we use fictional data from many loan applicants that could have realistically occurred in the past. Each of these individuals has a credit score between 0 (loan is unlikely to be repaid) and 100 (loan is very likely to be repaid). We also know whether each person actually repaid their loan in the past or not.

Before working with a larger dataset, you will first explore the structure of the data and how it can be visualized using scatter plots. In the plots, each point represents one person.

## Dataset 1

Here is a table with fictional but realistic data.

```js
import { translateData } from "./js/translateData.js";

const names1 = translateData(await FileAttachment("data/user/random_user_1.csv").csv({
    typed: true,
}));
const names2 = translateData(await FileAttachment("data/user/random_user_2.csv").csv({
    typed: true,
}));
const names3 = translateData(await FileAttachment("data/user/random_user_3.csv").csv({
    typed: true,
}));

function createTable(data) {
    return Inputs.table(data, {
        width: {
            name: 200,
            type: 200,
            score: 200,
        },
        columns: ["name", "type", "score"],
        header: {
            name: "Name",
            type: "Past Payment Reliability",
            score: "Credit Score",
        },
        align: {
            name: "left",
            type: "left",
            score: "left",
        },
        rows: 10,
        maxWidth: 800,
        multiple: false,
    });
}

function createPlot(data) {
    return Plot.plot({
        height: 200,
        width: 200,
        x: {
            label: "Score",
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
                    sort: {
                        value: "type",
                        reverse: false,
                    },
                    reverse: true,
                })
            ),
            Plot.ruleY([0]),
        ],
    });
}
```

```js
display(createTable(names1));
```

<div class="tip" label="Task 1">
Which of the following scatter plots A, B, or C represents the data from the table? You can sort the table by name, credit score, or past payment reliability by clicking the column headers. Scroll through the table to see all entries. Write down your answer.
</div>

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>Option A</h2>${createPlot(names1)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option B</h2>${createPlot(names2)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option C</h2>${createPlot(names3)}</div>
</div>

## Dataset 2

Here is another table.

```js
display(createTable(names2));
```

<div class="tip" label="Task 2">
Which scatter plot represents the data in the table? Write down your answer.
</div>

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>Option A</h2>${createPlot(names1)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option B</h2>${createPlot(names2)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option C</h2>${createPlot(names3)}</div>
</div>

## Dataset 3

Here is another table.

```js
display(createTable(names3));
```

<div class="tip" label="Task 3">
Which scatter plot represents the data in the table? Write down your answer.
</div>

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>Option A</h2>${createPlot(names1)} </div>
  <div class="card" style="max-width: 200px; "><h2>Option B</h2>${createPlot(names3)} </div>
  <div class="card" style="max-width: 200px; "><h2>Option C</h2>${createPlot(names2)} </div>
</div>

## Now check your answers

```js
display(html`
    <div class="table-container">
        <table id="histogramtable">
            <thead>
                <tr>
                    <th></th>
                    <th>Correct Option (A, B or C)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Task 1</th>
                    <td contenteditable="true" data-correct="A"></td>
                </tr>
                <tr>
                    <th>Task 2</th>
                    <td contenteditable="true" data-correct="B"></td>
                </tr>
                <tr>
                    <th>Task 3</th>
                    <td contenteditable="true" data-correct="B"></td>
                </tr>
            </tbody>
        </table>
    </div>
`);
```

<button id="validateButton" class="btn btn-primary">Check result</button>

```js
import { eventListenerValidationString } from "./js/validateInput.js";

eventListenerValidationString(
    "#histogramtable td[contenteditable]",
    "validateButton"
);
```
