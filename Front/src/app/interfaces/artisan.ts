import { Byte } from "@angular/compiler/src/util";

export class Artisan {
    id ?: number;
    name : String;
    email : String;
    password : String;
    phone : String;
    secteur :String;
    adresse : any;
    note ?: number;
    photo ?: string;
    biographie : any;

    constructor(name : string,email:string,password:string,phone:string,secteur:String)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.secteur = secteur;
    }
}