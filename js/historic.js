"use strict";
/**
 * Les fonctions suivantes permettent de créer l'historique des actions du joueur et du jeu.
 */

// Pas dans la logique angular.
function buyHist(matName, matQuantity, matValue) {
    var elmt = document.createElement("li");
    elmt.className = "buyHistEntry";
    elmt.innerHTML = "Vous avez acheté <span class='bold-txt'>" + matQuantity + "</span> unité(s) de <span class='bold-txt'>" + matName + "</span> pour une valeur de <span class='bold-txt'>" + matQuantity * matValue + "</span>.";
    document.getElementById("listeHist").appendChild(elmt);
}

function sellHist(matName, matQuantity, matValue) {
    var elmt = document.createElement("li");
    elmt.className = "sellHistEntry";
    elmt.innerHTML = "Vous avez vendu <span class='bold-txt'>" + matQuantity + "</span> unité(s) de <span class='bold-txt'>" + matName + "</span> pour une valeur de <span class='bold-txt'>" + matQuantity * matValue + "</span>.";
    document.getElementById("listeHist").appendChild(elmt);
}

function expLaunchedHist(mat1, mat2) {
    var elmt = document.createElement("li");
    elmt.className = "expLaunchedHistEntry";
    elmt.innerHTML = "Vous avez lancé une expérience en mélangeant : <span class='bold-txt'>" + mat1.name + "</span> et <span class='bold-txt'>" + mat2.name + "</span>.";
    document.getElementById("listeHist").appendChild(elmt);
}

function expFailedHist(name1, name2) {
    var elmt = document.createElement("li");
    elmt.className = "expFailedHistEntry";
    elmt.innerHTML = "En mélangeant : <span class='bold-txt'>" + name1 + "</span> et <span class='bold-txt'>" + name2 + "</span> l'expérience n'a rien donné.";
    document.getElementById("listeHist").appendChild(elmt);
}

function expSuccessHist(name1, name2, matGen) {
    var elmt = document.createElement("li");
    elmt.className = "expSuccessHistEntry";
    elmt.innerHTML = "En mélangeant : <span class='bold-txt'>" + name1 + "</span> et <span class='bold-txt'>" + name2 + "</span> l'expérience a réussi et a donné : <span class='bold-txt'>" + matGen.name + "</span>.";
    document.getElementById("listeHist").appendChild(elmt);
}

function expGoalSuccessHist(name1, name2, matGen) {
    var elmt = document.createElement("li");
    elmt.className = "expGoalSuccessHistEntry";
    elmt.innerHTML = "En mélangeant : <span class='bold-txt'>" + name1 + "</span> et <span class='bold-txt'>" + name2 + "</span> l'expérience a réussi et a donné un des matériaux ultimes : <span class='bold-txt'>" + matGen.name + "</span>. Bravo !";
    document.getElementById("listeHist").appendChild(elmt);
}

/**
 * L'objet et les fonctions suivantes permettent de gérer les recettes :
 */

var Recette = function (mat1Name, mat2Name, matGenName) {
    this.mat1Name = mat1Name;
    this.mat2Name = mat2Name;
    this.matGenName = matGenName;
}

var recetteDB = [];

// Cette fonction regarde si la recette est déjà existante et la crée si ce n'est pas le cas.
function ajoutRecette(name1, name2, matGen) {
    console.log("im in ajoutRecette() !");
    for (var i = 0; i < recetteDB.length; i++ ) {
        if (matGen === recetteDB[i].matGenName) { // Si la recette existe,
            // On quitte la fonction :
            console.log("im in ajoutRecette in return() !");
            return;
        }
    }
    
    // Si on peut arriver à cette instruction, on crée une nouvelle entrée :
    recetteDB.push(new Recette(name1, name2, matGen));
    // Debug
    for (var i = 0; i < recetteDB.length; i++) {
        console.log(recetteDB[i]);
    }
}