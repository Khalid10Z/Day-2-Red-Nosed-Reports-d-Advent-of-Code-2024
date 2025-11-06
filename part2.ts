import { readFileSync } from "fs";

// Vérifie si une liste de niveaux est sûre (tous les pas adjacents sont soit dans [1,3] soit dans [-3,-1])
function estRapportSur(listeNiveaux: number[]): boolean {
	if (listeNiveaux.length <= 1) return true;

	const differences: number[] = [];
	for (let i = 0; i < listeNiveaux.length - 1; i++) {
		differences.push(listeNiveaux[i + 1] - listeNiveaux[i]);
	}
	let toutMonte = true;
	for (const d of differences) {
		if (d < 1 || d > 3) {
			toutMonte = false;
			break;
		}
	}
	let toutDescend = true;
	for (const d of differences) {
		if (d > -1 || d < -3) {
			toutDescend = false;
			break;
		}
	}

	return toutMonte || toutDescend;
}

// Avec Problem Dampener: on peut enlever un seul niveau (n'importe lequel).
function estRapportSurAvecDampener(listeNiveaux: number[]): boolean {
	if (estRapportSur(listeNiveaux)) return true;

	
	for (let i = 0; i < listeNiveaux.length; i++) {
		const copie = listeNiveaux.slice(0, i).concat(listeNiveaux.slice(i + 1));
		if (estRapportSur(copie)) return true;
	}
	return false;
}

function compterRapportsSursAvecDampener(texteEntree: string): number {
	const lignes = texteEntree.trim().split(/\r?\n/);
	let compte = 0;
	for (const ligne of lignes) {
		if (!ligne.trim()) continue;
		const niveaux = ligne.split(/\s+/).map(x => Number(x));
		if (estRapportSurAvecDampener(niveaux)) compte++;
	}
	return compte;
}

const contenuFichier = readFileSync("input2.txt", "utf8");
console.log("Nombre total de rapports sûrs (avec Problem Dampener) :", compterRapportsSursAvecDampener(contenuFichier));

