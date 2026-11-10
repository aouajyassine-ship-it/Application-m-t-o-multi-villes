
const button = document.getElementById("search-button")
const input = document.getElementById("city-input")
const erreur = document.getElementById("erreur")

button.addEventListener("click", function (event){
    event.preventDefault()
  if (input.value == ""){
    erreur.textContent = " remplir le champ avec une ville"
  }
})