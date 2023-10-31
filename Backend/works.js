

const reponse = await fetch ("http://localhost:5678/api/works") 
let worksArchitect = await reponse.json ()

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