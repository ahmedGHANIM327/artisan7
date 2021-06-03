import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Project } from '../interfaces/project';
import { ArtisanService } from '../services/artisan.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageUrl = "./assets/pics/unkown.jfif";
  name: String | null;
  secteur: String | null;
  phone: String | null;
  adresse: String | null;
  email: String | null;
  biographie: String | null;
  note: number | null;
  projects : Project[];

  nbProjects = 5;

  constructor(private artisanService : ArtisanService) { 
    this.chargerPhotoProfile();
    this.name = localStorage.getItem("name");
    this.secteur = localStorage.getItem("secteur");
    this.email = localStorage.getItem("email");
    this.phone = localStorage.getItem("phone");
    this.adresse = localStorage.getItem("adresse");
    this.note = Number(localStorage.getItem("note"));
    this.biographie = localStorage.getItem("biographie");
    this.note =(Number(this.note)*20);
    this.projects = JSON.parse(""+localStorage.getItem("projects"));
    this.chargerProjects();
  }

  ngOnInit(): void {
  }


  chargerPhotoProfile() {
    this.artisanService.getArtisanPicture(localStorage.getItem("id")).subscribe(
        iUrl => {
          if(iUrl != null )
          {
            this.imageUrl = iUrl;
          }
        }
    )
  }

  chargerProjects() {
    this.projects.forEach( e => 
      this.artisanService.getArtisanProjectsImage(localStorage.getItem("id") ,''+ e.name).subscribe(
        iUrl => {
          if(iUrl != null )
          {
            e.url = iUrl;
          }
        }
      )
    );
    
  }
}

