import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';

import { TaskapiService } from '../services/taskapi.service';
import { UserapiService } from '../services/userapi.service';
import { ProjectapiService } from '../services/projectapi.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  startDateCtrl: any;
  endDateCtrl: any;
  priorityCtrl: any;
  parentTaskCtrl: any;
  userCtrl: any;
  onlyParentTask: any;
  toggleCtrState() {
    if (this.startDateCtrl.disabled) {
      this.onlyParentTask = false;
      this.startDateCtrl.enable();
      this.endDateCtrl.enable();
      this.priorityCtrl.enable();
      this.parentTaskCtrl.enable();
      this.userCtrl.enable();
    } else {
      this.onlyParentTask = true;
      this.startDateCtrl.disable();
      this.endDateCtrl.disable();
      this.priorityCtrl.disable();
      this.parentTaskCtrl.disable();
      this.userCtrl.disable();
    }
  }

  newTaskForm = this.fb.group({
    project: ['', Validators.required],
    newTask: ['', Validators.required],
    priority: ['', Validators.required],
    parentTask: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    user: ['', Validators.required]
  });

  get f() { return this.newTaskForm.controls; }
  submitted = false;
  submitForm() {
    this.submitted = true;
    if (this.newTaskForm.invalid) {
      return;
    }
    else {
      this.createNewTask();
    }
  }

  get aliases() {
    return this.newTaskForm.get('aliases') as FormArray;
  }

  constructor(public router: Router, private fb: FormBuilder, public service: TaskapiService, public userService: UserapiService, public projectService: ProjectapiService) { }


  goToListPage() {
    this.router.navigate(["/showtask"]);
  }
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  projectList: any;
  userList: any;
  getProjectList() {

    this.projectService.GetProjectList().subscribe(data => {

      if (data) {
        this.projectList = data;
      } else {

      }
    },
      error => {
        //error log
      });
  }
  getUserList() {

    this.userService.GetUserList().subscribe(data => {

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

  newTaskVal: any;


  public createNewTask() {

    if (this.onlyParentTask == true) {
      this.newTaskVal = {
        "Project": this.newTaskForm.value.project,
        "Task": "",
        "ParentTask": this.newTaskForm.value.newTask,
        "onlyParentTask": this.onlyParentTask,

        "Priority": 0,

        "StartDate": "",
        "EndDate": "",

        "User": ""
      }
    }
    else {
      this.newTaskVal = {
        "Project": this.newTaskForm.value.project,
        "Task": this.newTaskForm.value.newTask,
        "Priority": this.newTaskForm.value.priority,
        "ParentTask": this.newTaskForm.value.parentTask,
        "StartDate": this.newTaskForm.value.startDate,
        "EndDate": this.newTaskForm.value.endDate,
        "User": this.newTaskForm.value.user,
        "onlyParentTask": this.onlyParentTask
      }
    }



    this.service.saveForm(this.newTaskVal).subscribe(data => {

      if (data) {
        this.router.navigate(['/showtask']);
      } else {
        //error log
      }
    },
      error => {
        //error log
      });


  }
  parentList: any;
  getTask() {
    this.service.GetTaskList().subscribe(data => {
      if (data) {
        this.parentList = data;
      } else {
        //error log
      }
    },
      error => {
        //error log
      });
  }


  ngOnInit() {
    //this.service.login({ username: 'kotte@outlook.com', password: 'India$123' }).subscribe(user => {
      this.startDateCtrl = this.newTaskForm.get('startDate');
      this.endDateCtrl = this.newTaskForm.get('endDate');
      this.priorityCtrl = this.newTaskForm.get('priority');
      this.parentTaskCtrl = this.newTaskForm.get('parentTask');
      this.userCtrl = this.newTaskForm.get('user');
      this.getProjectList();
      this.getUserList();
      this.getTask();
    //})
  }

}
