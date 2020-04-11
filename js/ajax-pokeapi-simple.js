"use strict";

/* lvd Pâques 2020 */
/* Script pour tester des requêtes en utilisant ajax et pour construire dynmiquement du code HTML */

/* Ce code se contente de récupérer les noms en anglais (beaucoup moins d'appels sont nécessaires,
et il ne trie pas sur base des noms. */


/************ CONSTANTES et variables globales **************/
let liensHabitats;

/************ Gestions du chargement initial de la page **************/


//window.addEventListener('load', initialiser);
document.addEventListener('DOMContentLoaded', initialiser);


function initialiser() {
    document.getElementById("choixHabitat").addEventListener('change', chargerEspeces);

    chargerTitres();
}

/************ Chargement de la liste des choix de film **************/

function chargerTitres() {
	
	let xhr = new XMLHttpRequest();
	xhr.open('get', "https://pokeapi.co/api/v2/pokemon-habitat", true);
	xhr.onload = function () { 
					remplirListeHabitats(JSON.parse(xhr.responseText));
				}; 
	xhr.send();
			
	/*
	fetch("https://pokeapi.co/api/v2/pokemon-habitat")
            .then(reponse => reponse.json())
            .then(reponse => {remplirListeHabitats(reponse)});
	*/
}

function remplirListeHabitats(reponse) {
    
	const habitats = reponse.results;

	let options = "";
	liensHabitats = {};
	for (let i = 0; i < habitats.length; i++) {
		options += "<option value=\"" + i + "\">" +
			   habitats[i].name +
			   "</option>\n";

	liensHabitats[i] = habitats[i].url;
}

document.getElementById("choixHabitat").innerHTML = options;
}

/************ Affichage des personnages du film sélectionné **************/

function chargerEspeces() {
    document.getElementById("listeEspeces").innerHTML = "";
	
	let xhr = new XMLHttpRequest();
	xhr.open('get', liensHabitats[this.value], true);
	xhr.onload = ajouterEspeces;
	xhr.send();
}

function ajouterEspeces() {
    const reponse = JSON.parse(this.responseText);
	const especes = reponse.pokemon_species;
	let liElements = "";
	for (let espece of especes) {
		liElements += "<li>" + espece.name + "</li>";
	}
    document.getElementById("listeEspeces").innerHTML = liElements;
}





