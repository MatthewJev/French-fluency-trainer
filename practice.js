import {generatedSentences, setCurrentScentenceIndex} from "./app.js"
import { currentSentenceIndex } from "./app.js"
import { renderLearningScreen } from "./app.js"
import { renderCompletionScreen } from "./app.js"


export function buildLearningScreenUI(){
  let learningScreen = document.createElement("div")
  let learningContent = document.createElement("div")
  let question = document.createElement("p")
  let input = document.createElement ("input")
  let learningActions = document.createElement("div")
  let checkAnswer = document.createElement("button")
  let skipQuestion = document.createElement("button")
  let answerCorrect = document.createElement("p")
  let answerIncorrect = document.createElement("p")
  
  let answer = document.createElement("p")
  let showAnsBtn = document.createElement("button")
  



  learningScreen.classList = "learning-screen"
  learningContent.classList = "learning-content"
  input.className = "answer-input"
  learningActions.className = "learning-actions"
  checkAnswer.className ="check-button"
  skipQuestion.className ="skip-button"

  question.textContent = generatedSentences[currentSentenceIndex].french
  checkAnswer.textContent = "check"
  skipQuestion.textContent = "skip"
  input.placeholder = "what did you hear?"
  answerCorrect.textContent = `Amazing`
  answerIncorrect.textContent = `correct solution: ${generatedSentences[currentSentenceIndex].french}`

  checkAnswer.disabled = true

  input.addEventListener("input", function () {
    checkAnswer.disabled = input.value.trim() === ""
  })

  checkAnswer.addEventListener("click", function(){
    handleCheckAnswer(input,answer,learningActions,answerIncorrect,answerCorrect,skipQuestion)
  })

  skipQuestion.addEventListener("click", ()=>{
    handleNextScentence()
  })

  showAnsBtn.addEventListener("click", function(){

  })
  learningActions.append(checkAnswer,skipQuestion)
  learningScreen.append(question,input,learningActions)

  return learningScreen 
}



export function buildCompletionScreenUI(){
  let p = document.createElement("p")
  let btn = document.createElement("button")
  let div = document.createElement("div")

  p.textContent = "scentences completed"
  btn.textContent = "generate more"
  div.append(p,btn)

  return div
}


function handleCheckAnswer(input,answer,learningActions,answerIncorrect,answerCorrect,skipQuestion){
  console.log(input.value)
  answer.textContent= checkUserEntry(input)
  skipQuestion.textContent = "continue"


  if (answer.textContent === "Correct"){
    learningActions.replaceChildren(answerCorrect,skipQuestion )
  }else{
    learningActions.replaceChildren(answerIncorrect,skipQuestion)
  }

}


function handleNextScentence(){
  if (currentSentenceIndex === generatedSentences.length-1){
    renderCompletionScreen()
    return
  }

  setCurrentScentenceIndex(currentSentenceIndex + 1)
  renderLearningScreen()
}


function checkUserEntry(input){
  console.log(input.value)
  let cleanInput = normalize(input.value)
  let cleanGeneratedScentence = normalize(generatedSentences[currentSentenceIndex].french)

  console.log(cleanInput)
  console.log (cleanGeneratedScentence)

  if (cleanInput === cleanGeneratedScentence) {
    return "Correct"
  } else {
    return "Incorrect"
  }
}

function normalize(sentence){
  return sentence.toLowerCase().trim().replace(/[.,?!":;]/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}


