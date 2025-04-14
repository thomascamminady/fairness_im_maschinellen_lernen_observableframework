---
title: Metrics
style: css/custom.css
---

## Metrics

```js
import { calculateAllMetrics } from "./js/calculateMetrics.js";
```

```js
const data = FileAttachment("data/user/distribution.csv").csv({
  typed: true,
});
```

```js
const df_alt = calculateAllMetrics(data, "Alt");
```

```js
const df_jung = calculateAllMetrics(data, "Jung");
```

```js
const df = df_alt.concat(df_jung);
```

```js
display(
  Plot.plot({
    marginLeft: 100,

    color: { legend: true },
    x: { label: "Threshold" },
    y: { label: "Value in %" },

    facet: { label: "Age Group" },
    marks: [
      Plot.lineY(
        df.filter((d) => d.metric != "gewinn"),
        {
          x: "threshold",
          y: "value",
          marker: true,
          stroke: "metric",
          fy: "ageGroup",
        }
      ),
      Plot.ruleY([0]),
    ],
  })
);
```

```js
display(
  Plot.plot({
    marginLeft: 100,
    color: { legend: true },
    x: { label: "Threshold" },
    y: { label: "Profit in €" },

    facet: { label: "Age Group" },

    marks: [
      Plot.lineY(
        df.filter((d) => d.metric == "gewinn"),
        { x: "threshold", y: "value", marker: true, fy: "ageGroup" }
      ),
      Plot.ruleY([0]),
    ],
  })
);
```
