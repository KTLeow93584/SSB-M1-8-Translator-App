import { translationsEN } from "./language-en.js";
import { translationsES } from "./language-es.js";
import { translationsJP } from "./language-jp.js";
import { translationsMY } from "./language-my.js";

var activeGlossary = null;

export function retrieveTranslationGlossaries(language) {
  switch (language.toLowerCase()) {
    case "english":
      activeGlossary = translationsEN;
      break;
    case "japanese":
      activeGlossary = translationsJP;
      break;
    case "malay":
      activeGlossary = translationsMY;
      break;
    case "spanish":
      activeGlossary = translationsES;
    break;
    default:
      activeGlossary = null;
  }
  
  return activeGlossary;
}

export function translate(inputLanguage, outputLanguage, inputText) {
  // ====================================
  if (inputText.trim().length === 0 || inputText === null) {
    alert("The input field cannot be empty. Please try again once it is filled.");
    return null;
  }
  // ====================================
  const outputLangPascalCase = outputLanguage.slice(0,1).toUpperCase() + outputLanguage.slice(1).toLowerCase();
  
  const outputGlossary = activeGlossary[outputLanguage.toLowerCase()];
  if (outputGlossary === undefined) {
    alert(`Output Language (${outputLangPascalCase}) currently not supported.`);
    return null;
  }
  // ====================================
  const translatedText = outputGlossary[inputText.toLowerCase()];
  if (translatedText === undefined) {

    // Debug
    //const inputLangPascalCase = inputLanguage.slice(0,1).toUpperCase() + inputLanguage.slice(1).toLowerCase();
    //console.log(`Failed to translate the text "${inputText}" from ${inputLangPascalCase} to ${outputLangPascalCase}.`);
    
    return null;
  }
  // ====================================
  const translatedFirstLetterCapitalised = translatedText.slice(0,1).toUpperCase() + translatedText.slice(1).toLowerCase();
  
  // Debug
  //const inputPascalCase = inputText.slice(0,1).toUpperCase() + inputText.slice(1).toLowerCase();
  //console.log(`Translated "${inputPascalCase}" successfully to "${translatedFirstLetterCapitalised}".`);
  // ====================================
  return translatedFirstLetterCapitalised;
}