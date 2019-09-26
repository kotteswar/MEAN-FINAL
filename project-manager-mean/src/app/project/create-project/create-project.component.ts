import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

import { MongoapiService } from '../../services/mongoapi.service'

import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  startDateCtrl: any;
  endDateCtrl: any;

  toggleCtrState() {


    if (this.startDateCtrl.disabled) {
      this.startDateCtrl.enable();
      this.endDateCtrl.enable();
    } else {
      this.startDateCtrl.disable();
      this.endDateCtrl.disable();
    }
  }

  newProjectForm = this.fb.group({
    project: ['', Validators.required],
    priority: ['', Validators.required],
    manager: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });

  get aliases() {
    return this.newProjectForm.get('aliases') as FormArray;
  }

  constructor(public router: Router, private fb: FormBuilder, public service: MongoapiService) {

  }


  goToListPage() {
    this.router.navigate(["/showtask"]);
  }
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  resetProjectForm() {
    this.newProjectForm.reset();
  }

  get f() { return this.newProjectForm.controls; }
  submitted = false;
  submitForm() {
    this.submitted = true;
    if (this.newProjectForm.invalid) {
      return;
    }
    else {
      this.createNewProject();
    }
  }

  public createNewProject() {
    ;
    let obj = {
      "Project": this.newProjectForm.value.project,
      "Priority": this.newProjectForm.value.priority,
      "Manager": this.newProjectForm.value.manager,
      "StartDate": this.newProjectForm.value.startDate,
      "EndDate": this.newProjectForm.value.endDate
    }


    this.service.createProject(obj).subscribe(data => {

      if (data) {


        this.newProjectForm.reset();
        this.getProjectList();
      } else {
        //error log
      }
    },
      error => {
        //error log
      });


  }
  userList: any;
  projectList: any;

  projectSearch: any;

  order: string = '';
  reverse: boolean = false;

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
  getProjectList() {

    this.service.GetProjectList().subscribe(data => {

      if (data) {
        this.projectList = data;
      } else {
        //error log
      }
    },
      error => {
        //error log
      });
  }
  getUserList() {

    this.service.GetUserList().subscribe(data => {

      if (data) {
        this.userList = data;
      } else {
        //error log
      }
    },
      error => {
        //error log
      });
  }

  editProject(index: any) {
    var id = index;

    this.router.navigate(['/updateproject'], {
      queryParams: {
        id: id
      }
    });
  }

  endProject(index: any) {

    var id = index;
    var obj = {
      id: id
    };
    this.service.DeleteProject(obj).subscribe(data => {

      if (data) {

        this.getProjectList();
      } else {
        //error log
      }
    }, error => {

      //error log

    });
  }


  ngOnInit() {

    this.startDateCtrl = this.newProjectForm.get('startDate');
    this.endDateCtrl = this.newProjectForm.get('endDate');
    this.startDateCtrl.disable();
    this.endDateCtrl.disable();
    this.getUserList();
    this.getProjectList();

  }
}
