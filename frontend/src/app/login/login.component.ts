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
  username: String;
  password: String;
  email: String;
  name:String;
  institutionId: String;
  user: Object;
  signin: Boolean;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
    this.signin = true
    
  };

  onSignupSubmit(){
        const user = {
      username:this.username,
      password:this.password,
      email:this.email,
      institutionId: this.institutionId,
      name: this.name
    }
    console.log(user)
    this.authService.registerUser(user).subscribe((response) => {
      console.log(response.data.name)
      this.router.navigate(['login'])
    })
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };

  


    this.authService.authenticateUser(user).subscribe((response) => {
      // 5
      this.authService.authToken = response.data.login;
      if(this.authService.authToken == null){
        this.flashMessage.show("Incorrect login", {cssClass: "alert-danger", timeout: 5000})
        console.log('incorrect login');
        
        this.router.navigate(['login'])
      } else {
        this.authService.storeUserData(this.authService.authToken)
        this.flashMessage.show("You are now logged in", {cssClass: "alert-success", timeout: 3000})
        console.log('login');
        
        this.router.navigate(['dashboard'])
        this.authService.loggedIn = true
      }
    });;
      
         }
  }

