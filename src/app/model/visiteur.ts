export interface Visiteur {
id: number;
nom: string;
prenom: string;
adresse: string;
ville: string;
cp: string;
dateEmbauche: Date;
login: string;
mdp: string;
}

export interface FicheFrais{
    id: number;
    date: string;
    montant: number;
}