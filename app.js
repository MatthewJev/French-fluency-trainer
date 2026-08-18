import { buildHomePageUI } from "./home.js";
import {buildImportScreenUI} from "./import.js"
import { buildLearningScreenUI } from "./practice.js";
import { buildCompletionScreenUI } from "./completeScreen.js";


const app = document.getElementById("app");

renderHomeScreen();


export let selectedMode = null 
export let currentSentenceIndex = 0


export function setGeneratedScenteces(scentence){
generatedSentences = scentence
}

export let generatedSentences = [
  {
    french: "Je vais à la maison.",
    english: "I am going home."
  },
  {
    french: "Elle prend le train demain.",
    english: "She is taking the train tomorrow."
  }
];



export function setSelectedMode(mode){
    selectedMode = mode
}

export function setCurrentScentenceIndex(index){
    currentSentenceIndex = index
}


function renderHomeScreen(){

let homeUi = buildHomePageUI()

app.replaceChildren(homeUi)
}



export function renderLearningScreen(){
  let learningUi = buildLearningScreenUI()

  app.replaceChildren(learningUi)
}

export function renderImportScreen(){
  let importScreen = buildImportScreenUI()

  app.replaceChildren(importScreen)
}

export function renderCompletionScreen(){
  let completionScreen = buildCompletionScreenUI()
  app.replaceChildren(completionScreen)
}

