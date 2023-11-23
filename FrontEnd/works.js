//email: sophie.bluel@test.tld
//password: S0phie
const navLogout = document.querySelector(".navLogout")
const navLogin = document.querySelector(".navLogin")
const bandeauEdition = document.querySelector(".bandeauEdition")
const filtre = document.querySelector(".filtres")
const famodifier = document.querySelector(".fa-modifier")
const textModifier = document.querySelector(".textModifier")
let tokenSession = window.sessionStorage.getItem("token")
let worksArchitect = null
let categories = null

//Affichage menu logIn / logOut
function menuConnection(){
	tokenSession = window.sessionStorage.getItem("token")
	if (tokenSession != null){
		navLogin.classList.add("objetCache")
		navLogout.classList.remove("objetCache")
		bandeauEdition.classList.remove("objetCache")
		filtre.classList.add("objetCache")
		famodifier.classList.remove("objetCache")
		textModifier.classList.remove("objetCache")
		console.log("Utilisateur connecté")
		} else {
		navLogin.classList.remove("objetCache")
		navLogout.classList.add("objetCache") 
		bandeauEdition.classList.add("objetCache")
		filtre.classList.remove("objetCache")
		famodifier.classList.add("objetCache")
		textModifier.classList.add("objetCache")
		console.log("Utilisateur déconnecté")
		}
	}
	
	//Déconnection
	navLogout.addEventListener ("click", function (event){
		event.preventDefault()
		window.sessionStorage.removeItem("token")
		menuConnection()
		genererCategories(categories)
		genererFiltres(setCategories)
		console.log("Utilisateur déconnecté")
	})

async function interrogerAPIWorks () {
const reponseWorks = await fetch ("http://localhost:5678/api/works") 
worksArchitect = await reponseWorks.json ()
console.log(worksArchitect)
return worksArchitect}

async function interrogerAPICategories () {
const reponseCategories = await fetch ("http://localhost:5678/api/categories") 
categories = await reponseCategories.json()
console.log(categories)
return categories}


