//email: sophie.bluel@test.tld
//password: S0phie
const navLogout = document.querySelector(".navLogout")
const navLogin = document.querySelector(".navLogin")
const bandeauEdition = document.querySelector(".bandeauEdition")
const filtre = document.querySelector(".filtres")
const famodifier = document.querySelector(".fa-modifier")
const textModifier = document.querySelector(".textModifier")
let tokenSession = window.sessionStorage.getItem("token")

//Affichage menu logIn / logOut
function menuConnection(){
	tokenSession = window.sessionStorage.getItem("token")
	console.log(tokenSession)
	if (tokenSession != null){
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
		}
	}
	
menuConnection()
	
	//Déconnection
	navLogout.addEventListener ("click", function (event){
		event.preventDefault()
		window.sessionStorage.removeItem("token")
		console.log(window.sessionStorage.getItem("token"))
		menuConnection()
		genererCategories(categories)
		genererFiltres(setCategories)
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

console.log(setCategories)
console.log(setCategories.size)
genererCategories(categories)

//Générer les boutons filtres correspondant aux catégories de travaux
function genererFiltres (categories, boutonsExistant){
	boutonsExistant = document.querySelectorAll(".boutonExistant")
	for (let i = 0; i < boutonsExistant.length; i++) {
		const element = boutonsExistant[i]
		remove(element)}
	categories.forEach(function(object) {
	const nomFiltre = object.name
	const numeroCategorie = object.id
	console.log(nomFiltre)
	console.log(numeroCategorie)
	const boutonFiltre = document.createElement("button")
	boutonFiltre.innerText = nomFiltre
	boutonFiltre.classList=`boutonFiltre boutonExistant ${nomFiltre} ${numeroCategorie}`
	boutonFiltre.id=`${nomFiltre}`
	filtre.appendChild(boutonFiltre)
	})
}

genererFiltres(categories)

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

// Générer galerie modale
function genererMinigallery(works) {
	for (let i = 0; i < works.length; i++) {
			
		const work = works[i];
		// Récupération de l'élément du DOM qui accueillera les projets
		const minigallery = document.querySelector(".mini-gallery");
		// Création d’une balise dédiée à un projet de la gallery
		const galleryElement = document.createElement("figure");
		galleryElement.dataset.id = works[i].id;
		// Création des balises 
		const imageElement = document.createElement("img");
		imageElement.src = work.imageUrl;
		const trashElement = document.createElement("i")
		trashElement.classList.add("fa-solid")
		trashElement.classList.add("fa-trash-can")
		trashElement.classList.add("suppWork")
		trashElement.id = works[i].id
		// On rattache la balise article a la section Fiches
		minigallery.appendChild(galleryElement);
		galleryElement.appendChild(imageElement);
		galleryElement.appendChild(trashElement)

		// Ecoute de l'évènement click sur poubelle
		const modalGalerie = document.querySelector(".modalGalerie")
		modalGalerie.addEventListener("click",suppWork)
			}
		}
		
//Modale
const lienModifier = document.querySelector(".modifier")
let modal = null
let modal2 = null
const body = document.querySelector(".body")
const footer = document.querySelector(".footer")
const input = document.querySelectorAll(".input")
const targetModal = document.getElementById("modalModifier")
const divFermeture = document.querySelector(".divFermeture")

//Apparition fenêtre
lienModifier.addEventListener ("click", async function (event){
	event.preventDefault()
	if (modal === null){
	const html = await fetch("modal.html").then(response =>response.text())
	console.log(html)
	divFermeture.classList.remove("objetCache")
	targetModal.classList.remove("objetCache")
	targetModal.setAttribute("autofocus","true")
	body.classList.add("opaque")
	footer.classList.add("noBackground")
	input.forEach(item => {
		item.classList.add("noBackground")
	});
	const element = document.createRange().createContextualFragment(html).querySelector(".modalGalerie")
	targetModal.appendChild(element)
	element.removeAttribute('aria-hidden')
	element.setAttribute("aria-modal", "true")
	genererMinigallery(worksArchitect)
	modal = targetModal
	const boutonAjouter = document.querySelector(".boutonAjouter")
	boutonAjouter.addEventListener("click", ouvrirModal2)
	const croixModal = document.querySelector(".fermer1")
	croixModal.addEventListener("click", fermerModal) 
	divFermeture.addEventListener("click", fermerModal) 
	}
	else {
	targetModal.classList.remove("objetCache")
	divFermeture.classList.remove("objetCache")
	body.classList.add("opaque")
	footer.classList.add("noBackground")
	input.forEach(item => {
		item.classList.add("noBackground")
	});
	}
})

//Fermer modale 
function fermerModal(event){
	event.preventDefault()
	const element = document.querySelector(".modalGalerie")
	element.setAttribute("aria-hidden","true")
	element.removeAttribute("aria-modal")
	targetModal.classList.add("objetCache")
	divFermeture.classList.add("objetCache")
	body.classList.remove("opaque")
	footer.classList.remove("noBackground")
	input.forEach(item => {
		item.classList.remove("noBackground")
	})
}



//Suppression élément galerie
function suppWork (event) {
	event.preventDefault()
	if(event.target.classList.contains("suppWork")){
			tokenSession = window.sessionStorage.getItem("token")
			let trashActive = event.target
			console.log(event)
			console.log(trashActive)
			console.log(trashActive.id)
			let urlDelete = `http://localhost:5678/api/works/${trashActive.id}`
			console.log(urlDelete)
			console.log(tokenSession)
			fetch (urlDelete, {
        method: "DELETE",
		headers: {Authorization: `Bearer ${tokenSession}`}
    })
    .then (async (response) => { 
        console.log (response)
        if (response.status === 200) {
            const responseDelete = await response.json ()
            console.log(responseDelete)
			genererMinigallery(worksArchitect)
        } else {
			console.log(response.status)
		}
		})}}


//Ouvrir modale Ajouter photo
async function ouvrirModal2(event, targetModal) {
		event.preventDefault()
		const html2 = await fetch("modal2.html").then(response =>response.text())
		console.log(html2)
		const element = document.createRange().createContextualFragment(html2).querySelector(".modalAjout")
		const modalActive = document.querySelector(".modalGalerie")
		modalActive.setAttribute("aria-hidden","true")
		modalActive.setAttribute("aria-modal", "false")
		modalActive.classList.add("objetCache")
		console.log(modalActive)
		targetModal = document.querySelector(".divModal")
		targetModal.appendChild(element)
		genererSelect(categories)
		let boutonValiderAjout = document.querySelector(".boutonValiderAjout")
		boutonValiderAjout.addEventListener("click", ajoutPhoto(event))
}

//Catégories pour modale ajout photo
function genererSelect (categories){
	let categorieSelect = document.querySelector(".categorie")
	categories.forEach(function(object) {
	const nomOption = object.name
	console.log(nomOption)
	const option = document.createElement("option")
	option.innerText = nomOption
	option.value=`${nomOption}`
	categorieSelect.appendChild(option)
		})
}


 // Afficher miniature
 function previewImage() {
	const fileInput = document.getElementById('fileInput');
	const file = fileInput.files[0];
	const imagePreviewContainer = document.getElementById('previewImageContainer');
	
	if(file.type.match('image.*')){
	  const reader = new FileReader();
	  
	  reader.addEventListener('load', function (event) {
		const imageUrl = event.target.result;
		const image = new Image();
		
		image.addEventListener('load', function() {
		  imagePreviewContainer.innerHTML = ''; // Vider le conteneur au cas où il y aurait déjà des images.
		  imagePreviewContainer.appendChild(image);
		});
		
		image.src = imageUrl;
		image.style.width = '200px'; // Indiquez les dimensions souhaitées ici.
		image.style.height = 'auto'; // Vous pouvez également utiliser "px" si vous voulez spécifier une hauteur.
	  });
	  
	  reader.readAsDataURL(file);
	}
  }
 

//Ajout photo
function ajoutPhoto(event) {
	event.preventDefault()
	tokenSession = window.sessionStorage.getItem("token")
	let photo = document.getElementById("ajouterImage").value
	let titrePhoto = document.querySelector(".titrePhoto").value
	let categoriePhoto = document.querySelector(".categorie").value
	console.log(tokenSession)
	console.log(titrePhoto)
	console.log(categoriePhoto)
	console.log(photo)
 
  } 
	//fetch (`http://localhost:5678/api/works`, {
     //   method: "POST",
		//headers: {Authorization: `Bearer ${tokenSession}`,
	//	Content-type: "application/json; charset=UTF-8"},
	//	body: JSON.stringify({
	//		image: photo,
	//		title: titrePhoto,
	//		category: categoriePhoto
	//	})
   // })
  //  .then (async (response) => { 
    //    console.log (response)
   //     if (response.status === 200) {
    //        const responseAJout = await response.json ()
//console.log(responseAJout)
	//		genererMinigallery(worksArchitect)
   //     } else {
	//		console.log(response.status)
	//	}
	//	})}}