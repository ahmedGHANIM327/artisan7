import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NumeroComponent } from '../Dialog/numero/numero.component';
import { PasswordDialogComponent } from '../Dialog/password-dialog/password-dialog.component';

@Component({
  selector: 'app-parametres-clients',
  templateUrl: './parametres-clients.component.html',
  styleUrls: ['./parametres-clients.component.css']
})
export class ParametresClientsComponent implements OnInit {

  constructor(private dialogPassword: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogPassword() {
    this.dialogPassword.open(PasswordDialogComponent);
  }

  openDialogPhone() {
    this.dialogPassword.open(NumeroComponent);
  } 

}
