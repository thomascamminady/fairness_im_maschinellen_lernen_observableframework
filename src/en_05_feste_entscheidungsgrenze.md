---
title: Statistical Performance Measures
style: css/custom.css
---

# Statistical Performance Measures

## Is the decision threshold really well chosen?

```js
import { translateData } from "./js/translateData.js";

var data = await FileAttachment("data/user/distribution.csv").csv({
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

data = translateData(data);
```

To answer this question and validate the credit approval system, we will use total profit and various statistical performance measures.

The decision threshold is used for prediction. If a person has a credit score greater than or equal to the threshold, we predict they will repay the loan. If their score is below the threshold, we predict they will not repay. The threshold was initially fixed at 70. For all persons with a score >= 70, we predict repayment. For all others, we predict non-repayment. These predictions can now be compared with the known outcomes.

Reminder: We are working with data of individuals for whom it is known whether they repaid their loan in the past, and we use this to compare with our predictions.

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

## The Confusion Matrix

The number of correct and incorrect predictions for both groups (“repays” and “does not repay”) is shown in the table below. This table is also called a confusion matrix.

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Prediction:<br />Repays</th>
                <th>Prediction:<br />Does not repay</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Data:<br />Repays</th>
                <td style="background-color: rgba(0, 128, 0, 0.35); color: black;">
                    ${groupedData['Zahlt zurück']['aboveThreshAlt']}
                </td>
                <td>${groupedData['Zahlt zurück']['belowThreshAlt']}</td>
            </tr>
            <tr>
                <th>Data:<br />Does not repay</th>
                <td>${groupedData['Zahlt nicht zurück']['aboveThreshAlt']}</td>
                <td style="background-color: rgba(0, 128, 0, 0.35); color: black;">
                    ${groupedData['Zahlt nicht zurück']['belowThreshAlt']}
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

<div class="tip" label="Task 1">
How many people receive a loan with a threshold of 70?
</div>

```js
import { eventListenerValidationNumeric } from "./js/validateInput.js";

display(html` <div class="table-container">
    <table id="aufgabe1">
        <thead>
            <tr>
                <th>Your answer to Task 1</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="true" data-correct="${totalCreditReceived}"></td>
            </tr>
        </tbody>
    </table>
</div>`);
```

<button id="validateButton1" class="btn btn-primary">Check result</button>

```js
eventListenerValidationNumeric(
    "#aufgabe1 td[contenteditable]",
    "validateButton1"
);
```

<div class="tip" label="Task 2">
How many people receive a loan at threshold 70 who are not creditworthy?
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
                <td contenteditable="true" data-correct="${nonPayingWithCredit}"></td>
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

## Evaluating the Decision Model

There are several performance metrics we can use to evaluate our model:

- <b>Accuracy:</b> Percentage of correct predictions out of all data points.
- <b>Positive Rate:</b> Percentage of positive predictions (predicts: repays) out of all data points.
- <b>True Positive Rate:</b> Percentage of correct positive predictions out of all actual positive cases (data: repays).
- <b>Profit:</b> Total profit of the bank (Reminder: the bank earns €300 for each repaid loan and loses €700 for each not repaid loan).

<div class="tip" label="Task 3">
Calculate the values of the four performance metrics using the confusion matrix. Enter your results in the table below.
</div>

```html
<div class="table-container">
    <table id="aufgabe3">
        <thead>
            <tr>
                <th>Accuracy</th>
                <th>Positive Rate</th>
                <th>True Positive Rate</th>
                <th>Profit</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="true" data-correct="${accuracy}"></td>
                <td contenteditable="true" data-correct="${positiveRate}"></td>
                <td contenteditable="true" data-correct="${truePositiveRate}"></td>
                <td contenteditable="true" data-correct="${profit}"></td>
            </tr>
        </tbody>
    </table>
</div>
```

<button id="validateButton3" class="btn btn-primary">Check result</button>

```js
eventListenerValidationNumeric(
    "#aufgabe3 td[contenteditable]",
    "validateButton3"
);
```

<div class="tip" label="Task 4">
What percentage of creditworthy individuals actually receive a loan?
</div>

```js
display(html` <div class="table-container">
    <table id="aufgabe4">
        <thead>
            <tr>
                <th>Your answer to Task 4</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="true" data-correct="${percentCapablePaying}"></td>
            </tr>
        </tbody>
    </table>
</div>`);
```

<button id="validateButton4" class="btn btn-primary">Check result</button>

```js
eventListenerValidationNumeric(
    "#aufgabe4 td[contenteditable]",
    "validateButton4"
);
```

<div class="tip" label="Task 5">
What percentage of individuals in the dataset receive a loan?
</div>

```js
display(html` <div class="table-container">
    <table id="aufgabe5">
        <thead>
            <tr>
                <th>Your answer to Task 5</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td contenteditable="true" data-correct="${percentTotalCredit}"></td>
            </tr>
        </tbody>
    </table>
</div>`);
```

<button id="validateButton5" class="btn btn-primary">Check result</button>

```js
eventListenerValidationNumeric(
    "#aufgabe5 td[contenteditable]",
    "validateButton5"
);
```
