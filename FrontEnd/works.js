

const reponse = await fetch ("http://localhost:5678/api/works") 
let worksArchitect = await reponse.json ()
console.log (worksArchitect)

//Générer travaux sur page d'accueil depuis serveur

function genererWorks(worksArchitect) {
	for (let i = 0; i < worksArchitect.length; i++) {

		const work = worksArchitect[i];
		// Récupération de l'élément du DOM qui accueillera les projets
		const gallery = document.querySelector(".gallery");
		// Création d’une balise dédiée à un projet de la gallery
		const galleryElement = document.createElement("figure");
		galleryElement.dataset.id = worksArchitect[i].id;
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


//Générer un set regroupant toutes les catégories existantes dans les travaux
const setCategories = new Set();

function genererCategories (worksArchitect) {
for (let i = 0; i < worksArchitect.length; i++) {
	const workCategorie = worksArchitect[i].category.name
	setCategories.add(workCategorie);
}}
genererCategories(worksArchitect)
console.log(setCategories)
console.log(setCategories.size)

//Générer les filtres correspondant aux catégories de travaux
function genererFiltres (setCategories){
	setCategories.forEach(function(value) {
	const nomFiltre = value
	console.log(nomFiltre)
	const Filtre = document.querySelector(".filtres")
	const boutonFiltre = document.createElement("button")
	boutonFiltre.innerText = nomFiltre
	boutonFiltre.classList=`boutonFiltre ${nomFiltre}`
	Filtre.appendChild(boutonFiltre)
	})
}

genererFiltres(setCategories)

//Filtre Objets
const listeFiltre = document.querySelectorAll(".boutonFiltre");
console.log(listeFiltre)
const filtreObjets = document.querySelector(".Objets");

filtreObjets.addEventListener("click",function(){
	for (let i = 0; i < listeFiltre.length; i++) {
		listeFiltre[i].classList.remove("selected");
	}
	filtreObjets.classList.add("selected")
	const worksObjets = worksArchitect.filter(function (work){
		return work.categoryId === 1;
	});
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(worksObjets);
});

//Filtre Appartements

const filtreAppart = document.querySelector(".Appartements");

filtreAppart.addEventListener("click",function(){
	for (let i = 0; i < listeFiltre.length; i++) {
		listeFiltre[i].classList.remove("selected");
	}
	filtreAppart.classList.add("selected")
	const worksAppart = worksArchitect.filter(function (work){
		return work.categoryId === 2;
	});
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(worksAppart);
});

//Filtre Hotels & restaurants

const filtreHotels= document.querySelector(".Hotels");

filtreHotels.addEventListener("click",function(){
	for (let i = 0; i < listeFiltre.length; i++) {
		listeFiltre[i].classList.remove("selected");
	}
	filtreHotels.classList.add("selected")
	const worksHotels = worksArchitect.filter(function (work){
		return work.categoryId === 3;
	});
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(worksHotels);
});

//Filtre tous
const filtreTous = document.querySelector(".filtreTous");

filtreTous.addEventListener("click", function(){
	for (let i = 0; i < listeFiltre.length; i++) {
		listeFiltre[i].classList.remove("selected");
	}
	filtreTous.classList.add("selected")
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(worksArchitect);
});
