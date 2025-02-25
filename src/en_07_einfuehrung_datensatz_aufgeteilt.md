---
title: Split Dataset
style: css/custom.css
---

# What do we really find in our data?

```js
const data = await FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});
const numberOfPersons = data.length;

// Translate the data values
data.forEach(d => {
  if (d.type === "Zahlt zurück") {
    d.type = "Repays";
  } else if (d.type === "Zahlt nicht zurück") {
    d.type = "Does not repay";
  }
  if (d.age === "Jung") {
    d.age = "Green Population";
  } else if (d.age === "Alt") {
    d.age = "Purple Population"; 
  }
});

// Calculate averages for each group
const greenRepay = data.filter(d => d.age === "Green Population" && d.type === "Repays");
const greenNoRepay = data.filter(d => d.age === "Green Population" && d.type === "Does not repay");
const purpleRepay = data.filter(d => d.age === "Purple Population" && d.type === "Repays");
const purpleNoRepay = data.filter(d => d.age === "Purple Population" && d.type === "Does not repay");

const avgGreenRepay = Math.round(greenRepay.reduce((sum, d) => sum + d.score, 0) / greenRepay.length);
const avgGreenNoRepay = Math.round(greenNoRepay.reduce((sum, d) => sum + d.score, 0) / greenNoRepay.length);
const avgPurpleRepay = Math.round(purpleRepay.reduce((sum, d) => sum + d.score, 0) / purpleRepay.length);
const avgPurpleNoRepay = Math.round(purpleNoRepay.reduce((sum, d) => sum + d.score, 0) / purpleNoRepay.length);

```

So far, we have colored our dataset based on whether a person will repay their requested loan.

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
  y: {
    label: "Count"
  },
  color: {
    legend: true,
    domain: ["Does not repay", "Repays"],
    scheme: "Paired"
  },
  marks: [
    Plot.dot(
      data,
      Plot.stackY2({
        x: "score",
        fill: "type",
        sort: {
          value: "type",
          reverse: false
        },
        reverse: true
      })
    ),
    Plot.ruleY([0]),
  ],
});
display(fig);
```

However, what we haven't mentioned: Our dataset contained two discrete populations of applicants. On one hand, we have Green Population (green), and on the other hand, we see Purple Population (purple).

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
  y: {
    label: "Count"
  },
  color: {
    legend: true,
    domain: ["Green Population", "Purple Population"],
    range: ["#33a02c", "#6a3d9a"],
  },
  marks: [
    Plot.dot(
      data,
      Plot.stackY2({
        x: "score",
        fill: "age",
        fillOpacity: (d) => (d.type === "Repays" ? 1 : 0.3),
        sort: {
          value: "type",
          reverse: false
        },
        reverse: true
      })
    ),
    Plot.ruleY([0]),
  ],
});
display(fig);
```

We can also look at both distributions separately. Here is the distribution of Green Population.

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
  y: {
    label: "Count",
    domain: [0, 10]
  },
  color: {
    legend: true,
    domain: ["Repays", "Does not repay"],
    range: ["#33a02c", "#b2df8a"],
  },
  marks: [
    Plot.dot(
      data.filter((d) => d.age === "Green Population"),
      Plot.stackY2({
        x: "score",
        fill: "type",
        sort: {
          value: "type",
          reverse: false
        },
        reverse: true
      })
    ),
    Plot.ruleY([0]),
  ],
});
display(fig);
```

Here we see ${greenRepay.length} applicants who would repay their loan (average credit score of ${avgGreenRepay}), and ${greenNoRepay.length} applicants who would not repay their loan (average credit score of ${avgGreenNoRepay}).

Next, we see the distribution of Purple Population.

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
  y: {
    label: "Count",
    domain: [0, 10]
  },
  color: {
    legend: true,
    domain: ["Repays", "Does not repay"],
    range: ["#6a3d9a", "#cab2d6"],
  },
  marks: [
    Plot.dot(
      data.filter((d) => d.age === "Purple Population"),
      Plot.stackY2({
        x: "score",
        fill: "type",
        sort: {
          value: "type",
          reverse: false
        },
        reverse: true
      })
    ),
    Plot.ruleY([0]),
  ],
});
display(fig);
```

Here too, we see ${purpleRepay.length} applicants who would repay their loan, and ${purpleNoRepay.length} applicants who would not repay their loan. However, the average credit scores here are ${avgPurpleRepay} (will repay) and ${avgPurpleNoRepay} (won't repay).

We observe: Although the probability of a loan being repaid is 50% in both groups, Purple Population has a higher credit score than Green Population.
