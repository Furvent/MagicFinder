"use strict";

var Materiel = function (name, value, id) {
    this.name = name;
    this.value = Math.round(value);
    this.id = id; // Use to match exp.
    this.quantity = 0;
    
    this.quantityBought = 0; // Use to <input>.
    this.checked = false; // Use to <checkbox>.
}

var price = 10;

var feu = new Materiel("Feu à temps partiel", price, "A1");
var crayon = new Materiel("Crayon mâché", price, "A2");
var ricanement = new Materiel("Ricanement solaire", price * 2.2, "B1");
var boite = new Materiel("Boîte à poussière", price * 3.2, "AB1");
var flasque = new Materiel("Flasque à soda", price * 3.2, "AB2");
var bobine = new Materiel("Bobine de fils de rêves", price * 4.2, "ABB");
var revenu = new Materiel("Revenu de Solidarité Arbitraire", price * 4.2, "C1");
var creme = new Materiel("Crême de vieillissement", price * 4.2, "C2");
var vengeance = new Materiel("Vengeance trop froide", price * 5.2, "AC1");
var marionnette = new Materiel("Marionnette ventriloque", price * 5.2, "AC2");
var medaille = new Materiel("Médaille essoufflée", price * 5.2, "BC");
var ecaille = new Materiel("Écaille de dragon des greniers", price * 5.2, "ABC1");
var sepulture = new Materiel("Sépulture de papillon", price * 5.2, "ABC2");

var couvercle = new Materiel("Couvercle d'étoile", 0, "D1");
var pinceau = new Materiel("Pinceau à sueur", 0, "D2");
var karaoke = new Materiel("Karaoké de carpes", 0, "D3");
var licol = new Materiel("Licol d'espoir", 0, "D4");

/*** INDEX des matériaux ***
 * Nom || Valeur || ID
 * Feu à temps partiel || 1 || A1
 * Crayon mâché || 1 || A2
 * Ricanement solaire || 2 || B1
 * Boite à poussière || 3 || AB1
 * Flasque à soda || 3 || AB2
 * Bobine de fils de rêves || 4 | ABB
 * Revenu de Solidarité Arbitraire || 4 || C1
 * Crême de vieillissement || 4 || C2
 * Vengeance trop froide || 5 || AC1
 * Marionnette ventriloque || 5 || AC2
 * Médaille essoufflée || 5 || BC
 * Écaille de dragon des greniers || 5 || ABC1
 * Sépulture de papillon || 5 || ABC2
 * 
 * Matériaux à acquérir pour terminer le jeu :
 * Couvercle d'étoile || 0 | D1
 * Pinceau à sueur || 0 || D2
 * Karaoké de carpes || 0 || D3
 * Licol d'espoir || 0 || D4
 */
/** Mélanges possibles
 * 
 * Obtention de ricanement . B1
 * A1 + A2 = B1
 * 
 * Obtention de boite . AB1
 * A1 + B1 = AB1
 * 
 * Obtention de flasque . AB2
 * A2 + B1 = AB2
 *
 * Obtention de bobine . ABB
 * AB1 + B1 = ABB
 *
 * Obtention de revenu . C1
 * AB2 + AB1 = C1
 *
 * Obtention de crême . C2
 * A1 + AB2 = C2
 *
 * Obtention de vengeance . AC1
 * A1 + C1 = AC1
 *
 * Obtention de écaille . ABC1
 * AB1 + ABB = ABC1
 *
 * Obtention de  marionnette . AC2
 * A2 + C1 = AC2
 *
 * Obtention de sépulture . ABC2
 * AB2 + C2 = ABC2
 *
 * Obtention de  médaille . BC
 * B1 + C2 = BC
 *
 * --- Matériaux à obtenir :
 *
 * Obtention de couvercle . D1
 * B1 + AC1 = D1
 *
 * Obtention de pinceau . D2
 * BC + A2 = D2
 *
 * Obtention de karaoke . D3
 * ABC1 + AC2 = D3
 *
 * Obtention de licol . D4
 * ABC2 + ABB = D4
 */
