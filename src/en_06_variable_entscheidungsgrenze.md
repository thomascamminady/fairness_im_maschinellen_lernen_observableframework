---
title: Variable Decision Threshold
style: css/custom.css
---

# Variable Decision Threshold

<!-- Include Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

```js
import { translateData } from "./js/translateData.js";

const raw_data = await FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});

const data = translateData(raw_data);
```

Now you can vary the decision threshold and determine what you consider the optimal value.

<div class="tip" label="Task">
   <i class="fas fa-pencil-alt"></i>
What value do you consider to be the optimal decision threshold? Record the value and justify your choice.
</div>

Decision Threshold:

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
          fillOpacity: (d) => (d.score < threshAlt ? 0.3 : 1),
          sort: {
            value: "type", 
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

Our prediction at a decision threshold of ${threshAlt}:

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
} = calculateMetrics(raw_data, "", threshAlt);
```

```html
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>
          Prediction:<br />
          repays
        </th>
        <th>
          Prediction:<br />
          does not repay
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Data:<br />repays</th>
        <td contenteditable="false" style="background-color: rgba(0, 128, 0, 0.35); color: black;">
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
        <td contenteditable="false" style="background-color: rgba(0, 128, 0, 0.35); color: black;">
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
