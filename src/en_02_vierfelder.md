---
title: Loan Approval and Total Profit
style: css/custom.css
---

# Loan Approval and Total Profit

```js
const REPAYS = "Repays";
const DOES_NOT_REPAY = "Does not repay";
const total_credit = 1000;
const interest_rate = 0.3;
const loss = 700;

const num_people = 250 + 80;
const num_people_no_payback = 80;
const num_people_payback = num_people - num_people_no_payback;

const profit_approved_payback = total_credit * interest_rate;
const profit_approved_no_payback = loss;

// Calculate values for the table
const total_profit =
    num_people_payback * profit_approved_payback -
    num_people_no_payback * profit_approved_no_payback;
```

This is our starting point: A bank gives out loans of ${total_credit}€.

- People who receive a loan and repay it do so with ${100*interest_rate}% interest. This means the bank receives ${total_credit + total_credit * interest_rate}€ back.
- If the bank gives a loan to someone who does not repay it or only repays part of it, the bank incurs a loss of ${loss}€ per person. (Note: The bank is insured, so it typically does not lose the full amount.)

<div class="tip" label="Task">Now fill out the following table.</div>

```js
display(html`
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
                    <th>
                        Bank's profit:<br />Loan approved and person repays
                    </th>
                    <td
                        contenteditable="true"
                        data-correct="${profit_approved_payback}"
                        onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 45"
                    ></td>
                </tr>
                <tr>
                    <th>
                        Bank's loss:<br />Loan approved and person does not repay
                    </th>
                    <td
                        contenteditable="true"
                        data-correct="${profit_approved_no_payback}"
                        onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 45"
                    ></td>
                </tr>
                <tr>
                    <th>
                        Total profit for ${num_people_payback} people who
                        repay their loan and ${num_people_no_payback}
                        people who do not repay
                    </th>
                    <td
                        contenteditable="true"
                        data-correct="${total_profit}"
                        onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 45"
                    ></td>
                </tr>
            </tbody>
        </table>
    </div>
`);
```

<button id="validateButton" class="btn btn-primary">Check result</button>

```js
import { eventListenerValidationNumeric } from "./js/validateInput.js";

eventListenerValidationNumeric(
    "#creditTable td[contenteditable]",
    "validateButton"
);
```
