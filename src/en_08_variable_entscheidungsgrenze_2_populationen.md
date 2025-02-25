---
title: Variable Decision Boundary, Two Population Groups
style: css/custom.css
---
```js
import { calculateMetrics } from "./js/calculateMetrics.js";
```

# Variable Decision Boundaries for Two Population Groups

The dataset used so far consists of data from two population groups: the Purple Population and the Green Population.

In the following two histograms, the data of both population groups are shown separately. The bank can choose different decision boundaries for both population groups - but doesn't have to.

<div class="tip" label="Task">
Discuss in groups how you would choose the two decision boundaries to be as fair as possible from your perspective. Note down the values for your decision boundaries and justify your choice. Also describe what you understand by "fair".
</div>

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
  if (d.age === "Jung") {
    d.age_en = "Green Population";
  } else if (d.age === "Alt") {
    d.age_en = "Purple Population"; 
  }
});
```

```js
const connected = view(
  Inputs.radio(
    [
      "Independent",
      "Same Threshold",
      "Same Positive Rate",
      "Same True Positive Rate",
    ],
    {
      label: "Green Population Controls",
      value: "Independent",
    }
  )
);
```

<div class="grid grid-cols-2">
  <div class="card" style="max-width: 700px; ">

<h2>Decision Boundary Purple Population</h2>

```js
const threshold_Alt = view(
  Inputs.range([10, 100], {
    step: 1,
    label: "",
    value: 70,
  })
);
```

```js
// Compute metrics for "Alt" group first
const {
  grp: grp_Alt,
  n_true_positive: n_true_positive_Alt,
  n_false_positive: n_false_positive_Alt,
  n_false_negative: n_false_negative_Alt,
  n_true_negative: n_true_negative_Alt,
  total: total_Alt,
  total_positive: total_positive_Alt,
  precision: precision_Alt,
  recall: recall_Alt,
  positive_rate: positive_rate_Alt,
  true_positive_rate: true_positive_rate_Alt,
  gewinn: gewinn_Alt,
  accuracy: accuracy_Alt,
} = calculateMetrics(data, "Alt", threshold_Alt);
```

```js
display(
  Plot.plot({
    height: 200,
    width: 500,
    style: {
      fontSize: 16,
    },
    x: {
      label: "Score",
      domain: [10, 99],
    },
    y: {
      domain: [0, 10],
      label: "Count"
    },
    color: {
      legend: true,
      domain: ["Does not repay", "Repays"],
      range: ["#cab2d6", "#6a3d9a"],
      label: "Repayment Status"
    },
    opacity: {
      legend: true,
    },
    marks: [
      Plot.dot(
        data.filter((d) => d.age_en === "Purple Population"),
        Plot.stackY2({
          x: "score",
          fill: "type_en",
          sort: {
            value: "type_en",
            reverse: false
          },
          reverse: true,
          fillOpacity: (d) => (d.score < threshold_Alt ? 0.3 : 1),
        })
      ),
      Plot.ruleY([0]),
      Plot.ruleX([threshold_Alt - 0.5]),
    ],
  })
);
```

```html
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Prediction:<br />repays</th>
        <th>Prediction:<br />does not repay</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Data:<br />repays</th>
        <td contenteditable="false">
          ${grp_Alt['Zahlt zurück']['abovethreshold']}
        </td>
        <td contenteditable="false">
          ${grp_Alt['Zahlt zurück']['belowthreshold']}
        </td>
      </tr>
      <tr>
        <th>Data:<br />does not repay</th>
        <td contenteditable="false">
          ${grp_Alt['Zahlt nicht zurück']['abovethreshold']}
        </td>
        <td contenteditable="false">
          ${grp_Alt['Zahlt nicht zurück']['belowthreshold']}
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
        <td contenteditable="false">${accuracy_Alt}%</td>
        <td contenteditable="false">${positive_rate_Alt}%</td>
        <td contenteditable="false">${true_positive_rate_Alt}%</td>
        <td contenteditable="false">${gewinn_Alt}€</td>
      </tr>
    </tbody>
  </table>
