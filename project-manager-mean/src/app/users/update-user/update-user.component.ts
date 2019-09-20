import { Component, OnInit } from '@angular/core';
import {Task} from '../../task';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {MongoapiService} from '../../services/mongoapi.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateUserForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['',Validators.required],
    employeeId: ['',Validators.required]
  });
  get aliases() {
    return this.updateUserForm.get('aliases') as FormArray;
  }
  id:any;
  userList:any;
  constructor(private fb: FormBuilder, public  service: MongoapiService,private activatedRoute : ActivatedRoute , public router : Router) {


        console.log('Called Constructor');
        this.activatedRoute.queryParams.subscribe(params => {
            this.id = params['id'];
    
        });
     this.getTask();
       }

       getTask(){
        this.service.GetUserList().subscribe(data=> {
                if (data) { 
                  debugger
                // this.nav.setRoot('HomePage');
                //this.presentAlert("You logic is success.","Alert");
                console.log(data)
                var curId = this.id;
                this.userList =  data.filter(x=> x._id == curId)[0];
                console.log(this.userList);
                } else {
                  console.log(" Get Task List Error");
                }
                },
                error => {
                  console.log(" Get Task List Error");
                //this.redirect();
                });
      }
 
      addAlias() {
        this.aliases.push(this.fb.control(''));
      }
    
  ngOnInit() {
  }
  resetForm() {
    this.updateUserForm.reset();
  }
get f() { return this.updateUserForm.controls; }
submitted = false;
  submitForm() {
       this.submitted = true;
      if (this.updateUserForm.invalid) {
            return;
        }
        else {
           this.updateUser();
          }
  }
  public updateUser() {
    debugger; 
   let    obj={
     "FirstName" : this.updateUserForm.value.firstName,
      "LastName" : this.updateUserForm.value.lastName,
      "EmployeeId": this.updateUserForm.value.employeeId,
      "id": this.id
  } 
  this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
    debugger;
    if(user){
                  this.service.UpdateUser(obj).subscribe(data=> {
              debugger;
            if (data) { 
            this.router.navigate(["/adduser"]);
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
  
}
