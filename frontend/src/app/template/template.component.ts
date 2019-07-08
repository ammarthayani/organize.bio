import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Data } from '@angular/router';
import { DataService } from '../services/data.service';
import {ModalService} from '../services/modal.service'
import {FolderDialogComponent} from '../folder-dialog/folder-dialog.component'

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  template:any
  forms:any
  questions:any
  folders:any

  constructor(private route: ActivatedRoute, private router: Router, private dataservice: DataService , private modalService: ModalService) { }

  ngOnInit() {
    this.dataservice.templateId = this.route.snapshot.paramMap.get('templateid');
    this.dataservice.getTemplate(this.dataservice.templateId).valueChanges.subscribe((response) => {
      console.log(response)
      this.template = response.data.template
      this.questions = this.template.questions
      this.forms = this.template.forms
      console.log(this.forms)
    })
  }

}
