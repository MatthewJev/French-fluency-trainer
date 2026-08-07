import {renderImportScreen} from "./app.js"
import {setSelectedMode} from "./app.js"


export function buildHomePageUI(){
let div = document.createElement("div")

let speechBtn = document.createElement("button")
let listenBtn = document.createElement("button")



speechBtn.textContent = "Practice Speech"
listenBtn.textContent = "Practice Listening"

speechBtn.addEventListener("click", function(){
setSelectedMode("speech")
})

listenBtn.addEventListener("click", function(){
  setSelectedMode("listening")
  renderImportScreen()
  
})

div.append(speechBtn,listenBtn)

return div

}