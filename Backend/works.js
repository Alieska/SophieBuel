

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

//Filtre Objets

const filtreObjets = document.querySelector(".filtreObjets");

filtreObjets.addEventListener("click",function(){
	const worksObjets = worksArchitect.filter(function (work){
		return work.categoryId === 1;
	});
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(worksObjets);
});

//Filtre Appartements

const filtreAppart = document.querySelector(".filtreAppart");

filtreAppart.addEventListener("click",function(){
	const worksAppart = worksArchitect.filter(function (work){
		return work.categoryId === 2;
	});
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(worksAppart);
});

//Filtre Hotels & restaurants

const filtreHotels= document.querySelector(".filtreHotels");

filtreHotels.addEventListener("click",function(){
	const worksHotels = worksArchitect.filter(function (work){
		return work.categoryId === 3;
	});
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(worksHotels);
});

//Filter tous
const filtreTous = document.querySelector(".filtreTous");

filtreTous.addEventListener("click", function(){
	document.querySelector(".gallery").innerHTML = "";
	genererWorks(worksArchitect);
});