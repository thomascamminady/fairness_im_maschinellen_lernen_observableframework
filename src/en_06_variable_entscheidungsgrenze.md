---
title: Variable Decision Boundary
style: css/custom.css
---

# Variable Decision Boundary

```js
const data = await FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});

data.forEach(d => {
  if (d.type === "Zahlt zurück") {
    d.type_en = "Repays";
  } else if (d.type === "Zahlt nicht zurück") {
    d.type_en = "Does not repay";
  }
});
```

Here you can vary the decision boundary and set what you consider to be the optimal decision boundary.

<div class="tip" label="Task">
Note down your chosen decision boundary value and explain your choice.
</div>

Decision boundary:

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
    },
    marks: [
      Plot.dot(
        data,
        Plot.stackY2({
          x: "score",
          fill: "type_en",
          sort: "type_en",
          fillOpacity: (d) => (d.score < threshAlt ? 0.3 : 1),
          sort: {
            value: "type_en",
            reverse: false
          },
          reverse: true
        })
      ),
      Plot.ruleY([0]),
      Plot.ruleX([threshAlt - 0.5]),
    ],
  })
);
```

Our prediction with a decision boundary of ${threshAlt}:

```js
import { calculateMetrics } from "./js/calculateMetrics.js";
```

```js
const {
  grp: groupedData,
  n_true_positive,
  n_false_positive,
  n_false_negative,
  n_true_negative,
  total: n_total,
  total_positive: n_total_true,
  precision,
  recall,
  positive_rate,
  true_positive_rate,
  gewinn,
  accuracy,
} = calculateMetrics(data, "", threshAlt);
```

```html
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>
          Prediction:<br />
          will repay
        </th>
        <th>
          Prediction:<br />
          will not repay
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Data:<br />repays</th>
        <td contenteditable="false">
          ${groupedData['Zahlt zurück']['abovethreshold']}
        </td>
        <td contenteditable="false">
          ${groupedData['Zahlt zurück']['belowthreshold']}
        </td>
      </tr>
      <tr>
        <th>Data:<br />does not repay</th>
        <td contenteditable="false">
          ${groupedData['Zahlt nicht zurück']['abovethreshold']}
        </td>
        <td contenteditable="false">
          ${groupedData['Zahlt nicht zurück']['belowthreshold']}
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
        <th>Accuracy</th>
        <th>Positive Rate</th>
        <th>True Positive Rate</th>
        <th>Profit</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td contenteditable="false">${accuracy}%</td>
        <td contenteditable="false">${positive_rate}%</td>
        <td contenteditable="false">${true_positive_rate}%</td>
        <td contenteditable="false">${gewinn}€</td>
      </tr>
    </tbody>
  </table>
</div>
```
