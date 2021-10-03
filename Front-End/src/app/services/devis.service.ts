import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Demande } from '../interfaces/demande';
import { Devis } from '../interfaces/devis';


@Injectable({
    providedIn: 'root'
  })
export class DevisService {

    constructor(private http: HttpClient , private angularFirebase : AngularFireStorage) { }

    devisUrl = "/Artisan7_BackEnd/Devis";

    //get l'url du photo de profile de l'demande 
    getDevisPicture(id : any) 
    {
      return this.angularFirebase.ref('/Devis/'+id+'/profile').getDownloadURL();
    }

    getAllDevis(): Observable<Devis[]> {
      return this.http.get<Devis[]>(this.devisUrl);
    }

    public getDevis(id_artisan: number): Observable<Devis[]> {
      const url = `${this.devisUrl}/${id_artisan}`;
      return this.http.get<Devis[]>(url); 
    }

    addNewDevis(id_artsian: number,usr: Devis):Observable<any>{
      const url = `${this.devisUrl}/ajout${id_artsian}`;
      return this.http.post<Devis>(url, usr);
    }

    getDevisById(id: number): Observable<Devis> {
      const url = `${this.devisUrl}/id=${id}`;
      return this.http.get<Devis>(url);
    }

    delete(id: number): Observable<Devis> {
      const url = `${this.devisUrl}/supprime=${id}`;
      return this.http.delete<Devis>(url);
    }

}