import { Byte } from "@angular/compiler/src/util";
import { Artisan } from "./artisan";
import { Client } from "./client";
import { Demande } from "./demande";


export class Devis {
    id ?: number;
    titre ?: String;
    description ?: String;
    date?: String;
    prix ?: number;
    demande ?: Demande;
    artisan ?: Artisan;

}