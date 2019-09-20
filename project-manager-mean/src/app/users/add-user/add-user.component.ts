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

  constructor(public router: Router,private fb: FormBuilder, public service : MongoapiService) { }
submitted = false;
  createUserForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['',Validators.required],
    employeeId: ['',Validators.required]
  });

get f() { return this.createUserForm.controls; }

  userList:any;
  originalUserList:any;
  userSearch:any;

    order: string = 'info.name';
    reverse: boolean = false;

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
          console.log(data);
          this.userList = data;
          console.log(this.userList);
          this.originalUserList = data;
        } else {
          console.log(" User list fetch error");
        }
      },
      error => {
        console.log(" User list fetch error");
        //this.redirect();
      });
  }

  editUser(index: any) {
    debugger
    //var id = this.userList[index]["_id"];
    var id = index;
    
    this.router.navigate(['/updateuser'], {
      queryParams: {
        id: id
      }
    });
  }

  endUser(index: any) {
    debugger;
    var id = index;
    var obj = {
      id: id
    };
    this.service.DeleteUser(obj).subscribe(data => {
      debugger
      if (data) {
        console.log(data);
        this.getUserList();
      } else {
        console.log("Delete error");
      }
    }, error => {
      debugger
      console.log(" Deleted but data not fetched");
      //this.redirect();
    });
  }


  onSubmit() {
    this.submitted = true;
      if (this.createUserForm.invalid) {
            return;
        }
        else {
           this.createUser();
          }
  
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


  ngOnInit() {
    this.service.login({username:'kotte@outlook.com',password:'India$123'}).subscribe(user => {
    this.getUserList();
  })
    
  }

  



}
