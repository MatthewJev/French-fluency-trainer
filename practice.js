import {generatedSentences, setCurrentScentenceIndex} from "./app.js"
import { currentSentenceIndex } from "./app.js"
import { renderLearningScreen } from "./app.js"
import { renderCompletionScreen } from "./app.js"


 export function buildLearningScreenUI(){
  let p = document.createElement("p")
  let div = document.createElement("div")
  let checkBtn = document.createElement("button")
  let skipBtn = document.createElement("button")
  let input = document.createElement ("input")
  let answer = document.createElement("p")
  let showAnsBtn = document.createElement("button")
  let responseIncorrect = document.createElement("div")
  let responseCorrect = document.createElement("div")



  p.textContent = generatedSentences[currentSentenceIndex].french
  checkBtn.textContent = "check"
  skipBtn.textContent = "skip"
  input.placeholder = "what did you hear?"

 checkBtn.disabled = true

input.addEventListener("input", function () {
    checkBtn.disabled = input.value.trim() === ""
})

  checkBtn.addEventListener("click", function(){
    handleCheckAnswer(answer, input, skipBtn, responseCorrect,responseIncorrect,div  )
  })

  skipBtn.addEventListener("click", ()=>{
    handleNextScentence()
  })

  showAnsBtn.addEventListener("click", function(){

  })
  div.append(p,input,checkBtn,skipBtn)

  return div 
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


 function handleCheckAnswer(answer, input, skipBtn, responseCorrect,responseIncorrect,div){
    answer.textContent= checkUserEntry(input)

   if (answer.textContent === "Correct"){
    skipBtn.textContent = "Continue"
    responseCorrect.replaceChildren(answer,skipBtn)
    div.append(responseCorrect)
   }else{
    skipBtn.textContent = "Continue"
    responseIncorrect.replaceChildren(answer, skipBtn)
    div.append(responseIncorrect)
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


