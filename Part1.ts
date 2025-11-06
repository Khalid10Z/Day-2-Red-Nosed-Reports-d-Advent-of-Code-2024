import { readFileSync } from "fs";

// Fonction pour vérifier si un rapport est sûr
function estRapportSur(listeNiveaux: number[]): boolean {
  let differences: number[] = [];

  for (let i = 0; i < listeNiveaux.length - 1; i++) {
    const diff = listeNiveaux[i + 1] - listeNiveaux[i];
    differences.push(diff);
  }

  // Vérifie si tout augmente entre 1 et 3
  let toutMonte = true;
  for (let diff of differences) {
    if (diff < 1 || diff > 3) {
      toutMonte = false;
      break;
    }
  }

  // Vérifie si tout descend entre -1 et -3
  let toutDescend = true;
  for (let diff of differences) {
    if (diff > -1 || diff < -3) {
      toutDescend = false;
      break;
    }
  }
  return toutMonte || toutDescend;
}

// Fonction pour compter combien de rapports sont sûrs
function compterRapportsSurs(texteEntree: string): number {
  const lignes = texteEntree.trim().split("\n");
  let nombreRapportsSurs = 0;

  for (let ligne of lignes) {
    if (ligne.trim() === "") continue;

    const niveaux = ligne.split(" ").map(x => Number(x));

    if (estRapportSur(niveaux)) {
      nombreRapportsSurs++;
    }
  }

  return nombreRapportsSurs;
}

const contenuFichier = readFileSync("input1.txt", "utf8");


console.log("Nombre total de rapports sûrs :", compterRapportsSurs(contenuFichier));