</div>
```

</div>

  <div class="card" style="max-width: 500px; ">

<h2>Decision Boundary Green Population</h2>

```js
// Update the threshold logic to use English values
let value = 70;
if (connected === "Group Unaware") {
  value = threshold_Alt;
} else if (connected === "Equal Opportunity") {
  // Reference value from "Alt" group
  const ref = true_positive_rate_Alt;
  let bestThreshold = 0;
  let minDiff = Infinity;

  // Iterate through thresholds to find the best match for "Jung"
  for (let t = 0; t <= 100; t++) {
    const {
      grp,
      n_true_positive,
      n_false_positive,
      n_false_negative,
      n_true_negative,
      total,
      total_positive,
      precision,
      recall,
      positive_rate,
      true_positive_rate,
      gewinn,
      accuracy,
    } = calculateMetrics(data, "Jung", t);
    const diff = Math.abs(true_positive_rate - ref);
    if (diff < minDiff) {
      minDiff = diff;
      bestThreshold = t;
    }
  }

  value = bestThreshold;
} else if (connected === "Demographic Parity") {
  // Reference value from "Alt" group
  const ref = positive_rate_Alt;
  let bestThreshold = 0;
  let minDiff = Infinity;

  // Iterate through thresholds to find the best match for "Jung"
  for (let t = 0; t <= 100; t++) {
    const {
      grp,
      n_true_positive,
      n_false_positive,
      n_false_negative,
      n_true_negative,
      total,
      total_positive,
      precision,
      recall,
      positive_rate,
      true_positive_rate,
      gewinn,
      accuracy,
    } = calculateMetrics(data, "Jung", t);
    const diff = Math.abs(positive_rate - ref);
    if (diff < minDiff) {
      minDiff = diff;
      bestThreshold = t;
    }
  }

  value = bestThreshold;
}
```

```js
// Define threshold for Jung
const threshold_Jung = view(
  Inputs.range([10, 100], {
    step: 1,
    label: "",
    value: value,
  })
);
```

```js
// Compute metrics for "Jung" using the corrected threshold
const {
  grp: grp_Jung,
  n_true_positive: n_true_positive_Jung,
  n_false_positive: n_false_positive_Jung,
  n_false_negative: n_false_negative_Jung,
  n_true_negative: n_true_negative_Jung,
  total: total_Jung,
  total_positive: total_positive_Jung,
  precision: precision_Jung,
  recall: recall_Jung,
  positive_rate: positive_rate_Jung,
  true_positive_rate: true_positive_rate_Jung,
  gewinn: gewinn_Jung,
  accuracy: accuracy_Jung,
} = calculateMetrics(data, "Jung", threshold_Jung);
```

```js
display(
  Plot.plot({
    height: 200,
    width: 500,
    style: {
      fontSize: 16,
    },
    x: {
      label: "Score",
      domain: [10, 99],
    },
    y: {
      domain: [0, 10],
      label: "Count"
    },
    color: {
      legend: true,
      domain: ["Does not repay", "Repays"],
      range: ["#b2df8a", "#33a02c"],
      label: "Repayment Status"
    },
    opacity: {
      legend: true,
    },
    marks: [
      Plot.dot(
        data.filter((d) => d.age_en === "Green Population"),
        Plot.stackY2({
          x: "score",
          fill: "type_en",
          sort: {
            value: "type_en",
            reverse: false
          },
          reverse: true,
          fillOpacity: (d) => (d.score < threshold_Jung ? 0.3 : 1),
        })
      ),
      Plot.ruleY([0]),
      Plot.ruleX([threshold_Jung - 0.5]),
    ],
  })
);
```

```html
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Prediction:<br />repays</th>
        <th>Prediction:<br />does not repay</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Data:<br />repays</th>
        <td contenteditable="false">
          ${grp_Jung['Zahlt zurück']['abovethreshold']}
        </td>
        <td contenteditable="false">
          ${grp_Jung['Zahlt zurück']['belowthreshold']}
        </td>
      </tr>
      <tr>
        <th>Data:<br />does not repay</th>
        <td contenteditable="false">
          ${grp_Jung['Zahlt nicht zurück']['abovethreshold']}
        </td>
        <td contenteditable="false">
          ${grp_Jung['Zahlt nicht zurück']['belowthreshold']}
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
        <td contenteditable="false">${accuracy_Jung}%</td>
        <td contenteditable="false">${positive_rate_Jung}%</td>
        <td contenteditable="false">${true_positive_rate_Jung}%</td>
        <td contenteditable="false">${gewinn_Jung}€</td>
      </tr>
    </tbody>
  </table>
</div>
```

</div>
</div>

```html
The total profit of the bank is ${gewinn_Alt + gewinn_Jung}€.
```