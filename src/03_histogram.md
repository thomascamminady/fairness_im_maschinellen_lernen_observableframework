---
title: Histogram
style: css/custom.css
---

# Histogram

Für Banken ist es relevant, möglichst genau vorherzusagen, ob ein neuer Kunde einen Kredit mit hoher Wahrscheinlichkeit zurückzahlt oder nicht. Im Finanzwesen wird dazu oft mit Modellen gearbeitet, die jeder Person einen Kreditscore (z.B. der Schufa-Score) zuordnen. Der Kreditscore gibt die Kreditwürdigkeit einer Person an. 

In dieser App verwenden wir vergangenen Daten von zahlreichen Kreditanwärter*innen. Von diesen Personen ist der Kreditscore zwischen 0 (Kredit wird eher nicht zurückgezahlt) und 100 (Kredit wird sehr wahrscheinlich zurückgezahlt) bekannt. Zudem ist bekannt, ob die Personen ihren Kredit in der Vergangenheit tatsächlich zurückgezahlt haben. 

Bevor du mit einem größeren Datensatz arbeitest, wirst du hier zunächst erkunden, wie die Daten aufgebaut sind und wie sie mit Hilfe von Histogrammen visualisiert werden können. In den Histogrammen repräsentiert jeder Punkt eine Person.

## Datensatz 1

Hier ist eine Tabelle mit fiktiven Daten. 
```js
const names1 = FileAttachment("data/user/random_user_1.csv").csv({
    typed: true,
});
const names2 = FileAttachment("data/user/random_user_2.csv").csv({
    typed: true,
});
const names3 = FileAttachment("data/user/random_user_3.csv").csv({
    typed: true,
})


```

```js
display(
    Inputs.table(names1, {
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
        maxWidth: 600,
        multiple: false,
    })
);
```
<div class="tip" label="Aufgabe">
Welches der folgenden Histogramme A, B oder C repräsentiert die Daten aus der Tabelle? 
Du kannst die Tabelle nach Namen oder Kreditscore sortieren indem du auf den Titel der jeweiligen Spalte klickst. Scrolle durch die Tabelle um alle Einträge zu sehen.
Notiere deine Antwort. 

</div>



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

## Datensatz 2

<div class="tip" label="Aufgabe">
Hier ist eine weitere Tabelle mit fiktiven Daten. Notiere deine Antwort. 
</div>

```js
display(
    Inputs.table(names2, {
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
        maxWidth: 600,
        multiple: false,
    })
);
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

## Datensatz 3

<div class="tip" label="Aufgabe">
Hier ist eine letzte Tabelle mit fiktiven Daten. Notiere deine Antwort. 
</div>


```js
display(
    Inputs.table(names3, {
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
        maxWidth: 600,
        multiple: false,
    })
);
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
