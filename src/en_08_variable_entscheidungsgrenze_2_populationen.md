---
title: Fair Decision Thresholds!?
style: css/custom.css
---

```js
import { calculateMetrics } from "./js/calculateMetrics.js";
```

# Fair Decision Thresholds!?

<!-- Include Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

In the following two charts, the data from the two population groups is displayed separately. The bank can choose different decision thresholds for each group – but doesn't have to.

<div class="tip" label="Task 1 (Discussion)">
<p>
 <i class="fas fa-comments"></i> Discuss in groups whether you would choose different decision thresholds or just one that applies to both groups. 
The goal should be that no group of people is treated unfairly or systematically disadvantaged.
</p>

<p>
Discuss what you consider fair decision thresholds for the two groups. Also consider that the bank should be satisfied with its profit.
</p>
</div>

<div class="tip" label="Task 2">
 <i class="fas fa-pencil-alt"></i>
  Note the thresholds you chose for the two population groups. Also note your arguments why these thresholds are fair for both groups.
</div>

<div class="tip" label="Task 3">
   <i class="fas fa-pencil-alt"></i> Write your answers to the following questions on the answer sheet.
<ol type="a">
  <li>Which statistical performance metrics did you use to determine your decision thresholds?</li>
  <li>Why did you choose these as relevant?</li>
  <li>How did you use these metrics to determine your decision thresholds?</li>
</ol>
</div>

```js
const data = await FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});

// Add English translations for the data
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
      "Independent from Pinklandia",
      "Same Decision Thresholds",
      "Same Positive Rates",
      "Same True Positive Rates",
    ],
    {
      label: "Slider setting for Grünhausen",
      value: "Independent",
    }
  )
);
```

<div class="grid grid-cols-2">
  <div class="card" style="max-width: 700px; ">

<h2>Decision Threshold Pinklandia</h2>

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
        <td contenteditable="false" style="background-color: rgba(0, 128, 0, 0.35); color: black;">
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
        <td contenteditable="false" style="background-color: rgba(0, 128, 0, 0.35); color: black;">
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

<h2>Decision Threshold Grünhausen</h2>

```js
// Determine threshold for "Jung"
let value = 70;
if (connected === "Same Decision Thresholds") {
  value = threshold_Alt;
} else if (connected === "Same True Positive Rates") {
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
} else if (connected === "Same Positive Rates") {
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
        <td contenteditable="false" style="background-color: rgba(0, 128, 0, 0.35); color: black;">
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
        <td contenteditable="false" style="background-color: rgba(0, 128, 0, 0.35); color: black;">
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
<p>
The total profit of the bank is ${gewinn_Alt + gewinn_Jung}€.
</p>
```
