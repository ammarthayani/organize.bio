import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.loadToken()
    console.log(this.authService.authToken)
    if(this.authService.user == undefined){
      this.authService.loggedIn = false
        } else {
          this.authService.loggedIn = true
        }
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show("You are logged out", {cssClass:"alert-success", timeout: 3000})
    this.router.navigate(['/login']);
    return false;
  }
}
