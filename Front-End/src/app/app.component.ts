import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Artisan';
  isAvailable = true;
  width = window.innerWidth ;

  ngOnInit(){
    this.hideElements();
    this.width = window.innerWidth;
  }

  hideElements()
  {
    if(window.innerWidth <= 100)
    {
      this.isAvailable = false;
    }
    else
    {
      this.isAvailable = true;
    }
  }
}
