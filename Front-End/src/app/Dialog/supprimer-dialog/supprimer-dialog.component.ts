import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArtisanService } from 'src/app/services/artisan.service';

@Component({
  selector: 'app-supprimer-dialog',
  templateUrl: './supprimer-dialog.component.html',
  styleUrls: ['./supprimer-dialog.component.css']
})
export class SupprimerDialogComponent {


  id = localStorage.getItem("id");

  constructor(private formBuilder: FormBuilder ,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SupprimerDialogComponent>,
    private router : Router) {

  }


  annuler(): void {
    this.dialogRef.close(true);
  }

  onSubmit()
  {
        this.router.navigateByUrl('/artisan/(sidenav:profile)');
        this.dialogRef.close(true);

  }

}
