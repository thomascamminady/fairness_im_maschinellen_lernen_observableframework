---
title: Daten verstehen
style: css/custom.css
---

# Daten verstehen

Für Banken ist es relevant, möglichst genau vorherzusagen, ob ein neuer Kunde einen Kredit mit hoher Wahrscheinlichkeit zurückzahlt oder nicht. Im Finanzwesen wird dazu oft mit mathematischen Modellen gearbeitet, die jeder Person einen Kreditscore (z. B. der Schufa-Score) zuordnen. Der Kreditscore dient dann als Maß für die Kreditwürdigkeit einer Person.

In dieser App verwenden wir vergangene Daten von zahlreichen Kreditanwärter*innen. Für diese Personen wurde der Kreditscore zwischen 0 (Kredit wird eher nicht zurückgezahlt) und 100 (Kredit wird sehr wahrscheinlich zurückgezahlt) berechnet. Zudem ist bekannt, ob die Personen ihren Kredit in der Vergangenheit tatsächlich zurückgezahlt haben oder nicht.

Bevor wir mit einem größeren Datensatz arbeiten, wirst du hier zunächst erkunden, wie die Daten aufgebaut sind und wie sie mit Hilfe von Punktdiagrammen visualisiert werden können. In den Diagrammen repräsentiert jeder Punkt eine Person.


## Datensatz 1

Hier siehst du eine Tabelle mit fiktiven Daten. 

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
      type: "Zahlungsfähigkeit",
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
}
```

```js
display(createTable(names1));
```

<div class="tip" label="Aufgabe 1">
Welches der folgenden Punktdiagramme A, B oder C repräsentiert die Daten aus der Tabelle? Du kannst die Tabelle nach Namen, Kreditscore oder Zahlungsfähigkeit sortieren, indem du auf den Titel der jeweiligen Spalte klickst. Scrolle durch die Tabelle, um alle Einträge zu sehen. Notiere deine Antwort.
</div>

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>Option A</h2>${createPlot(names1)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option B</h2>${createPlot(names2)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option C</h2>${createPlot(names3)}</div>
</div>

## Datensatz 2

Hier siehst du eine weitere Tabelle.

```js
display(createTable(names2));
```

<div class="tip" label="Aufgabe 2">
 Welches Punktdiagramm repräsentiert die Daten in der Tabelle? Notiere deine Antwort.
</div>

<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>Option A</h2>${createPlot(names1)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option B</h2>${createPlot(names2)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option C</h2>${createPlot(names3)}</div>
</div>

## Datensatz 3

Hier siehst du eine weitere Tabelle. 

```js
display(createTable(names3));
```

<div class="tip" label="Aufgabe 3">
Welches Punktdiagramm repräsentiert die Daten in der Tabelle? Notiere deine Antwort.
</div>


<div class="grid grid-cols-3">
  <div class="card" style="max-width: 200px; "><h2>Option A</h2>${createPlot(names1)}</div>
  <div class="card" style="max-width: 200px; "><h2>Option B</h2>${createPlot(names2)} </div>
  <div class="card" style="max-width: 200px; "><h2>Option C</h2>${createPlot(names3)} </div>
</div>
