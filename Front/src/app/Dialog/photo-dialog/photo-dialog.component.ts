import { Component, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { ArtisanService } from 'src/app/services/artisan.service';


@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.css']
})
export class PhotoDialogComponent {

  path : String = "";
  url: any | ArrayBuffer | null;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PhotoDialogComponent>,
    private serviceArtisan : ArtisanService,
    private router : Router,
    private angularFirebase : AngularFireStorage) {
      this.url= "./assets/pics/unkown.jfif";
      this.chargerPhotoProfileActuel();

  }

  chargerPhotoProfileActuel() {
    this.serviceArtisan.getArtisanPicture(localStorage.getItem("id")).subscribe(
        iUrl => {
          if(iUrl != null )
          {
            this.url = iUrl;
          }
        }
    )
  }


  uplode($event : any)
  {
    this.path = $event.target.files[0];
    const files = $event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.url = reader.result; 
    }
  }

  annuler(): void {
    this.dialogRef.close(true);
  }

  uplodeImage()
  {
    if(!(this.path === ""))
    {
      this.angularFirebase.upload("/photosDeProfile/"+localStorage.getItem("id")+"/profile" , this.path);
      this.router.navigateByUrl('/artisan/(sidenav:profile)');
      this.dialogRef.close(true);
    }
  }

}
