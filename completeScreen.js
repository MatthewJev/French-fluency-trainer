import { setGeneratedScenteces, renderLearningScreen, generatedSentences,currentSentenceIndex, setCurrentScentenceIndex } from "./app.js"


export function buildCompletionScreenUI(){
  let title = document.createElement("p")
  let subtitle = document.createElement("p")
  let continueButton = document.createElement("button")
  let completionScreen = document.createElement("div")
  let card = document.createElement("div")

  completionScreen.classList = "completionScreen"
  card.classList = "card"
  title.classList = "card-title"
  subtitle.classList = "card-subtitle"
  continueButton.classList = "card-button"

  title.textContent = "Session Complete!"
  subtitle.textContent = "You've finished all of today's listening practice."
  continueButton.textContent = "generate more"

  continueButton.addEventListener("click", function(){
  console.log("Button clicked");

fetch("http://localhost:3000/generated")
.then(response => response.json())
    .then(data => {
    
       setGeneratedScenteces(data)
       setCurrentScentenceIndex(0)
       console.log(generatedSentences);

console.log(currentSentenceIndex);

       renderLearningScreen()

    })

    .catch(error => {

        console.error("Error:", error);

    });

  })


  card.append(title,subtitle,continueButton)
  completionScreen.append(card)

  return completionScreen
}