import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArtisanService } from 'src/app/services/artisan.service';

@Component({
  selector: 'app-biographie-dialog',
  templateUrl: './biographie-dialog.component.html',
  styleUrls: ['./biographie-dialog.component.css']
})
export class BiographieDialogComponent {

  biographieEdit = this.formBuilder.group({
    content: ['', Validators.required]
  });


  
  biographieValid = false;
  id = localStorage.getItem("id");
  biographie = localStorage.getItem("biographie");


  constructor(private formBuilder: FormBuilder ,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<BiographieDialogComponent>,
    private serviceArtisan : ArtisanService,
    private router : Router) {
  }


  checkData()
  {

    if(!(this.biographieEdit.value.content === null || this.biographieEdit.value.content === ""))
    {
      this.biographieValid = true;
    }
  }

  annuler(){
    this.dialogRef.close(true);
  }

  onSubmit()
  {
    this.checkData();
    if(this.biographieValid)
    {
      this.serviceArtisan.updateArtisan(""+this.id,"biographie",this.biographieEdit.value.content).subscribe(
        (data : any) =>
        {
          console.log(data);
        });
        this.router.navigateByUrl('/artisan/(sidenav:profile)');
        this.dialogRef.close(true);
    }
    
  }

}
