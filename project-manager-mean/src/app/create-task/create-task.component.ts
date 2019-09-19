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

newTaskForm = this.fb.group({
    project: ['', Validators.required],
    newTask: ['', Validators.required],
    priority: ['',Validators.required],
    parentTask: ['',Validators.required],
    startDate: ['',Validators.required],
    endDate: ['',Validators.required]
  });

  get aliases() {
    return this.newTaskForm.get('aliases') as FormArray;
  }

  constructor(public router: Router,private fb: FormBuilder, public service : MongoapiService) { }


  createNewTask() {
    this.newTaskForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }
  goToListPage(){
  this.router.navigate(["/showtask"]);
}
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    debugger;
    // TODO: Use EventEmitter with form value
    this.createTask();
   
    console.warn(this.newTaskForm.value);
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


  public createTask() {
  debugger; 
 let obj={
      "Project" : this.newTaskForm.value.project,
      "Task" : this.newTaskForm.value.newTask,
      "Priority" : this.newTaskForm.value.priority,
      "ParentTask": this.newTaskForm.value.parentTask,
      "StartDate": this.newTaskForm.value.startDate,
      "EndDate": this.newTaskForm.value.endDate,
      "User": this.newTaskForm.value.user
} 

//this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
  debugger;
 // if(user){
                this.service.saveForm(obj).subscribe(data=> {
            debugger;
          if (data) { 
          this.router.navigate(["/showtask"]);
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


  ngOnInit() {
      this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {

          this.getProjectList();
          this.getUserList();
        })
  }

}
