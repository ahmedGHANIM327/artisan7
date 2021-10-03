import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Artisan } from '../interfaces/artisan';
import { AngularFireStorage } from '@angular/fire/storage';
import { Project } from '../interfaces/project';


@Injectable({
    providedIn: 'root'
  })
export class ArtisanService {

    constructor(private http: HttpClient , private angularFirebase : AngularFireStorage) { }

    allArtisansUrl = "http://localhost:8080/artisan-Backend/artisan?op=listerAllArtisans";
    addArtisanUrl = "http://localhost:8080/artisan-Backend/artisan?op=addNewArtisan";
    addProjectUrl = "http://localhost:8080/artisan-Backend/artisan?op=addProject";
    deleteProjectUrl = "http://localhost:8080/artisan-Backend/artisan?op=deleteProject&id=";
    updateArtisanUrl = "http://localhost:8080/artisan-Backend/artisan?op=updateArtisan";

    dataClients :any;
    
    getAllArtisan(): Observable<Artisan[]> {
      return this.http.get<Artisan[]>(this.allArtisansUrl);
    }

    getAllArtisansPicture(id_artisan : any) 
    {
          return this.angularFirebase.ref('/photosDeProfile/'+id_artisan+'/profile').getDownloadURL();
    }

    addNewArtisan(artisan:Artisan):Observable<any>
    {
      return this.http.post(this.addArtisanUrl+"&name="+artisan.name+"&email="+artisan.email+"&password="+artisan.password+"&phone="+artisan.phone+"&secteur="+artisan.secteur,artisan);
    }

    addNewProject(nameProject : string , id_artisan :string):Observable<any>
    {
      return this.http.post(this.addProjectUrl+"&id="+id_artisan+"&nameProject="+nameProject,"project");
    }

    deleteProject(id_project :string):Observable<any>
    {
      return this.http.post(this.deleteProjectUrl+id_project,"deleteProject");
    }

    //get l'url du photo de profile de l'artisan 
    getArtisanPicture(id : any) 
    {
      return this.angularFirebase.ref('/photosDeProfile/'+id+'/profile').getDownloadURL();
    }

    /* getProjects */
    getArtisanProjectsImage(id : any ,name : string )
    {
      return this.angularFirebase.ref('/projects/'+id+'/'+name).getDownloadURL();
    }

    updateArtisan(id_client:string,parametre : string,newValue : string)
    {
      localStorage.setItem(parametre,newValue);
      return this.http.post(this.updateArtisanUrl+"&id="+id_client+"&parametre="+parametre+"&newValue="+newValue,id_client);
    }

}