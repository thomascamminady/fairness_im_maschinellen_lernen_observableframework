---
title: Kreditvergabe und Gesamtgewinn
style: css/custom.css
---

# Kreditvergabe und Gesamtgewinn

```js
const total_credit = 1000;
const interest_rate = 0.3;
const loss = 700;

const num_people = 250 + 80;
const num_people_no_payback = 80;
const num_people_payback = num_people - num_people_no_payback;

const profit_approved_payback = total_credit * interest_rate;
const profit_approved_no_payback = loss;

// Calculate values for the table
const total_profit = num_people_payback * profit_approved_payback - num_people_no_payback * profit_approved_no_payback;
```

Das ist unsere Ausgangssituation: Eine Bank vergibt Kredite von ${total_credit}€.

- Personen, die einen Kredit erhalten und zurückzahlen, zahlen den Betrag mit ${100*interest_rate} \% Zinsen zurück. Das heißt, die Bank erhält ${total_credit + total_credit * interest_rate}€ zurück.
- Vergibt die Bank einen Kredit an eine Personen, die diesen nicht oder nur teilweise zurückzahlen, macht die Bank ${loss}€ Verlust pro Person (Hinweis: Die Bank ist versichert, daher verliert sie meist nicht den vollen Betrag).

<div class="tip" label="Aufgabe">Fülle nun die folgende Tabelle aus.</div>

```js
html`
<div class="table-container">
  <table id="creditTable">
    <thead>
      <tr>
        <th>Beschreibung</th>
        <th>Betrag in €</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Gewinn der Bank:<br />Kredit genehmigt und Person zahlt zurück</th>
        <td contenteditable="true" data-correct="${profit_approved_payback}" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 45"></td>
      </tr>
      <tr>
        <th>
          Verlust der Bank:<br />Kredit genehmigt und Person zahlt nicht zurück
        </th>
        <td contenteditable="true" data-correct="${profit_approved_no_payback}" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 45"></td>
      </tr>
      <tr>
        <th>
          Gesamtgewinn bei ${num_people_payback} Personen die ihren Kredit zurückzahlen und ${num_people_no_payback} Personen die ihren Kredit nicht zurückzahlen
        </th>
        <td contenteditable="true" data-correct="${total_profit}" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 45"></td>
      </tr>
    </tbody>
  </table>
</div>
`
```

<button id="validateButton" class="btn btn-primary">Ergebnis überprüfen</button>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const validateButton = document.getElementById('validateButton');
  
  validateButton.addEventListener('click', function() {
    document.querySelectorAll('#creditTable td[contenteditable]').forEach(cell => {
      const correctValue = parseInt(cell.getAttribute('data-correct'));
      const userValue = parseInt(cell.textContent.trim());
      
      if (isNaN(userValue)) {
        cell.style.backgroundColor = '#ffebee';  // Light red for invalid input
      } else if (userValue === correctValue) {
        cell.style.backgroundColor = '#e8f5e9';  // Light green for correct
      } else {
        cell.style.backgroundColor = '#ffebee';  // Light red for wrong answer
      }
    });
  });
});
</script>
