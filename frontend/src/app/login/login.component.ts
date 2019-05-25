import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  user: Object
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
    const user = {
      email: "ammarthayani@gmail.com",
      password: "Ammar786"
    };

    this.authService.authenticateUser(user)
    
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    };



    this.authService.authenticateUser(user);
      if(this.authService.authToken == null){
        this.flashMessage.show("Incorrect login", {cssClass: "alert-danger", timeour: 5000})
        this.router.navigate(['login'])
      } else {
        this.authService.storeUserData(this.authService.authToken)
        this.flashMessage.show("You are now logged in", {cssClass: "alert-success", timeour: 3000})
        this.authService.loggedIn = true
      }
         }
  }

