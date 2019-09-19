import { Component, OnInit } from '@angular/core';
import {Task} from '../task';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

import {MongoapiService} from '../services/mongoapi.service'

import {Router} from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  startDateCtrl:any;
  endDateCtrl:any;
  priorityCtrl:any;
  parentTaskCtrl:any;
  userCtrl:any;
  onlyParentTask:any;
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
    priority: ['',Validators.required],
    parentTask: ['',Validators.required],
    startDate: ['',Validators.required],
    endDate: ['',Validators.required],
    user: ['',Validators.required]
  });

  get aliases() {
    return this.newTaskForm.get('aliases') as FormArray;
  }

  constructor(public router: Router,private fb: FormBuilder, public service : MongoapiService) { }


  goToListPage(){
  this.router.navigate(["/showtask"]);
}
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

projectList:any;
userList:any;
getProjectList() {
    debugger;
    this.service.GetProjectList().subscribe(data => {
        debugger;
        if (data) {
          // this.nav.setRoot('HomePage');
          //this.presentAlert("You logic is success.","Alert");
          this.projectList = data;
          console.log(this.projectList);
        } else {
          console.log(" User list fetch error");
        }
      },
      error => {
        console.log(" User list fetch error");
        //this.redirect();
      });
  }
getUserList() {
    debugger;
    this.service.GetUserList().subscribe(data => {
        debugger;
        if (data) {
          // this.nav.setRoot('HomePage');
          //this.presentAlert("You logic is success.","Alert");
          this.userList = data;
          console.log(this.userList);
        } else {
          console.log(" User list fetch error");
        }
      },
      error => {
        console.log(" User list fetch error");
        //this.redirect();
      });
  }

newTaskVal:any;


public createNewTask() {
  debugger
if(this.onlyParentTask == true){
    this.newTaskVal={
        "Project" : this.newTaskForm.value.project,
        "ParentTask" : this.newTaskForm.value.newTask,
        "onlyParentTask": this.onlyParentTask
  } 
}
else {
    this.newTaskVal={
        "Project" : this.newTaskForm.value.project,
        "Task" : this.newTaskForm.value.newTask,
        "Priority" : this.newTaskForm.value.priority,
        "ParentTask": this.newTaskForm.value.parentTask,
        "StartDate": this.newTaskForm.value.startDate,
        "EndDate": this.newTaskForm.value.endDate,
        "User": this.newTaskForm.value.user,
        "onlyParentTask": this.onlyParentTask
  } 
}
 

//this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
  debugger;
 // if(user){
                this.service.saveForm(this.newTaskVal).subscribe(data=> {
            debugger;
          if (data) { 
          //this.router.navigate(["/showtask"]);
          // this.nav.setRoot('HomePage');
          //this.presentAlert("You logic is success.","Alert");
          console.log(data);

          } else {
            console.log("save error");
          }
          },
          error => {
            console.log("save error");
          //this.redirect();
          });
  //}
//})

} 
parentList:any;
getTask(){
  this.service.GetTaskList().subscribe(data=> {
          if (data) { 
            debugger
          // this.nav.setRoot('HomePage');
          //this.presentAlert("You logic is success.","Alert");
          console.log(data)
          this.parentList = data;
          //taskList = 
          } else {
            console.log(" Get Task List Error");
          }
          },
          error => {
            console.log(" Get Task List Error");
          //this.redirect();
          });
}


  ngOnInit() {
      this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
      this.startDateCtrl = this.newTaskForm.get('startDate');
      this.endDateCtrl = this.newTaskForm.get('endDate');
      this.priorityCtrl = this.newTaskForm.get('priority');
      this.parentTaskCtrl = this.newTaskForm.get('parentTask');
      this.userCtrl = this.newTaskForm.get('user');
    //this.startDateCtrl.disable();
    //this.endDateCtrl.disable();
          this.getProjectList();
          this.getUserList();
          this.getTask();
        })
  }

}
