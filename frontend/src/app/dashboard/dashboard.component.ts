import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { User } from '../types/user';
import { Folder } from '../types/folder';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TemplateDialogComponent } from '../template-dialog/template-dialog.component';
import { ModalService } from '../services/modal.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [
		'./dashboard.component.css'
	]
})
export class DashboardComponent implements OnInit {
	user: User;
	folders: Folder[];

	constructor (
		private authService: AuthService,
		private modalService: ModalService,
		private router: Router,
		private dataService: DataService,
		private dialog: MatDialog
	) {}

	ngOnInit () {
		this.authService.getProfile().valueChanges.subscribe((response) => {
			console.log(response);
			this.authService.user = response.data.me;
			this.user = this.authService.user;
			console.log(this.user);
			this.folders = this.authService.user.createdFolders;
		});
	}

	initLoginModal () {
		let inputs = {
			isMobile: false
		};
		this.modalService.init(TemplateDialogComponent, inputs, {});
	}
}
