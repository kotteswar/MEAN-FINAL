import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';


import { TaskapiService } from '../../services/taskapi.service';
import { UserapiService } from '../../services/userapi.service';
import { ProjectapiService } from '../../services/projectapi.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(public router: Router, private fb: FormBuilder, public service: TaskapiService, public userService: UserapiService, public projectService: ProjectapiService) { }
  submitted = false;
  createUserForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    employeeId: ['', Validators.required]
  });

  get f() { return this.createUserForm.controls; }

  userList: any;
  originalUserList: any;
  userSearch: any;

  order: string = 'info.name';
  reverse: boolean = false;

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  getUserList() {

    this.userService.GetUserList().subscribe(data => {

      if (data) {
        this.userList = data;
        this.originalUserList = data;
      } else {
        //error log
      }
    },
      error => {
        //error log
      });
  }

  editUser(index: any) {
    var id = index;
    this.router.navigate(['/updateuser'], {
      queryParams: {
        id: id
      }
    });
  }

  endUser(index: any) {
    var id = index;
    var obj = {
      id: id
    };
    this.userService.DeleteUser(obj).subscribe(data => {

      if (data) {
        this.getUserList();
      } else {
        //error log
      }
    }, error => {
      //error log
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

  public createUser() {

    let obj = {
      "FirstName": this.createUserForm.value.firstName,
      "LastName": this.createUserForm.value.lastName,
      "EmployeeId": this.createUserForm.value.employeeId
    }



  //  this.service.login({ username: 'kotte@outlook.com', password: 'India$123' }).subscribe(user => {


        this.userService.createAppUser(obj).subscribe(data => {

          if (data) {
            this.createUserForm.reset();

            this.getUserList();
          } else {
            //error log
          }
        },
          error => {
            //error log
          });

   // })

  }


  ngOnInit() {
      this.getUserList();

  }





}
