import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Observable} from 'rxjs';

import {MongoapiService} from '../../services/mongoapi.service'

import {Router} from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  startDateCtrl:any;
  endDateCtrl:any;

  toggleCtrState() {
    
    debugger
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
    priority: ['',Validators.required],
    manager: ['',Validators.required],
    startDate: ['',Validators.required],
    endDate: ['',Validators.required]
  });

  get aliases() {
    return this.newProjectForm.get('aliases') as FormArray;
  }

  constructor(public router: Router,private fb: FormBuilder, public service : MongoapiService) { 

  }


  goToListPage(){
  this.router.navigate(["/showtask"]);
}
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

resetProjectForm() {
  this.newProjectForm.reset();
}

  public createNewProject() {
  debugger; 
 let    obj={
	 "Project" : this.newProjectForm.value.project,
    "Priority" : this.newProjectForm.value.priority,
    "Manager": this.newProjectForm.value.manager,
    "StartDate": this.newProjectForm.value.startDate,
    "EndDate": this.newProjectForm.value.endDate
} 

//this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
  debugger;
  //if(user){
                this.service.createProject(obj).subscribe(data=> {
            debugger;
          if (data) { 
            console.log("Test User");
          //this.router.navigate(["/showtask"]);
          // this.nav.setRoot('HomePage');
          //this.presentAlert("You logic is success.","Alert");
          console.log(data);
          this.newProjectForm.reset();
            this.getProjectList();
          } else {
            console.log("save error");
          }
          },
          error => {
            console.log("save error");
          //this.redirect();
          });
 // }
//})

} 
userList:any;
projectList:any;

  projectSearch:any;

    order: string = '';
    reverse: boolean = false;

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
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

  editProject(index: any) {
    var id = index;
    
    this.router.navigate(['/updateproject'], {
      queryParams: {
        id: id
      }
    });
  }


  ngOnInit() {

    this.startDateCtrl = this.newProjectForm.get('startDate');
    this.endDateCtrl = this.newProjectForm.get('endDate');
     this.startDateCtrl.disable();
      this.endDateCtrl.disable();
    this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
        this.getUserList(); 
        this.getProjectList();
      });

  }
}
