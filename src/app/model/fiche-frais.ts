import { Etat } from "./etat";

export interface FicheFrais {
    id: number;
    mois: Date;
    nbJustificatifs: number;
    montantValide: number;
    dateModif: Date;
    etat: Etat;
}
