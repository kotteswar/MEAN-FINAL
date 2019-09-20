import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Observable} from 'rxjs';
import {MongoapiService} from '../../services/mongoapi.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  userList:any;
  projectList:any;
  projectSearch:any;
  order: string = '';
  reverse: boolean = false;
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
  
updateProjectForm = this.fb.group({
    project: ['', Validators.required],
    priority: ['',Validators.required],
    manager: ['',Validators.required],
    startDate: ['',Validators.required],
    endDate: ['',Validators.required]
  });

  get aliases() {
    return this.updateProjectForm.get('aliases') as FormArray;
  }

  id:any;
  constructor(private fb: FormBuilder, public  service: MongoapiService,private activatedRoute : ActivatedRoute , public router : Router) {


        console.log('Called Constructor');
        this.activatedRoute.queryParams.subscribe(params => {
            this.id = params['id'];
    
      });
  this.getProject()
       }

       getProject(){
        this.service.GetProjectList().subscribe(data=> {
                if (data) { 
                  debugger
                // this.nav.setRoot('HomePage');
                //this.presentAlert("You logic is success.","Alert");
                console.log(data)
                var curId = this.id;
                this.projectList =  data.filter(x=> x._id == curId)[0];
                console.log(this.projectList);
                } else {
                  console.log(" Get Task List Error");
                }
                },
                error => {
                  console.log(" Get Task List Error");
                //this.redirect();
                });
      }





resetProjectForm() {
  this.updateProjectForm.reset();
}

get f() { return this.updateProjectForm.controls; }
submitted = false;
  submitForm() {
       this.submitted = true;
      if (this.updateProjectForm.invalid) {
            return;
        }
        else {
           this.updateProject();
          }
  }
  public updateProject() {
    debugger; 
   let    obj={
      "Project" : this.updateProjectForm.value.project,
    "Priority" : this.updateProjectForm.value.priority,
    "Manager": this.updateProjectForm.value.manager,
    "StartDate": this.updateProjectForm.value.startDate,
    "EndDate": this.updateProjectForm.value.endDate,
      "id": this.id
  } 
  //this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
    debugger;
   // if(user){
                  this.service.UpdateProject(obj).subscribe(data=> {
              debugger;
            if (data) { 
            this.router.navigate(["/createproject"]);
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


  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
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



  ngOnInit() {

    this.startDateCtrl = this.updateProjectForm.get('startDate');
    this.endDateCtrl = this.updateProjectForm.get('endDate');
     this.startDateCtrl.disable();
      this.endDateCtrl.disable();
    this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
        this.getUserList(); 
      });

  }
}