/*** /INDEX des matériaux ***/

/*** Disponible à l'achat ***/
// Init du stock d'achat :
var stockAchatDB = [];
stockAchatDB.push(duplicate(feu, 3));
stockAchatDB.push(duplicate(crayon, 3));
//stockAchatDB.push(duplicate(ricanement, 3));
//stockAchatDB.push(duplicate(boite, 3));
//stockAchatDB.push(duplicate(flasque, 3));
//stockAchatDB.push(duplicate(bobine, 3));
//stockAchatDB.push(duplicate(revenu, 3));
//stockAchatDB.push(duplicate(creme, 3));
//stockAchatDB.push(duplicate(vengeance, 3));
//stockAchatDB.push(duplicate(marionnette, 3));
//stockAchatDB.push(duplicate(medaille, 3));
//stockAchatDB.push(duplicate(ecaille, 3));
//stockAchatDB.push(duplicate(sepulture, 3));
/*** /Disponible à l'achat ***/

/*** Disponible en stock ***/
// Init du stock :
var stockJoueurDB = [];
/*** /Disponible en stock ***/

/* Fonctions annexes */

// Créé un nouveau matériel en duplicant celui existant et le retourne.
function duplicate (blueprint, qtity) {
    console.log("blueprint : " + blueprint.name);
    var duplicateMat = new Materiel();
    duplicateMat.name = blueprint.name;
    duplicateMat.value = blueprint.value;
    duplicateMat.id = blueprint.id;
    duplicateMat.quantity = qtity || 0;
    
    console.log("dupliqué : " + duplicateMat.name + " Checked : " + duplicateMat.checked);
    
    return duplicateMat;
}

