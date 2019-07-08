import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {Router } from '@angular/router'
import { User } from '../types/user';
import { log } from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor() { }


  ngOnInit() {

  }


    

}


