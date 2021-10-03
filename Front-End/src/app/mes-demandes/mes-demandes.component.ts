import { Component, Input,OnInit, Inject, Pipe, PipeTransform } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../interfaces/demande';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.css']
})
export class MesDemandesComponent implements OnInit {

  idCurrentClient ?: any;
  demandeEncours : Demande[] = [];
  demandeFinis : Demande[] = [];
  newdemande: Demande;
  url: any | ArrayBuffer | null;
  path : String = "";
  constructor(public dialog: MatDialog,private demandeservice: DemandeService,
    private angularFirebase : AngularFireStorage) { this.newdemande = new Demande() ; 
                                                    this.url= "./assets/pics/unkown.jfif";
                                                    }

  ngOnInit(): void {
    this.idCurrentClient = localStorage.getItem("id");
    this.demandeservice.DemandeOngoing(this.idCurrentClient).subscribe((data : Demande[]) => {this.demandeEncours = data; console.log(this.demandeEncours)});
    this.demandeservice.DemandeHistory(this.idCurrentClient).subscribe((data : Demande[]) => this.demandeFinis = data);

    this.secteurs = [
      {value : 'Climatisation'},
      {value : 'Plomberie'},
      {value : 'Potier'},
      {value : 'Menuisier'},
      {value : 'Peintres'},
      {value : 'Tapissier'},
      {value : 'Tailleur'}
    ];

    setTimeout(() => 
    {
      this.getDemandesPicture();
    },
    500);
  }

  openDialog(demande: any): void {
    const dialogRef = this.dialog.open(DialogElements, {data: demande} );
    console.log(this.demandeFinis);
  }

  getDemandesPicture() 
  {
     this.demandeEncours.forEach( d =>
        {
          this.demandeservice.getDemandesPicture(d , this.idCurrentClient).subscribe(
          iUrl => {
            if(iUrl != null )
            {
              d.photo = iUrl;
            }
          })
        }
      );
      this.demandeFinis.forEach( d =>
        {
          this.demandeservice.getDemandesPicture(d , this.idCurrentClient).subscribe(
          iUrl => {
            if(iUrl != null )
            {
              d.photo = iUrl;
            }
          })
        }
      );
      
  }
    
  newDemande(): void {
    this.newdemande.etat = false;
    this.newdemande.date_creation = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      this.demandeservice.addNewDemande(this.idCurrentClient,this.newdemande).subscribe(ret => {
          console.log("Inserted ", ret);
        //this.demandeservice.showMessage('Task created successfully')
      });
      this.angularFirebase.upload("/Demandes/"+this.idCurrentClient+"/"+this.newdemande.titre?.split(" ")[0] , this.path);
      window.location.reload();
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


  deleteDemande(id: number) {
    this.demandeservice.delete(id).subscribe(ret => {
      this.demandeEncours = this.demandeEncours.filter(c => {
        return c.id != id;
      });
    });
  }

  changed(): void {
    this.ngOnInit();
  }


  @Input() demandes: any;
  @Input() secteurs: any;

}

@Component({
  selector: 'app-mes-demandes-card-dialog',
  templateUrl: 'mes-demandes-card-dialog.html',
})
export class DialogElements {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Demande , private demandeservice: DemandeService,
    private dialogRef: MatDialogRef<DialogElements>, private router : Router) {}

  supprimerDemande(id:any)
  {
    //console.log(this.data.adresse );
    if(this.data.etat === true)
    {
      this.demandeservice.delete(''+this.data.id).subscribe(
        (data:any) =>
        {
          
        }
      );
      Swal.fire({
        position: 'center',
        title:"Demande supprimée difinitivement ",
        icon: 'warning',
        showCancelButton: false, // There won't be any cancel button
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__zoomInUp'
        },
        hideClass: {
            popup: 'animate__animated animate__zoomInDown'
        },
      });
      this.dialogRef.close(true);
      this.router.navigateByUrl('/client/(sidenav:mesdemandes)');
      window.location.reload();
      

    }else
    {
      this.demandeservice.Tohistory(''+this.data.id).subscribe(
        (data:any) =>
        {
          
        }
      );
        Swal.fire({
          position: 'center',
          title:"Demande passée à l'historique ",
          icon: 'warning',
          showCancelButton: false, // There won't be any cancel button
          showConfirmButton: false,
          showClass: {
              popup: 'animate__animated animate__zoomInUp'
          },
          hideClass: {
              popup: 'animate__animated animate__zoomInDown'
          },
        });
      this.dialogRef.close(true);
      this.router.navigateByUrl('/client/(sidenav:mesdemandes)');
      window.location.reload();
    }
  }
}


/*
import { Inject, Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Demande } from '../interfaces/demande';
import { MesDemandesFormComponent } from '../mes-demandes-form/mes-demandes-form.component';
import { DemandeService } from '../services/demande.service';
@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.css']
})
export class MesDemandesComponent  implements OnInit{
  @Input()demande!: Demande[];
  @Output() warnChange = new EventEmitter();
  idCurrentClient ?: any;
  demandeEncours :any;
  demandeFinis :any;
  demandeservice!: DemandeService;
  constructor(
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.idCurrentClient = localStorage.getItem("id");
    console.log("current user is ==> "+this.idCurrentClient);
    this.demandeservice.DemandeOngoing(this.idCurrentClient).subscribe(data => this.demandeEncours = data);
    
    this.demandeservice.DemandeHistory(this.idCurrentClient).subscribe(data => {
      this.demandeFinis = data;
    });
  }
  deleteDemande(id: number) {
    this.demandeservice.delete(id).subscribe(ret => {
      this.demandeEncours = this.demandeEncours.filter((c: { id: number; }) => {
        return c.id != id;
      });
    });
  }
  /*
  update(id: number) {
    this.service.getDemandeById(id).subscribe(demande => {
      const dialogRef = this.dialog.open(DemandeFormComponent, {
        width: '450px',
        data: {
          id: demande.id,
          titre: demande.titre,
          description: demande.description,
          date_creation: demande.date_creation,
          adresse: demande.adresse,
          etat: demande.etat
        }
      });
      dialogRef.afterClosed().subscribe((resultTask: Demande) => {
        if (!resultTask) return;
        console.log(resultTask);
        this.service.addNewDemande(resultTask).subscribe(() => {
          this.service.showMessage('Demande créée avec succès')
          this.warnChange.emit('');
        });
      });
    });
  }*/
/*
  openDialog(): void {
    const dialogRef = this.dialog.open(MesDemandesFormComponent, {
      width: '450px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((resultTask: Demande) => {
      if (!resultTask) return;
      this.demandeservice.addNewDemande(this.idCurrentClient,resultTask).subscribe(() => { 
        this.demandeservice.showMessage('Task created successfully') 
        this.ngOnInit();
      });
    });
  }
  changed(): void {
    this.ngOnInit();
  }
}
*/
