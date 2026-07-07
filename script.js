const app = document.getElementById("app")


let selectedMode = null 
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

  p.textContent = "this is the learing screen"
  div.append(p)

  return div 
}

function buildImportScreenUI(){
  let div = document.createElement("div")
  let p = document.createElement("p")
  let fileInput = document.createElement("input")

  p.textContent = "Import anki cards below"

  fileInput.type = "file"
  fileInput.accept = ".txt,.csv"

  fileInput.addEventListener("change",function(event){
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
 let frenchSentence = null 
      if(checkLeft === true){
       frenchSentence = leftSide
      } else frenchSentence = rightSide
    
      console.log(frenchSentence) 
      }

      
    }) 
 
  })


  })

div.append(p,fileInput)



return div

}

renderHomeScreen()