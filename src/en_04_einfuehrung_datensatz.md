---
title: Dataset
style: css/custom.css
---

# Dataset

```js
const data = await FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});
const numberOfPersons = data.length;

// Translate the data values
data.forEach(d => {
  if (d.type === "Zahlt zurück") {
    d.type_en = "Repays";
  } else if (d.type === "Zahlt nicht zurück") {
    d.type_en = "Does not repay";
  }
});
```

From now on, we will work with a larger dataset. This consists of data from ${numberOfPersons} people.

<div class="tip" label="Task">
At what credit score would you grant a loan? 
Justify your answer based on the displayed dataset.
</div>

```js
const fig = Plot.plot({
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
    domain: ["Does not repay", "Repays"]
  },
  marks: [
    Plot.dot(
      data,
      Plot.stackY2({
        x: "score",
        fill: "type_en",
        sort: {
          value: "type_en", 
          reverse: false 
        },
        reverse: true
      })
    ),
    Plot.ruleY([0]),
  ],
});
display(fig);
