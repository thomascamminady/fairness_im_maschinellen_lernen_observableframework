// Translates German data labels to English
export function translateData(data) {
  // Create a copy of the data array
  const translatedData = [...data];
  
  translatedData.forEach(d => {
    if (d.type === "Zahlt zurück") {
      d.type = "Repays";
    } else if (d.type === "Zahlt nicht zurück") {
      d.type = "Does not repay";
    }
    if (d.age === "Jung") {
      d.age = "Young"; 
    } else if (d.age === "Alt") {
      d.age = "Old";
    }
  });
  return translatedData;
}