//Générer travaux sur page d'accueil depuis serveur
function genererWorks(works) {
		for (let i = 0; i < works.length; i++) {
		const work = works[i];
		// Récupération de l'élément du DOM qui accueillera les projets
		const gallery = document.querySelector(".gallery");
		// Création d’une balise dédiée à un projet de la gallery
		const galleryElement = document.createElement("figure");
		galleryElement.dataset.id = works[i].id;
		galleryElement.classList.add(`element${works[i].id}`)
		galleryElement.classList.add('workExistant')
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
		console.log("Galerie à jour")

}

//Générer un set regroupant toutes les catégories existantes depuis les travaux
const setCategories = new Set();

function genererCategories (categories) {
for (let i = 0; i < categories.length; i++) {
	const workCategorie = worksArchitect[i].category
	setCategories.add(workCategorie);
}}

//Générer les boutons filtres correspondant aux catégories de travaux
function genererFiltres (categories, boutonsExistant){
	boutonsExistant = document.querySelectorAll(".boutonExistant")
	for (let i = 0; i < boutonsExistant.length; i++) {
		const element = boutonsExistant[i]
		remove(element)}
	categories.forEach(function(object) {
	const nomFiltre = object.name
	const numeroCategorie = object.id
	const boutonFiltre = document.createElement("button")
	boutonFiltre.innerText = nomFiltre
	boutonFiltre.classList=`boutonFiltre boutonExistant ${nomFiltre} ${numeroCategorie}`
	boutonFiltre.id=`${nomFiltre}`
	filtre.appendChild(boutonFiltre)
	console.log("Filtres générés")
	activerFiltres(worksArchitect)
	})
}

// Initialisation galerie page accueil
function galerieAccueil () {
	interrogerAPIWorks()
.then (worksArchitect => {
	genererWorks(worksArchitect)})
	interrogerAPICategories()
.then (categories  => {
	genererCategories(categories)
	genererFiltres(categories)
	})
}

// Chargement page accueil
menuConnection()
galerieAccueil()

//Filtres par catégories 
function activerFiltres(worksArchitect) {
	const listeFiltre = document.querySelectorAll(".boutonFiltre");
	let worksFiltres = worksArchitect
	let elementActive = document.querySelector(".tous")
for (let i = 0; i < listeFiltre.length; i++) {
		const element = listeFiltre[i]
		element.addEventListener ("click", function(element){
			listeFiltre.forEach(item => {
				item.classList.remove("selected")
			});
			elementActive = element.target
			elementActive.classList.add("selected")
			document.querySelector(".gallery").innerHTML=""
			if (elementActive.innerText === "Tous"){
				genererWorks(worksArchitect)
				} else {
				worksFiltres = worksArchitect.filter(function(work){
				return work.category.name === elementActive.innerText})
				genererWorks(worksFiltres)
			}})}}



// Générer galerie modale
function genererMinigallery(works) {
	for (let i = 0; i < works.length; i++) {
		const work = works[i];
		// Récupération de l'élément du DOM qui accueillera les projets
		const minigallery = document.querySelector(".mini-gallery");
		// Création d’une balise dédiée à un projet de la gallery
		const galleryElement = document.createElement("figure");
		galleryElement.dataset.id = works[i].id;
		galleryElement.classList.add(`element${works[i].id}`)
		galleryElement.classList.add('workExistant')
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
			}}
		
//Modale
const lienModifier = document.querySelector(".modifier")
let modal1 = null
let modal2 = null
const body = document.querySelector(".body")
const footer = document.querySelector(".footer")
const input = document.querySelectorAll(".input")
const targetModal = document.getElementById("modalModifier")
const divFermeture = document.querySelector(".divFermeture")
let boutonSelectPhoto = null

//Apparition fenêtre
lienModifier.addEventListener ("click", async function (event){
	event.preventDefault()
	if (modal1 === null){
	const html = await fetch("modal.html").then(response =>response.text())
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
	modal1 = document.querySelector(".modalGalerie")
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
	modal1.setAttribute("aria-hidden","false")
	modal1.setAttribute("aria-modal", "true")
	modal1.classList.remove("objetCache")
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
	modal2.setAttribute("aria-hidden","true")
	modal2.setAttribute("aria-modal", "false")
	modal2.classList.add("objetCache")
	modal1.setAttribute("aria-hidden","true")
	modal1.setAttribute("aria-modal", "false")
	modal1.classList.add("objetCache")
	})}

//Suppression élément galerie
function suppWork (event) {
	event.preventDefault()
	if(event.target.classList.contains("suppWork")){
			tokenSession = window.sessionStorage.getItem("token")
			let trashActive = event.target
			let urlDelete = `http://localhost:5678/api/works/${trashActive.id}`
			fetch (urlDelete, {
       		method: "DELETE",
			headers: {Authorization: `Bearer ${tokenSession}`}
   			 })
   		.then (async (response) => { 
        console.log (response)
        if (response.status === 204) {
			console.log("suppression ok")
			const element = document.querySelectorAll(`.element${trashActive.id}`)
			console.log(element)
			element.forEach (item => {
				item.remove()
			})
        } else {
			console.log(response.status)
		}
		})}}


//Ouvrir modale Ajouter photo
async function ouvrirModal2(event, targetModal) {
		event.preventDefault()
		const modal1 = document.querySelector(".modalGalerie")
		if (modal2 === null) {
		const html2 = await fetch("modal2.html").then(response =>response.text())
		const element = document.createRange().createContextualFragment(html2).querySelector(".modalAjout")
		modal1.setAttribute("aria-hidden","true")
		modal1.setAttribute("aria-modal", "false")
		modal1.classList.add("objetCache")
		targetModal = document.querySelector(".divModal")
		targetModal.appendChild(element)
		genererSelect(categories)
		modal2 = document.querySelector(".modalAjout")
		boutonSelectPhoto = document.getElementById("ajouterImage")
		boutonSelectPhoto.addEventListener("change", previewImage)
		let boutonRetour = document.querySelector(".retour")
		boutonRetour.addEventListener("click", retourModal1)
		const croixModal = document.querySelector(".fermer2")
		croixModal.addEventListener("click", fermerModal)
		let champTitrePhoto = document.querySelector(".titrePhoto")
		champTitrePhoto.addEventListener("input",testForm) 
		} else{
			modal1.setAttribute("aria-hidden","true")
			modal1.setAttribute("aria-modal", "false")
			modal1.classList.add("objetCache")
			modal2.setAttribute("aria-hidden","false")
			modal2.setAttribute("aria-modal", "true")
			modal2.classList.remove("objetCache")
		}}

//Vérification formulaire ajout photo
function testForm() {
		const file = boutonSelectPhoto.files[0];
		let titrePhoto = document.querySelector(".titrePhoto").value
		let boutonValiderAjout = document.querySelector(".boutonValiderAjout")
		if ((titrePhoto === "") || (file === undefined)) {
			console.log("formulaire faux")
			boutonValiderAjout.setAttribute("disabled", "true")
			boutonValiderAjout.removeEventListener("click", ajoutPhoto)
		} else {
		boutonValiderAjout.removeAttribute("disabled")
		boutonValiderAjout.addEventListener("click", ajoutPhoto)
		console.log("formulaire ok")}}

//Catégories pour modale ajout photo
function genererSelect (categories){
	let categorieSelect = document.querySelector(".categorie")
	categories.forEach(function(object) {
	const nomOption = object.name
	const option = document.createElement("option")
	option.innerText = nomOption
	option.value=object.id
	categorieSelect.appendChild(option)
		})}

//Retour modale 1 (suppression projets)
function retourModal1(){
	const modal1 = document.querySelector(".modalGalerie")
	const modal2 = document.querySelector(".modalAjout")
		modal1.removeAttribute("aria-hidden")
		modal1.setAttribute("aria-modal", "true")
		modal1.classList.remove("objetCache")
		modal2.setAttribute("aria-hidden","true")
		modal2.setAttribute("aria-modal", "false")
		modal2.classList.add("objetCache")
		resetModal2()
}

//Reset Modal2
function resetModal2 () {
	const imagePreviewContainer = document.getElementById('previewImageContainer')
	imagePreviewContainer.classList.add("objetCache")
	const iconePhoto = document.querySelector(".iconePhoto")
   	iconePhoto.classList.remove("objetCache")
	const ajouterImageLabel = document.querySelector(".ajouterImage")
	ajouterImageLabel.classList.remove("opacity0")
	ajouterImageLabel.classList.add("flex")
   	ajouterImage.classList.remove("objetCache")
	const infoImage = document.querySelector(".infoImage")
	infoImage.classList.remove("objetCache")
	document.querySelector(".formAjoutProjet").reset()
	testForm()
}

 // Afficher miniature
	function previewImage(event) {
	const messageErreurPhotoLoad = document.querySelector(".messageErreurPhotoLoad")
	const file = boutonSelectPhoto.files[0];
	const imagePreviewContainer = document.getElementById('previewImageContainer');
	if(file.size > 4194304){
		messageErreurPhotoLoad.innerText = "Choisir une photo de 4mo max"
	}else{
	if(file.type.match('image/png')||file.type.match('image/jpeg')){
		messageErreurPhotoLoad.innerText = ""
	 	const reader = new FileReader();
	  	reader.addEventListener('load', function (event) {
		const imageUrl = event.target.result;
		const image = new Image();
		image.addEventListener('load', function() {
		imagePreviewContainer.innerHTML = ''; // Vider le conteneur au cas où il y aurait déjà des images.
		imagePreviewContainer.appendChild(image);
		testForm()
		});
		image.src = imageUrl;
		image.style.width = '129px'; 
		image.style.height = '169px';
	  });
	  reader.readAsDataURL(file);
	  imagePreviewContainer.classList.remove("objetCache")
	  const iconePhoto = document.querySelector(".iconePhoto")
	  iconePhoto.classList.add("objetCache")
	  const ajouterImageLabel = document.querySelector(".ajouterImage")
	  ajouterImageLabel.classList.add("opacity0")
	  ajouterImageLabel.classList.remove("flex")
	  const infoImage = document.querySelector(".infoImage")
	  infoImage.classList.add("objetCache")
	}else{
		messageErreurPhotoLoad.innerText = "Choisir un fichier de type png ou jpg"
	}}}
 

//Ajout photo
function ajoutPhoto(event) {
	event.preventDefault()
	const messageErreurPhotoLoad = document.querySelector(".messageErreurPhotoLoad")
	const file = boutonSelectPhoto.files[0];
	let titrePhoto = document.querySelector(".titrePhoto").value
	if (file === undefined) {
		messageErreurPhotoLoad.innerText = "Veuillez charger une photo"
	} else {
	if (titrePhoto === "" ){
		messageErreurPhotoLoad.innerText = "Veuillez renseigner le titre"
	}else{
		messageErreurPhotoLoad.innerText = ""
	tokenSession = window.sessionStorage.getItem("token")
	let categoriePhoto = document.querySelector(".categorie").value
	const formData = new FormData()
	formData.append("image", file);
	formData.append("title", titrePhoto);
	formData.append("category", categoriePhoto);
	console.log(formData)
	fetch (`http://localhost:5678/api/works/`, {
    	method: "POST",
		headers: {"Authorization": `Bearer ${tokenSession}`},
		body: formData,
   		})
    .then (async (response) => { 
      console.log (response)
       if (response.status === 201) {
          const responseAjout = await response.json ()
			console.log(responseAjout)
			let workExistant = document.querySelectorAll(".workExistant")
			workExistant.forEach(item => {
			item.remove()
			})
			MAJGaleries ()
			messageErreurPhotoLoad.innerText = "Photo ajoutée"
			messageErreurPhotoLoad.classList.add("messageOK")
			setTimeout(resetMessage, 3000)
			resetModal2()
     } else {
		console.log(response.status)
		}
		})}}}

	//Reset message photo ajoutée
	function resetMessage () {
		let messageErreurPhotoLoad = document.querySelector(".messageErreurPhotoLoad")
		messageErreurPhotoLoad.innerText = ""
		messageErreurPhotoLoad.classList.remove("messageOK")
	}
  
	// MAJ galerie page accueil + mini-galerie modale
		function MAJGaleries () {
			interrogerAPIWorks()
			.then (worksArchitect => {
				genererMinigallery(worksArchitect)
				genererWorks(worksArchitect)
				})
		}