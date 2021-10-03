import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders ,HttpResponse} from '@angular/common/http';
import { Client } from '../interfaces/client';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ClientImpl } from '../interfaces/clientImpl';


@Injectable({
    providedIn: 'root'
  })
export class ClientService {
    constructor(private http: HttpClient) { }

    clientsUrl = "http://localhost:8080/artisan-Backend/client/allClients";
    addClientUrl = "http://localhost:8080/artisan-Backend/client?op=addNewUser";
    updateClientUrl = "http://localhost:8080/artisan-Backend/client?op=updateClient";



    getAllClient() {
        return this.http.get<Client>(this.clientsUrl);
    }


    addNewUser(client:Client):Observable<any>
    {
      return this.http.post<Client>(this.addClientUrl+"&name="+client.name+"&email="+client.email+"&password="+client.password+"&phone="+client.phone,client);
    }

    updateClient(id_client:string,parametre : string,newValue : string)
    {
      localStorage.setItem(parametre,newValue);
      return this.http.post<any>(this.updateClientUrl+"&id="+id_client+"&parametre="+parametre+"&newValue="+newValue,null);
    }

}