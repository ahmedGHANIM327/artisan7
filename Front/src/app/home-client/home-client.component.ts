import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent implements OnInit {

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
