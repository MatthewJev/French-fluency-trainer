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

 fileInput.addEventListener("change", function(event) {

  handleExtractFrench(event, function() {

    handleCompletedImport(successMsg, btn, div)

  })
})
div.append(p,fileInput)
return div
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

  function handleCompletedImport(successMsg, startPracticeBtn, div) {

  successMsg.textContent = `${frenchSentences.length} sentences imported`

  div.append(successMsg, startPracticeBtn)

}


  