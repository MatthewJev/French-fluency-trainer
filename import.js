import {renderLearningScreen} from "./app.js"
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

let frenchSentences =[]


export function buildImportScreenUI(){
  let importScreen = document.createElement("div")
  let title = document.createElement("p")
  let description = document.createElement("p")
  let uploadCard = document.createElement("div")
  let fileInput = document.createElement("input")
  let cardUploadDescription = document.createElement("p")
  let successMessage = document.createElement("p")
  let startButton = document.createElement("button")

  uploadCard.append(cardUploadDescription,fileInput,successMessage,startButton)

  title.textContent = "Import Anki deck"
  description.textContent = "Upload a text or CSV export containing your French sentence cards"
  cardUploadDescription.textContent = " Drag and drop or browse Supports .txt and .csv"
  startButton.textContent = "Start practicing"

  importScreen.className = "import-screen"
  title.className ="page-title"
  description.className = "page-subtitle"
  cardUploadDescription.className = "card-description"
  startButton.className = "card-button"

  uploadCard.className = "card"

  startButton.addEventListener("click", ()=>{renderLearningScreen()})
  

  fileInput.type = "file"
  fileInput.accept = ".txt,.csv"

 fileInput.addEventListener("change", function(event) {

  handleExtractFrench(event, function() {

    handleCompletedImport(successMessage, startButton, uploadCard)

  })
})
importScreen.append(title, description, uploadCard)
return importScreen
}


function handleExtractFrench(event, onComplete){
  let file = event.target.files[0]

  file.text()
  .then(function(data){
    let lines = data.split("\n")
    lines.forEach(element => {
      
      let newLine = element.split("\t")


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
    
      }
      onComplete()
    }) 

  })
  }

  function handleCompletedImport(successMsg, startPracticeBtn, uploadCard) {

  successMsg.textContent = `${frenchSentences.length} sentences imported`

  uploadCard.append(successMsg, startPracticeBtn)

}


  