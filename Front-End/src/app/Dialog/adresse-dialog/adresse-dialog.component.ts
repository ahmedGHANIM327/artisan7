import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArtisanService } from 'src/app/services/artisan.service';

@Component({
  selector: 'app-adresse-dialog',
  templateUrl: './adresse-dialog.component.html',
  styleUrls: ['./adresse-dialog.component.css']
})
export class AdresseDialogComponent {


  adresseEdit = this.formBuilder.group({
    adresse: ['', Validators.required],
    codePostal: ['', Validators.required],
    ville: ['', Validators.required]
  });

  submitClicked = false;
  adresseValid = false;
  codePostalValid = false;
  villeValid = false;

  id = localStorage.getItem("id");

  constructor(private formBuilder: FormBuilder ,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AdresseDialogComponent>,
    private serviceArtisan : ArtisanService,
    private router : Router) {

  }

  checkData()
  {

    if(this.adresseEdit.value.adresse)
    {
      this.adresseValid = true;
    }

    if(this.adresseEdit.value.codePostal)
    {
      this.codePostalValid = true;
    }

    if(this.adresseEdit.value.ville)
    {
      this.villeValid = true;
    }
  }

  annuler(): void {
    this.dialogRef.close(true);
  }

  onSubmit()
  {
    this.submitClicked = true;
    this.checkData();
    if(this.adresseValid && this.codePostalValid && this.villeValid)
    {
      this.serviceArtisan.updateArtisan(""+this.id,"adresse",this.adresseEdit.value.adresse+" , "+this.adresseEdit.value.codePostal+" "+this.adresseEdit.value.ville).subscribe(
        (data : any) =>
        {
          console.log(data);
        });
        this.router.navigateByUrl('/artisan/(sidenav:profile)');
        this.dialogRef.close(true);
    }
  }

}
