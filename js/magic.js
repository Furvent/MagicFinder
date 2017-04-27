/** Notes
 * - Soucis : le champs "quantityBrought" de l'objet Material devrait se nommer "quantityInput".
 * - Refacto : Optimiser la fonction mix.
 * - Soucis : l'appel de la fonction removeEmptyMat() devrait se faire de façon "angular", au lieu de l'appeler volontairement elle devrait être appelé automatiquement quand il y a un changement dans un stock. De toutes façons, la manière d'accéder et de modifier la "DB" devrait être revue entièrement.
 * - REPRISE BOULOT :  
 */
"use strict";

var magic = angular.module('magic', []);

/* Controller principal */
magic.controller('testCtrl', ['$scope', 
    function ($scope) {
        /*** Initialisation ***/
        //test
        $scope.money = monneyPlayer;
        $scope.day = dayGame;
        $scope.$watch(dayGame);
        $scope.selectAllBuyFlag = false;
        
        // Lien avec "DB"
        $scope.stockAchat = stockAchatDB;
        $scope.stock = stockJoueurDB;
        $scope.expRunning = expRunning;
        $scope.recettesConnues = recetteDB;
        
        /*** /Initialisation ***/
        
        // Fonction acheter || Fonctionne.
        $scope.buyStock = function () {
            console.log("i clicked on buyStock");
            
            // Uncheck Select all
            $scope.selectAllBuyFlag = false;
            
            // Iteration pour savoir quel mat a été acheté.
            // Peut être meilleur moyen qu'une itération ?
            for (var i = 0; i < $scope.stockAchat.length; i++) {
                // Ref pour aérer le code :
                var mat = $scope.stockAchat[i];
                
                // Debug :
//                console.log("Debug : quantité sélectionnée pour achat : " + mat.name + " = " + mat.quantityBought);
                
                if (mat.quantityBought === 0) { // Pas d'achat de ce matériel.
                    continue; //i++ dans l'itération.
                }
                
                else {
                    // On soustrait la quantité disponible dans le stock d'achat (attention ref de "mat" non utilisée ici)(accès "DB") :
                    stockAchatDB[i].quantity -= mat.quantityBought;
                    
                    // Puis on transfert le matériel vers le stock du joueur (accès "DB") :
                    transfertMat(mat, stockJoueurDB, mat.quantityBought);
                    
                    // Affichage de l'action dans l'historique - pas dans la logique angular *sigh*.
                    buyHist(mat.name, mat.quantityBought, mat.value);
                }
                // On reset l'input du matériel dans le stock achat.
                $scope.stockAchat[i].quantityBought = 0;
            }
            
            //Debug :
            console.log("STOCK JOUEUR :");
            for (var u = 0; u < stockJoueurDB.length; u++) {
                console.log(stockJoueurDB[u]);
            }
            
            console.log("STOCK ACHAT :");
            for (var u = 0; u < stockAchatDB.length; u++) {
                console.log(stockAchatDB[u]);
            }
        };
        
        // Fonction vendre || Fonctionne.
        $scope.sellStock = function() {
            console.log("i clicked on sellStock()");
            
            // Itération pour savoir quel mat doit être vendue.
            for (var i = 0; i < $scope.stock.length; i++) {
                // Ref pour aérer le code :
                var mat = $scope.stock[i];
                
                // Debug :
//                console.log("Debug : quantité sélectionnée pour vendre : " + mat.name + " = " + mat.quantityBought);
                
                if (mat.quantityBought === 0) { // Pas d'achat de ce matériel.
                    continue; //i++ dans l'itération.
                }
                
                else {
                    // On soustrait la quantité disponible dans le stock du joueur (accès "DB") :
                    stockJoueurDB[i].quantity -= mat.quantityBought;
                    
                    // On transfert le matériel vers le stock d'achat (accès "DB") :
                    transfertMat(mat, stockAchatDB, mat.quantityBought);
                }
                    // Affichage de l'action dans l'historique - pas dans la logique angular *sigh*.
                    sellHist(mat.name, mat.quantityBought, mat.value);
                    // On vérifie s'il faut enlever le matériel de la view :
                // On reset l'input du matériel dans le stock du joueur.
                $scope.stock[i].quantityBought = 0;
            }
            // On regarde si il y a des entrées vides.
            removeEmptyMat(stockJoueurDB);
            
            //Debug :
            console.log("STOCK JOUEUR :");
            for (var u = 0; u < stockJoueurDB.length; u++) {
                console.log(stockJoueurDB[u]);
            }
            
            console.log("STOCK ACHAT :");
            for (var u = 0; u < stockAchatDB.length; u++) {
                console.log(stockAchatDB[u]);
            }
        };
        
        // Fonction mélanger || Testing.
        $scope.mixMat = function() {
            console.log("i clicked on mixMat()");
            
            var mat1 = new Materiel();
            var flag = false;
            var mat2 = new Materiel();
            
            // Itération pour savoir quels mats ont été sélectionnés :
            for (var i = 0; i < stockJoueurDB.length; i++) {
                if (stockJoueurDB[i].checked === true) { // Si ce matériel est coché,
                    // On soustrait une unité du stock du matériel checked :
                    stockJoueurDB[i].quantity -= 1;
                    
                    // On enlève le checked au passage :
                        stockJoueurDB[i].checked = false;
                    
                    if (flag === false) {
                        mat1 = duplicate(stockJoueurDB[i]);
                        flag = true;
                    }
                    
                    else {
                        mat2 = duplicate(stockJoueurDB[i]);
                        // Avec nos deux maétériaux on lance une nouvelle expérience :
                        var newMat = mix(mat1, mat2);
                        expLaunchedHist(mat1, mat2);
                        // Accès DB au passage : 
                        expRunning.push(new Experience(mat1, mat2, newMat, 1));
                        
                        break; // On sort de l'itération.
                    }
                }
            }
            // Debug
            console.log("EXP EN COURS :");
            for (var i = 0; i < expRunning.length; i++) {
                console.log(expRunning[i]);
            }
            // On regarde si le stock d'un des matériaux est tombé à zéro ("DB"):
            removeEmptyMat(stockJoueurDB)
        };
        
        // Fonction Jour suivant || Testing.
        $scope.nextDay = function() {
            // Un jour passe. "DB" :
            dayGame++;
            
            // Recup DB dans le scop. NB : Pas normal, prochaine fois à gérer différement avec les fonctionnalités d'Angular. Se pencher sur la fonctionnalité "$watch" et "$rootScope".
            $scope.day = dayGame;
            
            //Stock incrémenté. Accès "DB" :
            fillStockAchat();
            
            /* Expériences, accès "DB" */
            for (var i = expRunning.length - 1; i >= 0; i--) {
                expRunning[i].dayCount -= 1; // Un jour est passé dans le déroulement de l'expérience.
                
                if (expRunning[i].dayCount <= 0) { // Si expérience terminée,
                    // On regarde si l'expérience a généré un nouveau matériel :
                    if (expRunning[i].matGenerate !== false) { // Si l'exp est réussie,
                        
                        // On regarde s'il s'agit d'une nouvelle recette pour le joueur.
                        ajoutRecette(expRunning[i].mat1Name, expRunning[i].mat2Name, expRunning[i].matGenerate.name);
                        
                        // On vérifie si le matériel généré est un de ceux à obtenir pour finir le jeu :
                        if (expRunning[i].willGenerateGoalMat === true) {
                            expGoalSuccessHist(expRunning[i].mat1Name, expRunning[i].mat2Name, expRunning[i].matGenerate);
                            // Le matériel correspondant est barré dans l'affichage :
                            var elmt = document.getElementById(expRunning[i].matGenerate.id);
                            elmt.style.textDecoration = "line-through";
                        }
                        
                        else {
                            // On rajoute le marériel nouvellement créé dans la "DB" : 
                            transfertMat(duplicate(expRunning[i].matGenerate), stockJoueurDB, 1);
                            //On rajoute l'entrée dans le stock d'achat :
                            transfertMat(duplicate(expRunning[i].matGenerate), stockAchatDB, 1);
                            // Affichage dans l'historique :
                            expSuccessHist(expRunning[i].mat1Name, expRunning[i].mat2Name, expRunning[i].matGenerate);
                        }
                    }
                    
                    else { // Ou si elle a échoué,
                        // Affichage dans l'historique : 
                        expFailedHist(expRunning[i].mat1Name, expRunning[i].mat2Name);
                    }
                    // On enlève l'expérience de la "DB" :
                    expRunning.splice(i, 1);
                }
            }
        };
        
        // Fonction pour empêcher de sélectionner plus de deux matériaux et les mélanger.
        $scope.boxStockChecked = function() {
            var compteur = 0;
            for (var i = 0; i < $scope.stock.length; i++) {
                if ($scope.stock[i].checked) {
                    compteur++
                }
                console.log("checked : " + $scope.stock[i].checked);
            }
            
            if (compteur !== 2) {
                document.getElementById("butMix").disabled = true;
            } else {
                document.getElementById("butMix").disabled = false;
            }
        }
        
        // Fonction pour sélectionner tout le stock d'achat.
        $scope.selectAllStock = function() {
            if ($scope.selectAllBuyFlag) {
                for (var i = 0; i < stockAchatDB.length; i++) {
                    stockAchatDB[i].quantityBought = stockAchatDB[i].quantity;
                }
            } else {
                for (var i = 0; i < stockAchatDB.length; i++) {
                    stockAchatDB[i].quantityBought = 0;
                }
            }
        };
    }
]);