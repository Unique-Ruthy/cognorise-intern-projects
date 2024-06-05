// script.js

const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const calculateButton = document.getElementById("calculate");
const result = document.getElementById("result");

calculateButton.addEventListener("click", calculateBMI);

function calculateBMI() {
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    result.textContent = "Please enter valid weight and height values.";
    return;
  }

  // Convert height from cm to meters
  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

  let category;
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  result.textContent = `Your BMI is ${bmi}. Category: ${category}`;
}
