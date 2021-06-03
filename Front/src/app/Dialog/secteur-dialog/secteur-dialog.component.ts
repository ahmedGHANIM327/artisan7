import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArtisanService } from 'src/app/services/artisan.service';

@Component({
  selector: 'app-secteur-dialog',
  templateUrl: './secteur-dialog.component.html',
  styleUrls: ['./secteur-dialog.component.css']
})
export class SecteurDialogComponent  {

    // Traiter la partie inscription des artisans
  selectedSecteur = "";

  secteurs  : Secteur[] = [
    {value : 'Climatisation'},
    {value : 'Plomberie'},
    {value : 'Peintres'},
    {value : 'Tapissier'},
    {value : 'Tailleur'}
  ];



  submitClicked = false;
  secteurValid = false;

  id = localStorage.getItem("id");

  constructor(private formBuilder: FormBuilder ,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SecteurDialogComponent>,
    private serviceArtisan : ArtisanService,
    private router : Router) {

  }

  checkData()
  {

    if(!(this.selectedSecteur === ''))
    {
      this.secteurValid = true;
    }
  }

  annuler(): void {
    this.dialogRef.close(true);
  }

  onSubmit()
  {
    console.log(this.selectedSecteur);
    this.submitClicked = true;
    this.checkData();
    if(this.secteurValid)
    {
      this.serviceArtisan.updateArtisan(""+this.id,"secteur",this.selectedSecteur).subscribe(
        (data : any) =>
        {
          console.log(data);
        });
        this.router.navigateByUrl('/artisan/(sidenav:profile)');
        this.dialogRef.close(true);
    }
  }


}

interface Secteur {
  value: string;
}
