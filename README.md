# pokeapi
Exemple de site qui affiche un résultat similaire à ce que nous pourrions obtenir en réalisant l'exercice du TP08 en 1T Structures et Données, en remplacement de l'exercice SWAPI.

------------------------------------------------

Vous pouvez visualiser ici un exemple de résultat désiré : https://lvdephec.github.io/pokeapi/

ETAPES SIMPLES

0) Faire quelques tests de l'api sur la page d'accueil, regarder comment elle fonctionne, aller lire la documentation : 
https://pokeapi.co/


1) Initialement, dans la page web, faire un appel pour récupérer la liste de tous les habitats des pokemons:
https://pokeapi.co/api/v2/pokemon-habitat

Afficher le nom de chaque habitat dans la liste déroulante (en anglais, car directement retournés).

Pour chaque habitat, sur base de la réponse, garder en mémoire :
son id (par exemple 4),
ainsi que le lien pour obtenir plus de détails (par exemple https://pokeapi.co/api/v2/pokemon-habitat/4/).
L'objectif sera de pouvoir appeler facilement les détails d'un habitat pour retrouver toutes les espèces qui y vivent lorsqu'il est sélectionné.


2) Lorsque l'utilisateur choisit un habitat dans la liste déroulante, 

faire un appel à l'API avec le bon url associé pour obtenir le détail de l'habitat sélectionné, 

et pouvoir ainsi afficher dans la liste en-dessous le nom des espèces qui y habitent en (attribut pokemon_species) en anglais (car directement retourné).

-----------------------------------------------------------------------------

ETAPES AVANCEES

3) Si vous êtes fort, et que vous vous débrouillez avec l'API, vous pouvez récupérer et afficher les noms en français, aussi bien des habitats que des espèces de pokemons. Ce n'est pas forcément difficile à faire,...mais il y aura plus d'appels à prévoir.
Pour chaque espèce d'un habitat par exemple, il faut faire un appel aux détails de l'espèce si on désire récupérer le nom en français.


4) Réfléchir et adapter pour afficher toute la liste en une fois (un seul accès DOM) et trier la liste par ordre alphabétique au préalable.
(Par exemple, au lieu d'afficher directement une réponse lorsqu'on fait un appel pour obtenir le nom français d'une espèce, on peut stocker les réponses et les compter. Lorsque le nombre de réponses attendues est atteint, alors on peut les trier et afficher le résultat désiré.)
