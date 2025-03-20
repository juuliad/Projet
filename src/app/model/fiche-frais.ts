import { Visiteur } from './visiteur'; // Assure-toi d'importer Visiteur ici

export interface Etat {
  id: number;
  libelle: string;
}

export interface FicheFrais {
  id: number;
  nom: string;
  mois: string;
  nbJustificatifs: number;
  montantvalide: number;
  date: string;
  description: string;
  visiteur: Visiteur;  // Associer un Visiteur à chaque Fiche de Frais
  etat: Etat;
  ligneFraisForfaits: any[];
  ligneFraisHorsForfaits: any[];
}