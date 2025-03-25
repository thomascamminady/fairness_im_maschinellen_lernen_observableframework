export function setupTableValidation(tableId, buttonId) {
console.log("called");
  document.addEventListener('DOMContentLoaded', function() {
    const validateButton = document.getElementById(buttonId);
    console.log("call setup");
    console.log(validateButton);
    
    validateButton.addEventListener('click', function() {
      console.log("test");
      document.querySelectorAll(`#${tableId} td[contenteditable]`).forEach(cell => {
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
} 