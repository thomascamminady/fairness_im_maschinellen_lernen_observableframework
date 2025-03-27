import confetti from "npm:canvas-confetti@1";

export function eventListenerValidationNumeric(selector, elementid) {
    const validateButton = document.getElementById(elementid);
    let allCorrect = true;

    validateButton.addEventListener("click", function () {
        document.querySelectorAll(selector).forEach((cell) => {
            const correctValue = parseInt(cell.getAttribute("data-correct"));
            const userValue = parseInt(cell.textContent.trim());

            console.log(correctValue, userValue);
            if (isNaN(userValue)) {
                cell.style.backgroundColor = "#ffebee"; // Light blue for invalid input
                allCorrect = false;
            } else if (userValue === correctValue) {
                cell.style.backgroundColor = "#e8f5e9"; // Light green for correct
            } else {
                cell.style.backgroundColor = "#ffebee"; // Light red for wrong answer
                allCorrect = false;
            }
        });
        if (allCorrect) {
            confetti();
        }
    });
}

export function eventListenerValidationString(selector, elementid) {
    const validateButton = document.getElementById(elementid);

    validateButton.addEventListener("click", function () {
        let allCorrect = true; // Reset for each click
        document.querySelectorAll(selector).forEach((cell) => {
            const correctValue = cell.getAttribute("data-correct").trim();
            const userValue = cell.textContent.trim();

            // Directly compare string values
            if (userValue === correctValue) {
                cell.style.backgroundColor = "#e8f5e9"; // Light green for correct answer
            } else {
                cell.style.backgroundColor = "#ffebee"; // Light red for wrong answer
                allCorrect = false;
            }
        });
        if (allCorrect) {
            confetti();
        }
    });
}
