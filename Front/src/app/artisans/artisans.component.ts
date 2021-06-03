  
import { error } from '@angular/compiler/src/util';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Artisan } from '../interfaces/artisan';
import { ArtisanService } from '../services/artisan.service';

@Component({
  selector: 'app-artisans',
  templateUrl: './artisans.component.html',
  styleUrls: ['./artisans.component.css']
})
export class ArtisansComponent implements OnInit {
    listeArtisan !: Artisan[];
    Photo !: any;

  constructor(private artisanservice: ArtisanService , public dialog: MatDialog) {    
    this.Photo= "./assets/pics/unkown.jfif";
   }


   openDialog(data : any) {
    this.dialog.open(DialogElementsExampleDialog ,{ data : data });
  }

  ngOnInit(): void {
      this.artisanservice.getAllArtisan().subscribe((data : Artisan[]) => {
          this.listeArtisan = data;
          console.log(this.listeArtisan);

        });
        setTimeout(() => 
        {
          this.getArtisansPictures();
        },
        500);
  }

  getArtisansPictures()
  {
    this.listeArtisan.forEach( a  =>
      {
        this.artisanservice.getAllArtisansPicture(a.id).subscribe(
          iUrl => {
            if(iUrl != null )
            {
              a.photo = iUrl;
            }
          },
          () =>
          {
            a.photo = "./assets/pics/unkown.jfif";
          }
        
        )
      }
    );
  }

  
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {

  data : string;
  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public dataI: string) {
      this.data = dataI;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
