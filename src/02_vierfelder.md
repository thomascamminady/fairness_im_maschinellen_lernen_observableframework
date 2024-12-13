---
title: Vierfeldertafel
style: css/custom.css
---

# Vierfeldertafel

Eine Bank vergibt Kredite von 1000€. Manche Menschen bekommen einen Kredit, manche nicht. Manche Menschen zahlen den Kredit zurück, manche nicht. Wenn man zurück zahlt, zahlt man 1200€ zurück. Das ist inklusive 20% Zinsen. Wenn nicht zurück gezahlt wird, verliert die Bank 1000€.

Hier ist eine Vierfeldertafel:

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Kredit genehmigt</th>
                <th>Kredit abgelehnt</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Zahlt zurück</th>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
            </tr>
            <tr>
                <th>Zahlt nicht zurück</th>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
            </tr>
            <tr></tr>
        </tbody>
    </table>
</div>
```
