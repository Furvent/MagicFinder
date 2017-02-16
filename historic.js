"use strict";
/**
 * Les fonctions suivantes permettent de créer l'historique des actions du joueur et du jeu.
 */

// Pas dans la logique angular.
function buyHist(matName, matQuantity, matValue) {
    var elmt = document.createElement("li");
    elmt.className = "buyHistEntry";
    elmt.textContent = "Vous avez acheté " + matQuantity + " unité(s) de " + matName + " pour une valeur de " + matQuantity * matValue + ".";
    document.getElementById("listeHist").appendChild(elmt);
}

function sellHist(matName, matQuantity, matValue) {
    var elmt = document.createElement("li");
    elmt.className = "sellHistEntry";
    elmt.textContent = "Vous avez vendu " + matQuantity + " unité(s) de " + matName + " pour une valeur de " + matQuantity * matValue + ".";
    document.getElementById("listeHist").appendChild(elmt);
}

function expLaunchedHist(mat1, mat2) {
    var elmt = document.createElement("li");
    elmt.className = "expLaunchedHistEntry";
    elmt.textContent = "Vous avez lancé une expérience en mélangeant : " + mat1.name + " et : " + mat2.name + ".";
    document.getElementById("listeHist").appendChild(elmt);
}

function expFailedHist(name1, name2) {
    var elmt = document.createElement("li");
    elmt.className = "expFailedHistEntry";
    elmt.textContent = "En mélangeant : " + name1 + " et " + name2 + " l'expérience n'a rien donné.";
    document.getElementById("listeHist").appendChild(elmt);
}

function expSuccessHist(name1, name2, matGen) {
    var elmt = document.createElement("li");
    elmt.className = "expSuccessHistEntry";
    elmt.textContent = "En mélangeant : " + name1 + " et " + name2 + " l'expérience a réussi et a donné : " + matGen.name + ".";
    document.getElementById("listeHist").appendChild(elmt);
}

function expGoalSuccessHist(name1, name2, matGen) {
    var elmt = document.createElement("li");
    elmt.className = "expGoalSuccessHistEntry";
    elmt.textContent = "En mélangeant : " + name1 + " et " + name2 + " l'expérience a réussi et a donné un des matériaux ultimes : " + matGen.name + ". Bravo !";
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