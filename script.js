const app = document.getElementById("app")


let selectedMode = null 
let frenchSentences =[]
const frenchWords = [
  "je", "tu", "elle", "nous", "vous", "ils", "elles",
  "suis", "es", "est", "sommes", "êtes", "sont",
  "vais", "vas", "va", "allons", "allez", "vont",
  "ai", "avons", "avez", "ont",

  "le", "la", "les", "une", "des", "du",
  "de", "dans", "avec", "pour", "sur", "chez",
  "au", "aux",

  "ce", "cet", "cette", "ces",
  "mon", "ma", "mes", "ton", "ta", "tes",
  "notre", "votre", "leur", "leurs",

  "où", "qui", "quoi", "quand", "comment", "pourquoi",

  "bonjour", "salut", "bonsoir", "merci",
  "bientôt", "soirée", "journée", "demain",
  "aujourd'hui", "maintenant",

  "maison", "école", "voiture", "train", "avion",
  "chien", "fille", "fils", "grand-mère",

  "manger", "parler", "prendre", "aller", "venir",
  "voir", "dire", "faire", "vouloir", "pouvoir"
];

let generatedSentences = [
  {
    french: "Je vais à la maison.",
    english: "I am going home."
  },
  {
    french: "Elle prend le train demain.",
    english: "She is taking the train tomorrow."
  }
];

let currentSentenceIndex = 0

// RENDER FUNCTIONS
function renderHomeScreen(){

let homeUi = buildHomePageUI()

app.replaceChildren(homeUi)
}




function renderLearningScreen(){
  let learningUi = buildLearningScreenUI()

  app.replaceChildren(learningUi)
}

function renderImportScreen(){
  let importScreen = buildImportScreenUI()

  app.replaceChildren(importScreen)
}

function renderCompletionScreen(){
  let completionScreen = buildCompletionScreenUI()
  app.replaceChildren(completionScreen)
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

})

listenBtn.addEventListener("click", function(){
  selectedMode = "listening"
  renderImportScreen()
  
})

div.append(speechBtn,listenBtn)

return div

}


function buildLearningScreenUI(){
  let p = document.createElement("p")
  let div = document.createElement("div")
  let btn = document.createElement("button")
  let input = document.createElement ("input")

  
  p.textContent = generatedSentences[currentSentenceIndex].french
  btn.textContent = "enter"
  input.placeholder = "what did you hear?"

  btn.addEventListener("click", function(){
    if(currentSentenceIndex === generatedSentences.length - 1){
    renderCompletionScreen()
    }else {
    
    currentSentenceIndex++
    renderLearningScreen()
    }
    
    
  })

  div.append(p,input,btn )

  return div 
}

function buildImportScreenUI(){
  let div = document.createElement("div")
  let p = document.createElement("p")
  let fileInput = document.createElement("input")
  let successMsg = document.createElement("p")
  let btn = document.createElement("button")

  p.textContent = "Import anki cards below"
  btn.textContent = "Start practicing"

  btn.addEventListener("click", ()=>{renderLearningScreen()})
  


  fileInput.type = "file"
  fileInput.accept = ".txt,.csv"

  fileInput.addEventListener("change",function(){
    handleExtractFrench(event, function(){
      successMsg.textContent = `${frenchSentences.length} scentences imported`
      div.append(successMsg, btn)
    })

  })

div.append(p,fileInput)
return div
}

function buildCompletionScreenUI(){
  let p = document.createElement("p")
  let btn = document.createElement("button")
  let div = document.createElement("div")

  p.textContent = "scentences completed"
  btn.textContent = "generate more"
  div.append(p,btn)

  return div
}



//EVENT HANDLERS 
function handleExtractFrench(event, onComplete){
  let file = event.target.files[0]

  file.text()
  .then(function(data){
    let lines = data.split("\n")
    lines.forEach(element => {
      
      let newLine = element.split("\t")

      console.log(newLine) 

      if(newLine.length !== 2){
        return
      }else{
      let leftSide = newLine[0]
      let rightSide = newLine[1]

      let leftWords = leftSide.split(" ")
      let rightWords = rightSide.split(" ")

      let checkLeft = leftWords.some(element=>{
        return frenchWords.includes(element);
      })

      if(checkLeft === true){
       frenchSentences.push(leftSide)
      } else frenchSentences.push(rightSide)
    
      console.log(frenchSentences) 
      }
      onComplete()
    }) 

  })
  }


  

renderHomeScreen()