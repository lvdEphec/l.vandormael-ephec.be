"use strict";

/* lvd Pâques 2020 */
/* Script pour tester des requêtes en utilisant ajax et pour construire dynmiquement du code HTML */

/* Ce code va récupérer les noms en français,
trie sur base des noms 
et affiche toute la liste des espèces en une fois.
Il utilise fetch et Promise.all pour cela. Il est possible de s'en passer et d'utiliser xhr. */


/************ CONSTANTES et variables globales **************/
const POKE_API_URL_HABITAT = "https://pokeapi.co/api/v2/pokemon-habitat";

let liensEspecesHabitats = []; // [ {id: , nom: , urlsEspecesPokemons: }, ]


/************ Gestions du chargement initial de la page **************/

//window.addEventListener('load', initialiser);
document.addEventListener('DOMContentLoaded', initialiser);


function initialiser() {
    document.getElementById("choixHabitat").addEventListener('change', chargerEspeces);

    chargerHabitats();
}

/************ Chargement de la liste des choix s'habitats **************/

function chargerHabitats() {
	
	fetch(POKE_API_URL_HABITAT)
	.then(reponse => reponse.json())
	.then(reponse => {recupererHabitatsfr(reponse.results.map(x => x.url))})
	.catch(error => {console.log("Y a un problème ! : " + error.message)});
};
	

function recupererHabitatsfr(habitatsUrls) {
    try {		
		Promise.all(
            habitatsUrls.map( url => fetch(url)
									.then(reponse => reponse.json())
									.then(habitats => { 
										let habitat = {};
										habitat.id = habitats.id;
					                    habitat.nom = habitats.names.filter(x => x.language.name === "fr")[0].name;
										habitat.urlsEspecesPokemons = habitats.pokemon_species.map(x => x.url);
										return habitat;
					                })
							)
		)										
		.then (habitats => {remplirListeHabitats(habitats) } );
	}
    catch(err) {
        console.warn(err);
    };
}

function remplirListeHabitats(habitats) {
    liensEspecesHabitats = [...habitats].sort( (x, y) => x.id - y.id ); // enregistre les données, évite de devoir rappeler 
    habitats.sort( (x, y) => x.nom.localeCompare(y.nom) ); 
	let options = "";
	for (let habitat of habitats) {
		options += `<option value="${habitat.id}">${habitat.nom}</option>`;
	}
	document.getElementById("choixHabitat").innerHTML = options;
}


/************ Affichage des especes de l'habitat sélectionné **************/

function chargerEspeces() {
    document.getElementById("listeEspeces").innerHTML = "";
	// urls = liensEspecesHabitats[this.value]; normalement ok, mais on fait safe
	const urls = liensEspecesHabitats.filter(x => (x.id == this.value))[0].urlsEspecesPokemons; // là on fait confiance :)
	
	try {		
		Promise.all(
            urls.map( url => fetch(url)
									.then(reponse => reponse.json())
									.then(espece => {										
					                    return espece.names.filter(x => x.language.name === "fr")[0].name;
					                })
							)
		)										
		.then (nomsEspeces => {ajouterEspeces(nomsEspeces) } );
	}
    catch(err) {
        console.warn(err);
    };
	
}

function ajouterEspeces(nomsEspeces) {
	let liElements = "";
	for (let nomEspece of nomsEspeces.sort((x, y) => x.localeCompare(y))) {
		liElements += "<li>" + nomEspece + "</li>";
	}
    document.getElementById("listeEspeces").innerHTML = liElements;
}