// Compare deux matériaux pour savoir si une expérience est possible. Return le matériel créé si c'est le cas, sinon false.
function mix (mat1, mat2) {
    // Return false si un/deux des deux matériel est l'un de ceux à obtenir pour terminer le jeu :
    if (mat1.id === "D1" || mat1.id === "D2" || mat1.id === "D3" || mat1.id === "D4"
        || mat2.id === "D1" || mat2.id === "D2" || mat2.id === "D3" || mat2.id === "D4") {
        return false;
    }
    
    // Obtention de ricanement . B1
    else if ((mat1.id === "A1" || mat2.id === "A1") &&
             (mat1.id === "A2" || mat2.id === "A2")) {
        console.log("In function mix()" + ricanement.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(ricanement, 0);
    }
    
    // Obtention de boite . AB1
    else if ((mat1.id === "A1" || mat2.id === "A1") &&
             (mat1.id === "B1" || mat2.id === "B1")) {
        console.log("In function mix()" + boite.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(boite, 0);
    }
    
    // Obtention de flasque . AB2
    else if ((mat1.id === "A2" || mat2.id === "A2") &&
             (mat1.id === "B1" || mat2.id === "B1")) {
        console.log("In function mix()" + flasque.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(flasque, 0);
    }
    
    // Obtention de bobine . ABB
    else if ((mat1.id === "AB1" || mat2.id === "AB1") &&
             (mat1.id === "B1" || mat2.id === "B1")) {
        console.log("In function mix()" + bobine.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(bobine, 0);
    }
    
    // Obtention de revenu . C1
    else if ((mat1.id === "AB2" || mat2.id === "AB2") &&
             (mat1.id === "AB1" || mat2.id === "AB1")) {
        console.log("In function mix()" + revenu.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(revenu, 0);
    }
    
    // Obtention de crême . C2
    else if ((mat1.id === "A1" || mat2.id === "A1") &&
             (mat1.id === "AB2" || mat2.id === "AB2")) {
        console.log("In function mix()" + creme.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(creme, 0);
    }
    
    // Obtention de vengeance . AC1
    else if ((mat1.id === "A1" || mat2.id === "A1") &&
             (mat1.id === "C1" || mat2.id === "C1")) {
        console.log("In function mix()" + vengeance.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(vengeance, 0);
    }
    
    // Obtention de écaille . ABC1
    else if ((mat1.id === "AB1" || mat2.id === "AB1") &&
             (mat1.id === "ABB" || mat2.id === "ABB")) {
        console.log("In function mix()" + ecaille.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(ecaille, 0);
    }
    
    // Obtention de  marionnette . AC2
    else if ((mat1.id === "A2" || mat2.id === "A2") &&
             (mat1.id === "C1" || mat2.id === "C1")) {
        console.log("In function mix()" + marionnette.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(marionnette, 0);
    }
    
    // Obtention de sépulture . ABC2
    else if ((mat1.id === "AB2" || mat2.id === "AB2") &&
             (mat1.id === "C2" || mat2.id === "C2")) {
        console.log("In function mix()" + sepulture.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(sepulture, 0);
    }
    
    // Obtention de  médaille . BC
    else if ((mat1.id === "B1" || mat2.id === "B1") &&
             (mat1.id === "C2" || mat2.id === "C2")) {
        console.log("In function mix()" + medaille.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(medaille, 0);
    }
    
    // Obtention de couvercle . D1
    else if ((mat1.id === "B1" || mat2.id === "B1") &&
             (mat1.id === "AC1" || mat2.id === "AC1")) {
        console.log("In function mix()" + couvercle.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(couvercle, 0);
    }
    
    // Obtention de pinceau . D2
    else if ((mat1.id === "BC" || mat2.id === "BC") &&
             (mat1.id === "A2" || mat2.id === "A2")) {
        console.log("In function mix()" + pinceau.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(pinceau, 0);
    }
    
    // Obtention de karaoke . D3
    else if ((mat1.id === "ABC1" || mat2.id === "ABC1") &&
             (mat1.id === "AC2" || mat2.id === "AC2")) {
        console.log("In function mix()" + karaoke.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(karaoke, 0);
    }
    
    // Obtention de licol . D4
    else if ((mat1.id === "ABC2" || mat2.id === "ABC2") &&
             (mat1.id === "ABB" || mat2.id === "ABB")) {
        console.log("In function mix()" + licol.name + " was create with " + mat1.name + " and " + mat2.name + ".");
        return duplicate(licol, 0);
    }
    
    else {
        console.log("in mix() no match was founded between " + mat1.name + " and " + mat2.name + ".");
        return false;
    }
}

// Cherche dans un stock si un matériel est déjà présent, en utilisant le nom de celui ci. Return l'index si trouvé, sinon false.
function haveMat(matName, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].name === matName) {
            return i;
        }
    }
    return false;
}

// Cette fonction permet de rajouter un matériel dans un stock, et si ce matériel ne s'y trouve pas elle crée une nouvelle entrée.
function transfertMat(mat, stockIn, qtity) {
    // On cherche si le matériel (mat.name) se trouve déjà dans le stock ciblé :
    // Voir fonction haveMat() pour comprendre.
    var check = haveMat(mat.name, stockIn);

    if (check !== false) { // Si il s'y trouve déjà :
        // On ajoute au stock de matériel déjà existant (accès "DB") :
        stockIn[check].quantity += qtity;
    }
    else { // S'il ne s'y trouve pas encore :
        // On créé le nouveau matériel à partir de "mat" :
        var newMat = duplicate(mat);
        // On rajoute le stock acheté :
        newMat.quantity = qtity;
        // Et on l'envoie à la "DB" :
        stockIn.push(newMat);
    }
}

// Cherche dans un stock si une ou des entrée(s) de matériel n'a plus d'unité (quantity = 0), et le(s) enlève.
function removeEmptyMat(stockTest) {
    for (var i = stockTest.length - 1; i >=0 ; i--) {
        if (stockTest[i].quantity <= 0) {
            stockTest.splice(i, 1);
        }
    }
}

// Rajoute des matériaux dans le stock d'achat.
function fillStockAchat() {
    for (var i = 0; i < stockAchatDB.length; i++ ) {
        if (stockAchatDB[i].quantity < 5) {
            stockAchatDB[i].quantity++;
        }
    }
}