import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Demande } from '../interfaces/demande';



@Injectable({
    providedIn: 'root'
  })
export class DemandeService {
  
    demandeUrl = "http://localhost:8080/artisan-Backend/Demande";
    
    constructor(private http: HttpClient , private angularFirebase : AngularFireStorage) { }

    //get l'url du photo de profile de l'demande 
    // TODO
    getDemandesPicture(demande : Demande , id_client : any) 
    {
          return this.angularFirebase.ref('/Demandes/'+id_client+"/"+demande.titre?.split(" ")[0]).getDownloadURL();
    }

    getAllDemande(): Observable<Demande[]> {
      return this.http.get<Demande[]>(this.demandeUrl+"/AllDemandes");
    }

    public DemandeOngoing(id_client: number): Observable<Demande[]> {
      const url = `${this.demandeUrl}/encours=${id_client}`;
      return this.http.get<Demande[]>(url); 
    }

    public DemandeHistory(id_client: number): Observable<Demande[]> {
      const url = `${this.demandeUrl}/history=${id_client}`;
      return this.http.get<Demande[]>(url);
    }

    addNewDemande(id_client: number,usr: Demande):Observable<any>{
      const url = `${this.demandeUrl}/ajout${id_client}`;
      return this.http.post<Demande>(url, usr);
    }

    getDemandeById(id: number): Observable<Demande> {
      const url = `${this.demandeUrl}/id=${id}`;
      return this.http.get<Demande>(url);
    }

    delete(id: any): Observable<Demande> {
      const url = `${this.demandeUrl}/supprime=`+id;
      return this.http.get<Demande>(url);
    }

    Tohistory(id:any)
    {
      const url = `${this.demandeUrl}/Tohistory=`+id;
      return this.http.get<string>(url);
    }
}