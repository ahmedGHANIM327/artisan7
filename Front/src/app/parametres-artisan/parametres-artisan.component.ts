import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AdresseDialogComponent } from '../Dialog/adresse-dialog/adresse-dialog.component';
import { BiographieDialogComponent } from '../Dialog/biographie-dialog/biographie-dialog.component';
import { NumeroComponent } from '../Dialog/numero/numero.component';
import { PasswordDialogComponent } from '../Dialog/password-dialog/password-dialog.component';
import { PhotoDialogComponent } from '../Dialog/photo-dialog/photo-dialog.component';
import { ProjectsDialogComponent } from '../Dialog/projects-dialog/projects-dialog.component';
import { SecteurDialogComponent } from '../Dialog/secteur-dialog/secteur-dialog.component';
import { SupprimerDialogComponent } from '../Dialog/supprimer-dialog/supprimer-dialog.component';

@Component({
  selector: 'app-parametres-artisan',
  templateUrl: './parametres-artisan.component.html',
  styleUrls: ['./parametres-artisan.component.css']
})
export class ParametresArtisanComponent implements OnInit {

  constructor(private dialogPassword: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogPassword() {
        this.dialogPassword.open(PasswordDialogComponent);
  }

  openDialogPhone() {
    this.dialogPassword.open(NumeroComponent);
  } 

  openDialogSecteur() {
    this.dialogPassword.open(SecteurDialogComponent);
  } 

  openDialogAdresse() {
    this.dialogPassword.open(AdresseDialogComponent);
  } 

  openDialogBiographie() {
    this.dialogPassword.open(BiographieDialogComponent);
  }

  openDialogPhoto() {
    this.dialogPassword.open(PhotoDialogComponent);
  }

  openDialogAddProject() {
    this.dialogPassword.open(ProjectsDialogComponent);
  }

  openDialogSupprimer() {
    this.dialogPassword.open(SupprimerDialogComponent);
  }


}
