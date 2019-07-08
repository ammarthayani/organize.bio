import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { LOGIN_MUTATION ,LoginResponse } from '../graphql';
import { User } from '../types/user';
import gql from 'graphql-tag';

import { MeQueryResponse } from '../graphql';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authToken: any;
	user: User;
	loggedIn: boolean;
	login: String;

	constructor (private http: HttpClient, private apollo: Apollo) {}

	registerUser (user) {
		console.log(user)
		return this.apollo.mutate<MeQueryResponse>(
			{
				mutation: gql`mutation addUser($name: String, $username: String, $email: String, $password: String, $institutionId: ID){addUser(Name: $name, Username: $username, Email:$email, Password:$password, InstitutionId:$institutionId){username}}`,
				variables: {
					name: user.name,
					username: user.username,
					email: user.email,
					password: user.password,
					institutionId: user.institutionId
				}
			}
		);
	}

	authenticateUser (user) {
		console.log(user)
		return this.apollo
			.mutate<LoginResponse>({
				mutation: LOGIN_MUTATION,
				variables: {
					Username: user.username,
					Password: user.password
				}
			})
			
	}

	getProfile () {
		return this.apollo.watchQuery<MeQueryResponse>({
			query: gql`
				query me($token: String) {
					me(token: $token) {
						id
						name
						username
						email
						createdFolders{
							id
							name
						}
					}
				}
			`,
			variables: {
				token: this.authToken
			}
		});
	}

	storeUserData (token) {
		localStorage.setItem('id_token', token);
		this.authToken = token;
	}

	loadToken () {
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}

	logout () {
		this.authToken = null;
		localStorage.clear();
		this.loggedIn = false;
	}
}
