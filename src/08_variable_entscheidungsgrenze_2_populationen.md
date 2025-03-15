---
title: Faire Entscheidungsgrenzen!?
style: css/custom.css
---

```js
import { calculateMetrics } from "./js/calculateMetrics.js";
```

# Faire Entscheidungsgrenzen!?

In den folgenden beiden Diagrammen werden die Daten der beiden Bevölkerungsgruppen getrennt dargestellt. Die Bank kann für beide Personengruppen unterschiedliche Entscheidungsgrenzen wählen – muss sie aber nicht.

<div class="tip" label="Aufgabe 1 (Diskussion)">
<p>
Diskutiert in Gruppen, ob ihr unterschiedliche Entscheidungsgrenzen wählen würdet oder nur eine, die für beide Gruppen gilt. 
Ziel sollte sein, dass keine Gruppe von Menschen ungerecht behandelt oder systematisch benachteiligt wird.
</p>

<p>
Diskutiert, was aus eurer Sicht faire Entscheidungsgrenzen für die beiden Personengruppen sind. Berücksichtigt dabei, dass auch die Bank mit ihrem Gewinn zufrieden sein sollte.
</p>
</div>

<div class="tip" label="Aufgabe 2">
Notiert die Grenzen, die ihr für die beiden Personengruppen wählt. Notiert zudem eure zugehörigen Argumente, warum diese Grenzen fair für beide Gruppen sind.
</div>

<div class="tip" label="Aufgabe 3">
<ol type="a">
  <li>Welche statistischen Gütemaße habt ihr genutzt, um eure Entscheidungsgrenzen festzulegen? </li>
  <li>Wieso habt ihr genau diese als relevant ausgewählt? </li>
  <li>Wie seid ihr basierend auf diesen Gütemaßen zur Festlegung eurer Entscheidungsgrenzen gekommen?</li>
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
      "Unabhängig",
      "Gleiche Grenze",
      "Gleiche Positivrate",
      "Gleiche Richtig-positiv-Rate",
    ],
    {
      label: "Regler Junge Menschen",
      value: "Unabhängig",
    }
  )
);
```

<div class="grid grid-cols-2">
  <div class="card" style="max-width: 700px; ">

<h2>Entscheidungsgrenze Grünhausen</h2>

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
      label: "Anzahl"
    },
    color: {
      legend: true,
      domain: ["Zahlt nicht zurück", "Zahlt zurück"],
      range: ["#cab2d6", "#6a3d9a"],
    },
    opacity: {
      legend: true,
    },
    marks: [
      Plot.dot(
        data.filter((d) => d.age === "Alt"),
        Plot.stackY2({
          x: "score",
          fill: "type",
          sort: {
            value: "type",
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
        <th>Vorhersage:<br />zahlt zurück</th>
        <th>Vorhersage:<br />zahlt nicht zurück</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Daten:<br />zahlt zurück</th>
        <td contenteditable="false">
          ${grp_Alt['Zahlt zurück']['abovethreshold']}
        </td>
        <td contenteditable="false">
          ${grp_Alt['Zahlt zurück']['belowthreshold']}
        </td>
      </tr>
      <tr>
        <th>Daten:<br />zahlt nicht zurück</th>
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
        <th>Genauig- keit</th>
        <th>Positivrate</th>
        <th>Richtig-positiv-Rate</th>
        <th>Gewinn</th>
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

<h2>Entscheidungsgrenze Grünhausen</h2>

```js
// Determine threshold for "Jung"
let value = 70;
if (connected === "Gleiche Grenze") {
  value = threshold_Alt;
} else if (connected === "Gleiche Richtig-positiv-Rate") {
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
} else if (connected === "Gleiche positiv Rate") {
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
      label: "Anzahl"
    },
    color: {
      legend: true,
      domain: ["Zahlt nicht zurück", "Zahlt zurück"],
      range: ["#b2df8a", "#33a02c"],
    },
    marks: [
      Plot.dot(
        data.filter((d) => d.age === "Jung"),
        Plot.stackY2({
          x: "score",
          fill: "type",
          sort: {
            value: "type",
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
        <th>Vorhersage:<br />zahlt zurück</th>
        <th>Vorhersage:<br />zahlt nicht zurück</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Daten:<br />zahlt zurück</th>
        <td contenteditable="false">
          ${grp_Jung['Zahlt zurück']['abovethreshold']}
        </td>
        <td contenteditable="false">
          ${grp_Jung['Zahlt zurück']['belowthreshold']}
        </td>
      </tr>
      <tr>
        <th>Daten:<br />zahlt nicht zurück</th>
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
        <th>Genauig- keit</th>
        <th>Positivrate</th>
        <th>Richtig-positiv-Rate</th>
        <th>Gewinn</th>
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

```html
<p>
Der Gesamtgewinn der Bank beträgt ${gewinn_Alt + gewinn_Jung}€.
</p>
