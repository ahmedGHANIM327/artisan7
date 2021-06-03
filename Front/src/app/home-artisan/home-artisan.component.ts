import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-artisan',
  templateUrl: './home-artisan.component.html',
  styleUrls: ['./home-artisan.component.css']
})
export class HomeArtisanComponent implements OnInit {

  isOpened = false;
  public userName : string | null  | undefined;

  constructor(private authService : AuthService  , private router : Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem("name");
  }

  openCloseSideBar()
  {
    this.isOpened = !this.isOpened;
    console.log(this.isOpened);
  }

  disconnect()
  {
    this.authService.deconnecter();
    this.router.navigateByUrl('/login');
  }

}
