import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user';

@Component({
	selector: 'app-template-dialog',
	templateUrl: './template-dialog.component.html',
	styleUrls: [
		'./template-dialog.component.css'
	]
})
export class TemplateDialogComponent implements OnInit {
  name: String;
  user: User;
	constructor (
		private modalService: ModalService,
		private dataService: DataService,
		private authService: AuthService
	) {}

	ngOnInit () {}

	public close () {
		this.modalService.destroy();
	}

	save () {
		const folder = {
			name: this.name,
			creatorId: this.authService.user.id
    };
    console.log(this.authService.user)
    this.dataService.addFolder(folder).subscribe((response) => {
      console.log(response.data)
    })
    this.modalService.destroy();
	}
}
