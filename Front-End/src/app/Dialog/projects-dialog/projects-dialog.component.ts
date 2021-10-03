import { Component, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { ArtisanService } from 'src/app/services/artisan.service';

@Component({
  selector: 'app-projects-dialog',
  templateUrl: './projects-dialog.component.html',
  styleUrls: ['./projects-dialog.component.css']
})
export class ProjectsDialogComponent {

  projetAdd = this.formBuilder.group({
    projetName: ['', Validators.required]
  });

  path : String = "";
  url: any | ArrayBuffer | null;
  submitClicked = false;
  nameProjectValid = false;
  photoProjectValid = false;
  projects : Project[] = [];
  

  id = localStorage.getItem("id");

  constructor(private formBuilder: FormBuilder ,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ProjectsDialogComponent>,
    private serviceArtisan : ArtisanService,
    private router : Router,
    private angularFirebase : AngularFireStorage) {
      this.url="./assets/pics/unkown.jfif";
      this.projects = JSON.parse(""+localStorage.getItem("projects"));

  }

  displayedColumns: string[] = ['id', 'name', 'supprimer'];
  dataSource = this.projects;


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

  supprimerProjct(id_project : any , name_project : any)
  {
    this.serviceArtisan.deleteProject(id_project).subscribe(
      (data : any) =>
      {
        console.log(data);
      });

      this.angularFirebase.ref('/projects/'+this.id+'/'+name_project).delete();
      this.dialogRef.close(true);
    
  }
  
  checkData()
  {

    if(this.projetAdd.valid)
    {
      this.nameProjectValid = true;
    }

    this.projects.forEach(e => 
      {
        if(e.name === this.projetAdd.value.projetName)
        {
          this.nameProjectValid = false;
        }
      }
    );

    if(!(this.path === null || this.path === ""))
    {
      this.photoProjectValid = true;
    }
  }

  annuler(): void {
    this.dialogRef.close(true);
  }

  uplodeImage()
  {
      this.angularFirebase.upload("/projects/"+this.id+"/"+this.projetAdd.value.projetName, this.path);
  }

  onSubmit()
  {
    this.submitClicked = true;
    this.checkData();
    if(this.nameProjectValid && this.photoProjectValid)
    {
      this.uplodeImage();
      this.serviceArtisan.addNewProject(this.projetAdd.value.projetName , ""+this.id).subscribe(
        (data : any) =>
        {
          console.log(data);
        });
        this.router.navigateByUrl('/artisan/(sidenav:profile)');
        this.dialogRef.close(true);
    }
  }

}

