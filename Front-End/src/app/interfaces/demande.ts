import { Byte } from "@angular/compiler/src/util";
import { Client } from "./client";
import { Devis } from "./devis";


export enum Etat {
    en_cours, // 0
    finis, // 1
}
export class Demande {
    id ?: number;
    titre ?: String;
    description ?: String;
    date_creation ?: String;
    date_realisation?: String;
    adresse ?: String;
    secteur ?:String;
    photo ?:String;
    etat ?: boolean;
    devis ?: Array<Devis>;
    demandeur ?: Client;

    // constructor(titre : string,description : string,date_creation:string,photo:string,secteur:String,adresse:String)
    // {
    //     this.titre = titre;
    //     this.description = description;
    //     this.date_creation = date_creation;
    //     this.photo = photo;
    //     this.adresse = adresse;
    //     this.secteur = secteur;
    // }
    
    
}