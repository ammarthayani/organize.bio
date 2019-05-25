import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import {Router} from '@angular/router'

@Component({
	selector    : 'app-register',
	templateUrl : './register.component.html',
	styleUrls   : [ './register.component.css' ],
})
export class RegisterComponent implements OnInit {
	name    : String;
	username: String;
	email   : String;
	password: String;

	constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) {}

	ngOnInit() {}

	onRegisterSubmit() {
		var user = {
			name     : this.name,
			username : this.username,
			email    : this.email,
			password : this.password,
		};

		if (!this.validateService.validateRegister(user)) {
			this.flashMessage.show('Please fill in all fields', {cssClass : 'alert-danger', timeout: 3000})
			return false;
		}

		if (!this.validateService.validateEmail(user.email)) {
			this.flashMessage.show('Please enter a correct email', {cssClass : 'alert-danger', timeout: 3000})
		}

		this.authService.registerUser(user).subscribe((data: any) => {
			if (data.data.addUser == null){
				console.log(data)
				this.flashMessage.show('Something went worng', {cssClass : 'alert-danger', timeout: 3000})
				this.router.navigate(['/register'])
		 }else {

			user = data.data.addUser
			console.log(data.data)
			console.log(user.username)
			this.flashMessage.show('User registered', {cssClass : 'alert-success', timeout: 3000})
			this.router.navigate(['/login'])
		 }});
	}
}
