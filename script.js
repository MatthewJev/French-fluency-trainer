const app = document.getElementById("app")

const sentences = {
  beginner: [
    {
      id: 1,
      french: "Bonjour, je m'appelle Mathieu.",
      english: "Hello, my name is Matthew."
    },
    {
      id: 2,
      french: "J'aime jouer au football.",
      english: "I like playing soccer."
    },
    {
      id: 3,
      french: "Je vais à l'école aujourd'hui.",
      english: "I am going to school today."
    }],


  intermediate: [
    {
      id: 4,
      french: "Je travaille à temps partiel pendant mes études.",
      english: "I work part-time during my studies."
    },
    {
      id: 5,
      french: "Nous avons regardé un film intéressant hier soir.",
      english: "We watched an interesting movie last night."
    },
    {
      id: 6,
      french: "J'essaie d'améliorer mon français chaque jour.",
      english: "I try to improve my French every day."
    }
  ],

  advanced: [
    {
      id: 7,
      french: "Bien que le projet soit difficile, nous continuerons à avancer.",
      english: "Although the project is difficult, we will continue to move forward."
    },
    {
      id: 8,
      french: "Si j'avais su plus tôt, j'aurais pris une décision différente.",
      english: "If I had known earlier, I would have made a different decision."
    },
    {
      id: 9,
      french: "Les technologies modernes transforment rapidement notre société.",
      english: "Modern technologies are rapidly transforming our society."
    }
  ]
};

let selectedMode = null 


// RENDER FUNCTIONS
function renderHomeScreen(){

let homeUi = buildHomePageUI()

app.replaceChildren(homeUi)
}


function renderDifficultySelectionScreen(){
  let difficultyUi = buildDifficultySelectionUI()

  app.replaceChildren(difficultyUi)
}


//BUILD FUNCTIONS 
function buildHomePageUI(){
let div = document.createElement("div")

let speechBtn = document.createElement("button")
let listenBtn = document.createElement("button")



speechBtn.textContent = "Practice Speech"
listenBtn.textContent = "Practice Listening"

speechBtn.addEventListener("click", function(){
  selectedMode = "speech"
  renderDifficultySelectionScreen()
})

listenBtn.addEventListener("click", function(){
  selectedMode = "listening"
  renderDifficultySelectionScreen()
})

div.append(speechBtn,listenBtn)

return div

}


function buildDifficultySelectionUI(){
let div = document.createElement("div")

let instructions = document.createElement("p")

let beginnerBtn = document.createElement("button")
let intermediateBtn = document.createElement("button")
let advancedBtn = document.createElement("button")

instructions.textContent = `select difficulty for your ${selectedMode} training`

beginnerBtn.textContent = "Beginner"
intermediateBtn.textContent = "Intermediate"
advancedBtn.textContent = "Advanced"

div.append(instructions, beginnerBtn,intermediateBtn,advancedBtn)

return div 
}

renderHomeScreen()