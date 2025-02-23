---
title: Histogram
style: css/custom.css
---

# Histogram

For banks, it's important to predict as accurately as possible whether a new customer is likely to repay a loan or not. In finance, this is often done using models that assign each person a credit score (e.g., the Schufa score). The credit score indicates a person's creditworthiness.

In this app, we use historical data from numerous loan applicants. For these individuals, we know their credit score ranging from 0 (loan is likely not to be repaid) to 100 (loan is very likely to be repaid). We also know whether these people actually repaid their loans in the past.

Before working with a larger dataset, you'll first explore how the data is structured and how it can be visualized using histograms. In the histograms, each point represents a person.

## Dataset 1

Here is a table with fictional data.

```js
const names1 = FileAttachment("data/user/random_user_1.csv").csv({
  typed: true,
});
const names2 = FileAttachment("data/user/random_user_2.csv").csv({
  typed: true,
});
const names3 = FileAttachment("data/user/random_user_3.csv").csv({
  typed: true,
});

function createTable(data) {
  return Inputs.table(data, {
    width: {
      name: 200,
      score: 200,
      type: 200,
    },
    columns: ["name", "score", "type"],
    header: {
      name: "Name",
      score: "Kreditscore",
      type: "Kreditwürdigkeit",
    },
    align: {
      name: "left",
      score: "left",
      type: "left",
    },
    rows: 10,
    maxWidth: 800,
    multiple: false,
  });
}

function createPlot(data) {
  return Plot.plot({
    height: 200,
    width: 200,
    x: {
      label: "Score",
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
        })
      ),
      Plot.ruleY([0]),
    ],
  });
}
```

```js
display(createTable(names1));
```

<div class="tip" label="Task">
Which of the following histograms A, B, or C represents the data from the table? 
You can sort the table by name or credit score by clicking on the respective column header. Scroll through the table to see all entries.
Write down your answer.
</div>

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>Option A</h2>${createPlot(names1)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option B</h2>${createPlot(names2)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option C</h2>${createPlot(names3)}</div>
</div>

## Dataset 2

<div class="tip" label="Task">
Here is another table with fictional data. Write down your answer.
</div>

```js
display(createTable(names2));
```

Which of these histograms is the correct one?

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>Option A</h2>${createPlot(names1)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option B</h2>${createPlot(names2)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option C</h2>${createPlot(names3)}</div>
</div>

## Dataset 3

<div class="tip" label="Task">
Here is a final table with fictional data. Write down your answer.
</div>

```js
display(createTable(names3));
```

Which of these histograms is the correct one?

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>Option A</h2>${createPlot(names1)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option B</h2>${createPlot(names2)} </div>
  <div class="card" style="max-width: 200px; "><h2>Option C</h2>${createPlot(names3)} </div>
</div>
