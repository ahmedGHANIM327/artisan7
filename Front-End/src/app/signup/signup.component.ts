import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { ClientImpl } from '../interfaces/clientImpl';
import { Artisan } from '../interfaces/artisan';
import Swal from 'sweetalert2';
import { ArtisanService } from '../services/artisan.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  
  

  //messages
  messages : Message[] = [];


  constructor(private formBuilder: FormBuilder , private clientService : ClientService , private ArtisanService : ArtisanService) { }

  // Pour la partie Client
  submitArtisanClicked = false;
  conditionArtisanChecked = false;

  signupArtisanForm = this.formBuilder.group({
    name : '',
    phone : '',
    email: '',
    motDePasse: '',
    motDePasseRep : ''
  });

  // Pour la partie Client
  submitClientClicked = false;
  conditionClientChecked = false;

  signupClientForm = this.formBuilder.group({
    name : '',
    phone : '',
    email: '',
    motDePasse: '',
    motDePasseRep : ''
  });

  ngOnInit(): void {
    this.submitClientClicked = false;
    this.conditionClientChecked = false;
  }


  // Traiter la partie inscription des clients
  nameValide = false;
  emailValid = false;
  passwordValid = false;
  passwordRepValide = false;

  checkDataClient()
  {
    // Process checkout data here
    if(this.signupClientForm.value.name === '' )
    {
      this.nameValide = false;
    }else{
      this.nameValide = true;
    }

    if(this.signupClientForm.value.email === '' )
    {
      this.emailValid = false;
    }
    else{
      this.emailValid = true;
    }

    if(this.signupClientForm.value.motDePasse === '' )
    {
      this.passwordValid = false;
    }else{
      this.passwordValid = true;
    }

    if(this.signupClientForm.value.motDePasseRep === '' || this.signupClientForm.value.motDePasseRep !== this.signupClientForm.value.motDePasse)
    {
      this.passwordRepValide = false;
    }else{
      this.passwordRepValide = true;
    }

  }

  setCheckClient()
  {
    this.conditionClientChecked = !this.conditionClientChecked;
  }


  onSubmitClient()
  {
    this.submitClientClicked = true;
    this.checkDataClient();
    if(this.nameValide && this.passwordValid && this.emailValid && this.passwordRepValide)
    {
      if(this.conditionClientChecked)
      {
        var newClient = new ClientImpl(this.signupClientForm.value.name,this.signupClientForm.value.email,this.signupClientForm.value.motDePasse,this.signupClientForm.value.phone);
        console.log(this.signupClientForm.value.name);
        this.clientService.addNewUser(newClient).subscribe(
          (data : any) =>
          {
            this.messages = data;
            if(this.messages[0].add)
            {
              Swal.fire({
                position: 'center',
                title: this.messages[0].message,
                text: 'Bienvenue dans Artisan7',
                icon: 'success',
                showClass: {
                    popup: 'animate__animated animate__zoomInUp'
                },
                hideClass: {
                    popup: 'animate__animated animate__zoomInDown'
                },
              });
              this.signupClientForm.reset();
            }
            else
            {
              Swal.fire({
                position: 'center',
                title: this.messages[0].message,
                text: 'Un utilisateur est déjà enregistrer avec cet email',
                icon: 'warning',
                showClass: {
                    popup: 'animate__animated animate__zoomInUp'
                },
                hideClass: {
                    popup: 'animate__animated animate__zoomInDown'
                },
              });
            }
            this.messages = [];
          }
        );
      }
    }
  }

  // Traiter la partie inscription des artisans
  selectedSecteur = "";

  secteurs  : Secteur[] = [
    {value : 'Climatisation'},
    {value : 'Plomberie'},
    {value : 'Peintres'},
    {value : 'Tapissier'},
    {value : 'Tailleur'}
  ];

  nameArtisanValide = false;
  phoneArtisanValid = false;
  emailArtisanValid = false;
  passwordArtisanValid = false;
  passwordArtisanRepValide = false;
  secteursValid = false;

  checkDataArtisan()
  {
    // Process checkout data here
    if(this.signupArtisanForm.value.name === '' )
    {
      this.nameArtisanValide = false;
    }else{
      this.nameArtisanValide = true;
    }

    if(this.signupArtisanForm.value.phone === '' )
    {
      this.phoneArtisanValid = false;
    }
    else{
      this.phoneArtisanValid = true;
    }

    if(this.signupArtisanForm.value.email === '' )
    {
      this.emailArtisanValid = false;
    }
    else{
      this.emailArtisanValid = true;
    }

    if(this.signupArtisanForm.value.motDePasse === '' )
    {
      this.passwordArtisanValid = false;
    }else{
      this.passwordArtisanValid = true;
    }

    if(this.signupArtisanForm.value.motDePasseRep === '' || this.signupArtisanForm.value.motDePasseRep !== this.signupArtisanForm.value.motDePasse)
    {
      this.passwordArtisanRepValide = false;
    }else{
      this.passwordArtisanRepValide = true;
    }

    if(this.selectedSecteur === '' )
    {
      this.secteursValid = false;
    }else{
      this.secteursValid = true;
    }

  }

  setCheckArtisan()
  {
    this.conditionArtisanChecked = !this.conditionClientChecked;
  }

  onSubmitArtisan()
  {
    this.submitArtisanClicked = true;
    this.checkDataArtisan();
    if(this.nameArtisanValide && this.passwordArtisanValid && this.emailArtisanValid && this.passwordArtisanRepValide && this.secteursValid)
    {
      if(this.conditionArtisanChecked)
      {
        var artisan = new Artisan(this.signupArtisanForm.value.name,this.signupArtisanForm.value.email,this.signupArtisanForm.value.motDePasse,this.signupArtisanForm.value.phone,this.selectedSecteur);
        this.ArtisanService.addNewArtisan(artisan).subscribe(
          (data : any) =>
          {
            this.messages = data;
            if(this.messages[0].add)
            {
              Swal.fire({
                position: 'center',
                title: this.messages[0].message,
                text: 'Bienvenue dans Artisan7',
                icon: 'success',
                showClass: {
                    popup: 'animate__animated animate__zoomInUp'
                },
                hideClass: {
                    popup: 'animate__animated animate__zoomInDown'
                },
              });
              this.signupArtisanForm.reset();
            }
            else
            {
              Swal.fire({
                position: 'center',
                title: this.messages[0].message,
                text: 'Un utilisateur est déjà enregistrer avec cet email',
                icon: 'warning',
                showClass: {
                    popup: 'animate__animated animate__zoomInUp'
                },
                hideClass: {
                    popup: 'animate__animated animate__zoomInDown'
                },
              });
            }
            this.messages = [];

          }
        );
      }
    }
  }

}

export interface Message {
  add : boolean;
  message : string;
}

interface Secteur {
  value: string;
}

