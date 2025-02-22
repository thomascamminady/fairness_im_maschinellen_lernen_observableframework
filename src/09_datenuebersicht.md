---
title: Metriken
style: css/custom.css
---

## Metriken

```js
import {
    calculateAllMetrics
} from "./js/calculateMetrics.js";
```

```js
const data = FileAttachment("data/user/distribution.csv").csv({
    typed: true
});
```

```js 
const df_alt = calculateAllMetrics(data, "Alt")

```
```js 
const df_jung = calculateAllMetrics(data, "Jung")

```

```js
const df = df_alt.concat(df_jung)
```

```js 

Plot.plot({

    color:{legend:true},

  marks: [

    Plot.lineY(df, {x:"threshold",  y: "value", marker: true, stroke: "metric",fy:"ageGroup"}),
    Plot.ruleY([0]),

  ]
})
```
