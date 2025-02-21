---
title: "Kreditvergabe und Gesamtgewinn"
style: css/custom.css
---

```js
const lang = "en"
const texts = FileAttachment("translations/text_02.json").json();
```

# ${texts[lang].heading}

${texts[lang].description}

```js
html`<div class="tip" label=${texts[lang].task}>${texts[lang].tip}</div>`
```

```js
html`<div class="table-container">

    <table>
        <thead>
            <tr>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>${texts[lang].table.row1}</th>
                <td contenteditable="true"></td>
            </tr>
            <tr>
                <th>${texts[lang].table.row2}</th>
                <td contenteditable="true"></td>
            </tr>
            <tr>
                <th>${texts[lang].table.row3}</th>
                <td contenteditable="true"></td>
            </tr>
            <tr></tr>
        </tbody>
    </table>

</div>`
```
