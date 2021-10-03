import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArtisanService } from 'src/app/services/artisan.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent {

  motDePasseEdit = this.formBuilder.group({
    motDePasse: ['', Validators.required],
    newMotDePasse: ['', Validators.required],
    reNewMotDePasse: ['', Validators.required]
  });

  submitClicked = false;
  motDePasseValid = false;
  newMotDePasse = false;
  reNewMotDePasse = false;

  motDePasseActuel = localStorage.getItem("password");
  id = localStorage.getItem("id");

  constructor(private formBuilder: FormBuilder ,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PasswordDialogComponent>,
    private serviceArtisan : ArtisanService,
    private router : Router) {

  }

  checkData()
  {
    if(this.motDePasseEdit.value.motDePasse === this.motDePasseActuel)
    {
      this.motDePasseValid = true;
    }

    if(this.motDePasseEdit.valid)
    {
      this.newMotDePasse = true;
      if(this.motDePasseEdit.value.newMotDePasse === this.motDePasseEdit.value.reNewMotDePasse)
      {
        this.reNewMotDePasse = true;
      }
    }
  }

  annuler(): void {
    this.dialogRef.close(true);
  }

  onSubmit()
  {
    this.submitClicked = true;
    this.checkData();
    if(this.motDePasseValid && this.newMotDePasse && this.reNewMotDePasse)
    {
      this.serviceArtisan.updateArtisan(""+this.id,"password",this.motDePasseEdit.value.newMotDePasse).subscribe(
        (data : any) =>
        {
          console.log(data);
        });
        this.router.navigateByUrl('/artisan/(sidenav:profile)');
        this.dialogRef.close(true);
    }
  }

}
