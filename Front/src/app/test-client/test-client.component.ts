import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage'

@Component({
  selector: 'app-test-client',
  templateUrl: './test-client.component.html',
  styleUrls: ['./test-client.component.css']
})
export class TestClientComponent implements OnInit {

  path : String = "";
  url: any | ArrayBuffer | null;
  constructor(private angularFirebase : AngularFireStorage) {
  }

  ngOnInit(): void {

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

  uplodeImage()
  {
    this.angularFirebase.upload("/photosDeProfile/0/profile" , this.path);
    console.log(this.path);
  }

}
