import { Component, Input, OnInit, Inject, Pipe, PipeTransform } from '@angular/core';

import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Demande } from '../interfaces/demande';
import { Devis } from '../interfaces/devis';
import { DemandeService } from '../services/demande.service';
import { DevisService } from '../services/devis.service';

@Component({
  selector: 'app-demandes-artisan',
  templateUrl: './demandes-artisan.component.html',
  styleUrls: ['./demandes-artisan.component.css']
})
export class DemandesArtisanComponent implements OnInit {
  demandeEncours!: Demande[];
  constructor(public dialog: MatDialog,private demandeservice: DemandeService) {}

  ngOnInit(): void {
    this.demandeservice.getAllDemande().subscribe((data : Demande[]) => {this.demandeEncours = data; 
      setTimeout(() => 
    {
      this.getDemandesPicture();
    },
    500);
      console.log(this.demandeEncours)});
  }

  openDialog(demande: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.open(DialogElements, {data: demande});
  }

  form(demande: any): void {
    this.dialog.open(FormPostulation, {data: demande});
  }

  getDemandesPicture() 
  {
     this.demandeEncours.forEach( d =>
        {
          this.demandeservice.getDemandesPicture(d , ''+d.demandeur?.id).subscribe(
          iUrl => {
            if(iUrl != null )
            {
              d.photo = iUrl;
            }
          })
        }
      );
      
  }

  @Input() demandes: any;

}

@Component({
  selector: 'app-demandes-artisan-card-dialog',
  templateUrl: 'demandes-artisan-card-dialog.html',
})
export class DialogElements {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private dialogRef: MatDialogRef<DialogElements>) {}

  close()
  {
    this.dialogRef.close(true);
  }
}


@Component({
  selector: 'app-demandes-devis-artisan',
  templateUrl: 'demandes-devis-artisan.html',
})
export class FormPostulation implements OnInit {
  newdevis!: Devis;
  idCurrentArtisan: any;
  demande !: Demande;

  constructor(private devisservice: DevisService, @Inject(MAT_DIALOG_DATA) public data: any) {this.newdevis = new Devis(); this.demande = data;}

  ngOnInit(): void {
    this.idCurrentArtisan = localStorage.getItem("id");
  }

  newDevis(){
    this.newdevis.demande = this.demande;
    this.devisservice.addNewDevis(this.idCurrentArtisan,this.newdevis).subscribe(ret => {
        console.log("Inserted ", ret);
    });
  }
}