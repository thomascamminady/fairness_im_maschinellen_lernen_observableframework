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
const data = FileAttachment("data/user/distribution.csv").csv({
  typed: true,
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
      label: "Slider setting for Greenland",
      value: "Independent",
    }
  )
);
```
