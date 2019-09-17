import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

import {MongoapiService} from '../../services/mongoapi.service'

import {Router} from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  toggleCtrState() {
    const ctrl = this.newProjectForm.get('startDate');
    debugger
    if (ctrl.disabled) {
      ctrl.enable();
    } else {
      ctrl.disable();
    }
  }
newProjectForm = this.fb.group({
    newProject: ['', Validators.required],
    priority: ['',Validators.required],
    parentTask: ['',Validators.required],
    startDate: ['',Validators.required],
    endDate: ['',Validators.required]
  });

  get aliases() {
    return this.newProjectForm.get('aliases') as FormArray;
  }

  constructor(public router: Router,private fb: FormBuilder, public service : MongoapiService) { }


  createNewTask() {
    this.newProjectForm.patchValue({
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
   
    console.warn(this.newProjectForm.value);
  }

  public createTask() {
  debugger; 
 let    obj={
	 "Project" : this.newProjectForm.value.newProject,
    "Priority" : this.newProjectForm.value.priority,
    "ParentTask": this.newProjectForm.value.parentTask,
    "StartDate": this.newProjectForm.value.startDate,
    "EndDate": this.newProjectForm.value.endDate
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
