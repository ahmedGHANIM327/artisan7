import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArtisanService } from 'src/app/services/artisan.service';

@Component({
  selector: 'app-numero',
  templateUrl: './numero.component.html',
  styleUrls: ['./numero.component.css']
})
export class NumeroComponent  {

  phoneEdit = this.formBuilder.group({
    newPhoneNumber: ['', Validators.required]
  });

  submitClicked = false;
  newPhoneNumberValid = false;

  id = localStorage.getItem("id");

  constructor(private formBuilder: FormBuilder ,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NumeroComponent>,
    private serviceArtisan : ArtisanService,
    private router : Router) {

  }

  checkData()
  {

    if(this.phoneEdit.valid)
    {
      this.newPhoneNumberValid = true;
    }
  }

  annuler(): void {
    this.dialogRef.close(true);
  }

  onSubmit()
  {
    this.submitClicked = true;
    this.checkData();
    if(this.newPhoneNumberValid)
    {
      this.serviceArtisan.updateArtisan(""+this.id,"phone",this.phoneEdit.value.newPhoneNumber).subscribe(
        (data : any) =>
        {
          console.log(data);
        });
        this.router.navigateByUrl('/artisan/(sidenav:profile)');
        this.dialogRef.close(true);
    }
  }

}
