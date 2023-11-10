//email: sophie.bluel@test.tld
//password: S0phie
const navLogout = document.querySelector(".navLogout")
const navLogin = document.querySelector(".navLogin")
const bandeauEdition = document.querySelector(".bandeauEdition")
const filtre = document.querySelector(".filtres")
const famodifier = document.querySelector(".fa-modifier")
const textModifier = document.querySelector(".textModifier")

//Affichage menu logIn / logOut
function menuConnection(){
	let token = window.sessionStorage.getItem("token")
	console.log(token)
	if (token != null){
		navLogin.classList.add("objetCache")
		navLogout.classList.remove("objetCache")
		bandeauEdition.classList.remove("objetCache")
		filtre.classList.add("objetCache")
		famodifier.classList.remove("objetCache")
		textModifier.classList.remove("objetCache")
		} else {
		navLogin.classList.remove("objetCache")
		navLogout.classList.add("objetCache") 
		bandeauEdition.classList.add("objetCache")
		filtre.classList.remove("objetCache")
		famodifier.classList.add("objetCache")
		textModifier.classList.add("objetCache")
		}}
	
menuConnection()
	
	//Déconnection
	navLogout.addEventListener ("click", function (event){
		event.preventDefault()
		window.sessionStorage.removeItem("token")
		console.log(window.sessionStorage.getItem("token"))
		menuConnection()
	})


const reponseWorks = await fetch ("http://localhost:5678/api/works") 
let worksArchitect = await reponseWorks.json ()
console.log (worksArchitect)

const reponseCategories = await fetch ("http://localhost:5678/api/categories") 
let categories = await reponseCategories.json()
console.log(categories)

//Générer travaux sur page d'accueil depuis serveur

function genererWorks(works) {
	for (let i = 0; i < works.length; i++) {

		const work = works[i];
		// Récupération de l'élément du DOM qui accueillera les projets
		const gallery = document.querySelector(".gallery");
		// Création d’une balise dédiée à un projet de la gallery
		const galleryElement = document.createElement("figure");
		galleryElement.dataset.id = works[i].id;
		// Création des balises 
		const imageElement = document.createElement("img");
		imageElement.src = work.imageUrl;
		const nomElement = document.createElement("figcaption");
		nomElement.innerText = work.title;

		// On rattache la balise article a la section Fiches
		gallery.appendChild(galleryElement);
		galleryElement.appendChild(imageElement);
		galleryElement.appendChild(nomElement);
		}

}

genererWorks(worksArchitect);

//Générer un set regroupant toutes les catégories existantes depuis les travaux
const setCategories = new Set();

function genererCategories (categories) {
for (let i = 0; i < categories.length; i++) {
	const workCategorie = worksArchitect[i].category
	setCategories.add(workCategorie);
}}
genererCategories(categories)
console.log(setCategories)
console.log(setCategories.size)

//Générer les boutons filtres correspondant aux catégories de travaux
function genererFiltres (setCategories){
	setCategories.forEach(function(object) {
	const nomFiltre = object.name
	const numeroCategorie = object.id
	console.log(nomFiltre)
	console.log(numeroCategorie)
	const boutonFiltre = document.createElement("button")
	boutonFiltre.innerText = nomFiltre
	boutonFiltre.classList=`boutonFiltre ${nomFiltre} ${numeroCategorie}`
	boutonFiltre.id=`${nomFiltre}`
	filtre.appendChild(boutonFiltre)
	})
}

genererFiltres(setCategories)

//Filtres par catégories 

const listeFiltre = document.querySelectorAll(".boutonFiltre");
console.log(listeFiltre)
let worksFiltres = worksArchitect
let elementActive = document.querySelector(".tous")

for (let i = 0; i < listeFiltre.length; i++) {
		const element = listeFiltre[i]
		element.addEventListener ("click", function(element){
			listeFiltre.forEach(item => {
				item.classList.remove("selected")
			});
				elementActive = element.target
				console.log(element)
				console.log(elementActive)
			elementActive.classList.add("selected")
			console.log(elementActive.innerText)
			document.querySelector(".gallery").innerHTML=""
			if (elementActive.innerText === "Tous"){
				genererWorks(worksArchitect)
			} else {
			worksFiltres = worksArchitect.filter(function(work){
			return work.category.name === elementActive.innerText})
			console.log(worksFiltres)
			genererWorks(worksFiltres)
			}})};