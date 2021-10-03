import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Artisan } from '../interfaces/artisan';
import { ClientImpl } from '../interfaces/clientImpl';
import { Project } from '../interfaces/project';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    motDePasse: ['', Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder,private authService:AuthService , private router : Router
    ) {}

  ngOnInit(): void {
  }



  onSubmit(){
    if(this.loginForm.valid)
    {
      this.authService.seConnecter(this.loginForm.value.email,this.loginForm.value.motDePasse)
      .subscribe(
        (data : DataReturn) =>
        {
            //cas de presence de l'utilisateur et mot de passe correct
            if(data.get)
            {
                // Il s'agit d'un artisan
                if(data.role == "artisan")
                {
                  let artisan = data.artisan;
                  let projects = data.projects;
                  localStorage.setItem("role" , "artisan");
                  localStorage.setItem("id",''+artisan.id);
                  localStorage.setItem("name",''+artisan.name);
                  localStorage.setItem("email",''+artisan.email);
                  localStorage.setItem("password",''+this.loginForm.value.motDePasse);
                  localStorage.setItem("phone",''+artisan.phone);
                  localStorage.setItem("biographie",''+artisan.biographie);
                  localStorage.setItem("adresse",''+artisan.adresse);
                  localStorage.setItem("secteur",''+artisan.secteur);
                  localStorage.setItem("note",''+artisan.note);
                  localStorage.setItem("projects",JSON.stringify(projects));
                  this.router.navigateByUrl('/artisan/(sidenav:demandes)');
                }
                //Client
                else
                {
                  let client = data.client;
                  localStorage.setItem("role" , "client");
                  localStorage.setItem("id",''+client.id);
                  localStorage.setItem("name",''+client.name);
                  localStorage.setItem("email",''+client.email);
                  localStorage.setItem("password",''+this.loginForm.value.motDePasse);
                  localStorage.setItem("phone",''+client.phone);
                  this.router.navigateByUrl('/client/(sidenav:mesdemandes)');
                }
            }
            else
            {
              Swal.fire({
                position: 'center',
                title: data.message,
                icon: 'warning',
                showClass: {
                    popup: 'animate__animated animate__zoomInUp'
                },
                hideClass: {
                    popup: 'animate__animated animate__zoomInDown'
                },
              });
            }
        }
      );
    }
  }

}

export interface DataReturn
{
    get : boolean;
    message :string;
    role : string;
    client : ClientImpl;
    artisan :Artisan;
    projects : Project[] ;
}
