import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Apollo} from 'apollo-angular';
import {LoginResponse} from '../graphql'
import {User} from '../types/user';
import gql from 'graphql-tag';

import {MeQueryResponse} from '../graphql'

@Injectable({
	providedIn : 'root',
})

export class AuthService {
	authToken: any;
	user: any;
	loggedIn: boolean;
	login:String;

	constructor(private http: HttpClient, private apollo: Apollo) {}


	registerUser(user) {
		let header = new HttpHeaders();
		header.append('Content-Type', 'application/json');
		return this.http.post(
			'http://localhost:4000/graphql',
			{
				query: `mutation addUser($name: String, $username: String, $email: String, $password: String){addUser(name: $name, username: $username, email:$email, password:$password, institutionId:"5c64f808cd735474dce19f24"){username}}`,
        variables: {
          "name": user.name,
          "username": user.username,
          "email": user.email,
          "password": user.password
        }
      },
			{ headers: header }
		);
	}

	authenticateUser(user){
		this.apollo.mutate<LoginResponse>({
			mutation: gql`mutation login($email: String, $password: String){login(email: $email, password:$password)}`,
			variables: {
				"email": user.email,
        "password": user.password
			}
		}).subscribe((response) => {
			// 5
			console.log(response)
			this.authToken = response.data.login;
			console.log(this.authToken);
		 });
	}

	getProfile(){
		this.apollo.watchQuery<MeQueryResponse>({
			query: gql`query me($token: String){me(token:$token){username email}}`,
			variables: {
				'token': this.authToken
			}
		}).valueChanges.subscribe((response) => {
			this.user = response.data.me;
			console.log(this.user)
		 });
	}

	storeUserData(token){
		localStorage.setItem('id_token', token);
		this.authToken = token;
	}

	loadToken(){
		const token = localStorage.getItem('id_token')
		this.authToken = token
	}

	logout(){
		this.authToken = null;
		localStorage.clear();
		this.loggedIn = false
	}
}
