import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Data } from '@angular/router';
import { DataService } from '../services/data.service';
import {ModalService} from '../services/modal.service'
import {FolderDialogComponent} from '../folder-dialog/folder-dialog.component'

@Component({
	selector: 'app-folder',
	templateUrl: './folder.component.html',
	styleUrls: [
		'./folder.component.css'
	]
})
export class FolderComponent implements OnInit {
  public folders: any;
  templates: any;
	constructor (private route: ActivatedRoute, private router: Router, private dataservice: DataService , private modalService: ModalService) {}

	ngOnInit () {
    this.dataservice.id = this.route.snapshot.paramMap.get('id');
    this.dataservice.getFolder(this.dataservice.id).valueChanges.subscribe((response) => {
      console.log(response)
      this.folders = response.data.folder
      this.templates = this.folders.templates
      console.log(this.templates)
    })
  }
  
  initLoginModal() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(FolderDialogComponent, inputs, {});
  }
}