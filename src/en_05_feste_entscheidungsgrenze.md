---
title: Fixed Decision Boundary
style: css/custom.css
---

# Fixed Decision Boundary

```js
const data = await FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});
const fixedThreshold = 70;

// Translate the data values
data.forEach(d => {
  if (d.type === "Zahlt zurück") {
    d.type_en = "Repays";
  } else if (d.type === "Zahlt nicht zurück") {
    d.type_en = "Does not repay";
  }
});
```

Is the decision boundary really well chosen? To answer this question and validate our credit lending system (i.e., the classifier), we will use the total profit and various statistical quality measures.

The decision boundary was initially fixed at 70. For all individuals with a score greater than or equal to 70, we assume they would repay the loan (prediction: will repay). For all individuals with a score below 70, we assume they would not repay the loan (prediction: will not repay).
We can now compare these predictions with the actual data (reminder: we are working with historical data, meaning it is known whether a loan was repaid or not).

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
          fill: "type_en",
          sort: "type_en",
          fillOpacity: (d) => (d.score < fixedThreshold ? 0.3 : 1),
          sort: {
            value: "type_en",
            reverse: false
          },
          reverse: true
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
    acc[type] = {
      belowThreshold: 0,
      aboveThreshold: 0,
    };
  }
  if (score < fixedThreshold) {
    acc[type].belowThreshold += 1;
  } else {
    acc[type].aboveThreshold += 1;
  }
  return acc;
}, {});
```

## The Confusion Matrix

The number of correct and incorrect predictions for both groups of people (repays and does not repay) are shown in the following table. This table is also known as a confusion matrix.

```html
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Prediction:<br />Will repay</th>
        <th>
          Prediction:<br />
          Will not repay
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Data:<br />Did repay</th>
        <td contenteditable="false">
          ${groupedData['Zahlt zurück']['aboveThreshold']}
        </td>
        <td contenteditable="false">
          ${groupedData['Zahlt zurück']['belowThreshold']}
        </td>
      </tr>
      <tr>
        <th>Data:<br />Did not repay</th>
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

## Evaluating the Decision Model

There are various quality measures that help evaluate how well our model performs.
We use the following quality measures:

- <b>Accuracy:</b> Proportion of correct classifications out of the total number of data points
- <b>Positive Rate:</b> Proportion of positive predictions (Prediction: will repay) out of the total number of data points
- <b>True Positive Rate:</b> Proportion of correct positive predictions out of all actually positive data points (Data: did repay)
- <b>Profit:</b> Total profit achieved by the bank

<div class="tip" label="Task">
Calculate the values for the following four quality measures based on the confusion matrix. Enter your results in the table.
</div>

```html
<div class="table-container">
  <table>
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
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
      </tr>
    </tbody>
  </table>
</div>
```
