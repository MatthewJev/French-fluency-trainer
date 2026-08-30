
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
  let feedback = document.createElement("div")
  let feedbackTitle = document.createElement("p")
  let feedbackAnswer = document.createElement("p")
  
  let answer = document.createElement("p")
  let showAnsBtn = document.createElement("button")
  



  learningScreen.classList = "learning-screen"
  learningContent.classList = "learning-content"
  input.className = "answer-input"
  learningActions.className = "learning-actions"
  checkAnswer.className ="check-button"
  skipQuestion.className ="skip-button"
  feedback.className = "feedback"
  feedbackAnswer.className = "feedback-answer"
  feedbackTitle.className = "feedback-title"

  question.textContent = generatedSentences[currentSentenceIndex].french
  checkAnswer.textContent = "check"
  skipQuestion.textContent = "skip"
  input.placeholder = "what did you hear?"


  checkAnswer.disabled = true

  input.addEventListener("input", function () {
    checkAnswer.disabled = input.value.trim() === ""
  })

  checkAnswer.addEventListener("click", function(){
    handleCheckAnswer(input,answer,learningActions,feedback,feedbackTitle,feedbackAnswer)
  })

  skipQuestion.addEventListener("click", ()=>{
    handleCheckAnswer(input,answer,learningActions,feedback,feedbackTitle,feedbackAnswer)
  })

  showAnsBtn.addEventListener("click", function(){

  })
  feedback.append(feedbackTitle,feedbackAnswer)
  learningActions.append(checkAnswer,skipQuestion)
  learningContent.append(question,input,learningActions)
  learningScreen.append(learningContent,learningActions)

  return learningScreen 
}




function handleCheckAnswer(input,answer,learningActions,feedback,feedbackTitle,feedbackAnswer){
  console.log(input.value)
  answer.textContent= checkUserEntry(input)
 let continueButton = document.createElement("button")
 continueButton.textContent = "continue"

 continueButton.addEventListener("click", ()=>{
  handleNextScentence()
 })

if (answer.textContent === "Correct") {

    feedback.className = "feedback feedback-correct"
    learningActions.className = "learning-actions learning-actions-correct"

    feedbackTitle.textContent = "Nice Work!"
    feedbackAnswer.textContent = ""

    continueButton.className = "continue-button continue-button-correct"

    learningActions.replaceChildren(feedback, continueButton)

} else {

    feedback.className = "feedback feedback-incorrect"
    learningActions.className = "learning-actions learning-actions-incorrect"

    feedbackTitle.textContent = "Not quite!"
    feedbackAnswer.textContent =
        `Correct answer: ${generatedSentences[currentSentenceIndex].english}`

    continueButton.className = "continue-button continue-button-incorrect"

    learningActions.replaceChildren(feedback, continueButton)
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


