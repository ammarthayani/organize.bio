import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, ParamMap, Data } from '@angular/router';
import { FolderComponent } from '../folder/folder.component';

@Component({
	selector: 'app-folder-dialog',
	templateUrl: './folder-dialog.component.html',
	styleUrls: [
		'./folder-dialog.component.css'
	]
})
export class FolderDialogComponent implements OnInit {
  name: String;
  id: String;
	constructor (
		private route: ActivatedRoute,
		private router: Router,
		private modalService: ModalService,
		private dataService: DataService,
		private authService: AuthService
	) {}

	ngOnInit () {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
  }

	public close () {
		this.modalService.destroy();
	}

	save () {
    

		const template = {
			name: this.name,
			creatorId: this.authService.user.id,
			folderId: this.dataService.id
		};
		console.log(this.authService.user);
		this.dataService.addTemplate(template).subscribe((response) => {
			console.log(response.data);
		});
		this.modalService.destroy();
	}
}
