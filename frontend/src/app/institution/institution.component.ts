import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Apollo} from 'apollo-angular';
import {User} from '../types/user';
import {AuthService} from '../services/auth.service'


import {ALL_USERS_QUERY, AllUserQueryResponse} from '../graphql';


@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})


export class InstitutionComponent implements OnInit {
  users: any
  allUsers: User[] = [];
  loading: true;


  constructor(private apollo: Apollo, private authService: AuthService) {
  }


  ngOnInit() {


  
      // 4
      this.apollo.watchQuery<AllUserQueryResponse>({
        query: ALL_USERS_QUERY,
        variables: {
          "institutionId": "5c64f882401b2f6fdc084141"
        }
      }).valueChanges.subscribe((response) => {
        // 5
        this.users = response.data.users;
        console.log(this.users);
       });

       console.log(this.authService.user)
  
  }

  
}
