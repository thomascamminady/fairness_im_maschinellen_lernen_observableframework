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
    d.age = "Young";
  } else if (d.age === "Alt") {
    d.age = "Old"; 
  }
});
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

However, what we haven't mentioned: Our dataset contained two discrete classes of applicants. On one hand, we have young applicants (green), and on the other hand, we see older applicants (purple).

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
    domain: ["Young", "Old"],
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

We can also look at both distributions separately. Here is the distribution of young applicants.

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
    domain: [0, 10]
  },
  color: {
    legend: true,
    domain: ["Repays", "Does not repay"],
    range: ["#33a02c", "#b2df8a"],
  },
  marks: [
    Plot.dot(
      data.filter((d) => d.age === "Young"),
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

Here we see 500 applicants who would repay their loan (average credit score of 55), and 500 applicants who would not repay their loan (average credit score of 40).

Next, we see the distribution of older applicants.

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
    domain: [0, 10]
  },
  color: {
    legend: true,
    domain: ["Repays", "Does not repay"],
    range: ["#6a3d9a", "#cab2d6"],
  },
  marks: [
    Plot.dot(
      data.filter((d) => d.age === "Old"),
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

Here too, we see 500 applicants who would repay their loan, and 500 applicants who would not repay their loan. However, the average credit scores here are 65 (will repay) and 50 (won't repay).

We observe: Although the probability of a loan being repaid is 50% in both groups, the group of older applicants has a higher credit score than the group of younger applicants.
