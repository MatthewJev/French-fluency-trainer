import {renderImportScreen} from "./app.js"
import {setSelectedMode} from "./app.js"


export function buildHomePageUI(){
let div = document.createElement("div")

let header = document.createElement("p")
let subtitle = document.createElement("p")

let modeCards = document.createElement("div")

let listenCard = document.createElement("div")
let speakingCard = document.createElement("div")
let listenDiscrptn = document.createElement("p")
let speakDiscrptn = document.createElement("p")

let speechBtn = document.createElement("button")
let listenBtn = document.createElement("button")

listenCard.append(listenBtn,listenDiscrptn)
speakingCard.append(speechBtn,speakDiscrptn)

modeCards.append(listenCard,speakingCard)

div.className = "home-screen"
modeCards.className = "mode-container"
listenCard.className = "mode-card"
speakingCard.className = "mode-card"
speechBtn.className = "primary-button"
listenBtn.className = "primary-button"


header.textContent = "French Fluency Trainer"
subtitle.textContent = "Build confidence understanding and speaking real-world French"
speechBtn.textContent = "Practice Speech"
listenBtn.textContent = "Practice Listening"
listenDiscrptn.textContent = "Listen to realistic French and type what you hear"
speakDiscrptn.textContent = "Improve your pronunciation by speaking French out loud (coming soon)"

speechBtn.addEventListener("click", function(){
setSelectedMode("speech")
})

listenBtn.addEventListener("click", function(){
  setSelectedMode("listening")
  renderImportScreen()
  
})

div.append(header, subtitle, modeCards)

return div

}