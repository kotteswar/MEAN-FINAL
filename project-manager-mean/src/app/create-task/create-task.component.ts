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

  public createTask() {
  debugger; 
 let    obj={
	 "Task" : this.newTaskForm.value.newTask,
    "Priority" : this.newTaskForm.value.priority,
    "ParentTask": this.newTaskForm.value.parentTask,
    "StartDate": this.newTaskForm.value.startDate,
    "EndDate": this.newTaskForm.value.endDate
} 

this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
  debugger;
  if(user){
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
  }
})

} 


  ngOnInit() {
    
  }

}
