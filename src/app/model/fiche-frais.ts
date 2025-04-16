export interface Visiteur {
  id: number;
login: string;
mdp: string;
fichesFrais?: FicheFrais[];
}

export interface FicheFrais {
    id?: number;
    mois: string;
    nbJustificatifs: number;
    montantValide: number;
    dateModif: string;
    visiteur?: Visiteur;  // Propriété rendue optionnelle pour éviter l'erreur
    ligneFraisForfaits?: any[];
    ligneFraisHorsForfaits?: any[];
}
