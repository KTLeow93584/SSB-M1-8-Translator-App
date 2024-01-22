import { retrieveTranslationGlossaries, translate } from "./translate.js";

function translateText() {
  // ====================================
  // Store Input Text from Text Area.
  const inputText = document.getElementById("input-text").value;
  if (inputText.trim().length === 0)
    return;
  // ====================================
  // Get Glossary of translated words with its output language categories, based on input language.
  const inputLanguage = document.getElementById("input-language-selector").value;
  const wordGlossaries = retrieveTranslationGlossaries(inputLanguage);
  // Unsupported language, early exit.
  if (wordGlossaries === null)
  {
    showErrorResponse(inputText);
    return;
  }
  // ====================================
  // Get Glossary of translated words after filtering with output language.
  const outputLanguage = document.getElementById("output-language-selector").value;
  // ====================================
  // Return Translated Word.
  const translated = translate(inputLanguage, outputLanguage, inputText);

  if (translated === null || translated === undefined)
    showErrorResponse(inputText);
  else
    showSuccessfulTranslationResponse(translated);
  // ====================================
}

function swapInputOutput() {
  // ====================================
  // Swap Input <-> Output Text Area Values.
  const inputTextElement = document.getElementById("input-text");
  const outputTextElement = document.getElementById("output-text");

  let tempText = inputTextElement.value;

  // Debug
  //console.log("[Before] Input: " + inputTextElement.value + ", Output: " + outputTextElement.value);
  
  inputTextElement.value = outputTextElement.value;
  outputTextElement.value = tempText;

  // Debug
  //console.log("[After 2] Input: " + inputTextElement.value + ", Output: " + outputTextElement.value);
  // ====================================
  // Swap Input Dropdown Selectors <-> Output Dropdown Selectors' Selected Index.
  const inputLanguageSelector = document.getElementById("input-language-selector");
  const outputLanguageSelector = document.getElementById("output-language-selector");
  
  let tempIndex = inputLanguageSelector.selectedIndex;

  inputLanguageSelector.selectedIndex = outputLanguageSelector.selectedIndex;
  outputLanguageSelector.selectedIndex = tempIndex;
  // ====================================
}

function showErrorResponse(output) {
  const translatedElement = document.getElementById("output-text");
  translatedElement.value = output;

  if (!translatedElement.classList.contains("output-error-text"))
    translatedElement.classList.add("output-error-text")

  const resultElement = document.getElementById("result");
  resultElement.textContent = "Translation Failed!";

  if (!resultElement.classList.contains("output-error-text"))
      resultElement.classList.add("output-error-text")
}

function showSuccessfulTranslationResponse(output) {
  const translatedElement = document.getElementById("output-text");
  translatedElement.value = output;

  if (translatedElement.classList.contains("output-error-text"))
    translatedElement.classList.remove("output-error-text")

  const resultElement = document.getElementById("result");
  resultElement.textContent = "Translation Succeeded!";

  if (resultElement.classList.contains("output-error-text"))
      resultElement.classList.remove("output-error-text")
}

window.translateText = translateText;
window.swapInputOutput = swapInputOutput;
