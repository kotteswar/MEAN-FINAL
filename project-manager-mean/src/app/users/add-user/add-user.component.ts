import { Component, OnInit } from '@angular/core';
import {Task} from '../../task';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

import {MongoapiService} from '../../services/mongoapi.service'

import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  createUserForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['',Validators.required],
    employeeId: ['',Validators.required]
  });


  userList:any;
  originalUserList:any;

  getUserList() {
    debugger;
    this.service.GetUserList().subscribe(data => {
        debugger;
        if (data) {
          // this.nav.setRoot('HomePage');
          //this.presentAlert("You logic is success.","Alert");
          console.log(data);
          this.userList = data;
          console.log(this.userList);
          this.originalUserList = data;
        } else {
          console.log(" Get Task List Error");
        }
      },
      error => {
        console.log(" Get Task List Error");
        //this.redirect();
      });
  }

  editUser(index: any) {
    debugger
    var id = this.userList[index]["_id"];
    this.router.navigate(['/updateuser'], {
      queryParams: {
        id: id
      }
    });
  }

  endUser(index: any) {
    debugger;
    var id = this.userList[index]["_id"];
    var obj = {
      id: id
    };
    this.service.DeleteUser(obj).subscribe(data => {
      if (data) {
        console.log(data);
        this.getUserList();
      } else {
        console.log("Delete error");
      }
    }, error => {
      console.log(" Get Task List Error");
      //this.redirect();
    });
  }


  onSubmit() {
    debugger;
    // TODO: Use EventEmitter with form value
    this.createUser();
   
    console.warn(this.createUserForm.value);
  }

  resetForm() {
    this.createUserForm.reset();
  }

public createUser() {
  debugger; 
 let    obj={
	 "FirstName" : this.createUserForm.value.firstName,
    "LastName" : this.createUserForm.value.lastName,
    "EmployeeId": this.createUserForm.value.employeeId
} 



this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
  debugger;
  if(user){
                this.service.createAppUser(obj).subscribe(data=> {
            debugger;
          if (data) { 
          //this.router.navigate(["/showtask"]);
          // this.nav.setRoot('HomePage');
          //this.presentAlert("You logic is success.","Alert");
          console.log(data);
          this.createUserForm.reset();

          this.getUserList();
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


    constructor(public router: Router,private fb: FormBuilder, public service : MongoapiService) { }

  ngOnInit() {
    this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
    this.getUserList();
  })
    
  }

  



}
