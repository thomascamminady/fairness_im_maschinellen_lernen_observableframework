---
title: Histogram
style: css/custom.css
---

# Histogram

Hier ist eine tolle Tabelle.

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
```

```js
Inputs.table(names1);
```

Welches dieser Histogramme ist das richtige?

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px;">
    <h2>Option A</h2>
        ${Plot.plot({
height:200,width:200,  x: {label: "Score"},
  color: { legend: true ,  scheme: "Paired"},
  marks: [
    Plot.dot(
      names1,
      Plot.stackY2({
        x: "score",
        fill: "type",
        sort:"type",
      })
    ),
    Plot.ruleY([0])
  ]
})}
  </div>

  <div class="card" style="max-width: 200px;">
    <h2>Option B</h2>
        ${Plot.plot({
height:200,width:200,  x: {label: "Score"},
  color: { legend: true ,  scheme: "Paired"},
  marks: [
    Plot.dot(
      names2,
      Plot.stackY2({
        x: "score",
        fill: "type",
        sort:"type",
      })
    ),
    Plot.ruleY([0])
  ]
})}
  </div>

  <div class="card" style="max-width: 200px;">
    <h2>Option C</h2>
        ${Plot.plot({
height:200,width:200,  x: {label: "Score"},
  color: { legend: true ,  scheme: "Paired"},
  marks: [
    Plot.dot(
      names3,
      Plot.stackY2({
        x: "score",
        fill: "type",
        sort:"type",
      })
    ),
    Plot.ruleY([0])
  ]
})}
  </div>

</div>
