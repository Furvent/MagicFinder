"use strict";

var Experience = function (mat1, mat2, matGen, day) {
    this.mat1Name = mat1.name;
    this.mat2Name = mat2.name;
    this.matGenerate = matGen; // Si l'expérience est concluante et donne un nouveau matériel, prend la référence de celui ci. Sinon prend la valeur "false";.
    this.willGenerateGoalMat = false;
    this.dayCount = day;
    
    if (this.matGenerate !== false) {
        if (this.matGenerate.id.charAt(0) === "D") {
        this.willGenerateGoalMat = true;
        //Debug
        console.log("WILL GENERATE GOAL MAT : " + this.willGenerateGoalMat);
        }
    }
}

// Initialisation de l'array des expériences.
var expRunning = [];