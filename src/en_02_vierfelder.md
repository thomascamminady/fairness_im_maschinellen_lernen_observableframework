---
title: Credit Lending and Total Profit
style: css/custom.css
---

# Credit Lending and Total Profit

```js
const total_credit = 1000;
const interest_rate = 0.25;
const loss = total_credit;

const profit_approved_payback = total_credit * interest_rate;
const profit_approved_no_payback = -loss;
```

A bank issues loans of ${total_credit}€.

- People who receive a loan and repay it pay back the amount with ${100*interest_rate} \% interest. This means the bank receives ${total_credit + total_credit * interest_rate}€ back.
- If the bank gives a loan to people who don't repay it, the bank loses ${loss}€.

<div class="tip" label="Task">Now fill in the following table.</div>

<div class="table-container">
  <table id="creditTable">
    <thead>
      <tr>
        <th>Description</th>
        <th>Amount in €</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Bank's profit:<br />Credit approved and person repays</th>
        <td contenteditable="true" data-correct=250 onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 45"></td>
      </tr>
      <tr>
        <th>
          Bank's loss:<br />Credit approved and person doesn't repay
        </th>
        <td contenteditable="true" data-correct="${profit_approved_no_payback}" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 45"></td>
      </tr>
      <tr>
        <th>
          Total profit with 25 people who repay their loan and 8
          people who don't repay their loan
        </th>
        <td contenteditable="true" data-correct="23750" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 45"></td>
      </tr>
    </tbody>
  </table>
</div>

<button id="validateButton" class="btn btn-primary">Check Result</button>

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
